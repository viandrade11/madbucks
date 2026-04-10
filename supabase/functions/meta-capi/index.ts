const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const META_PIXEL_ID = "1030944645159035";
const META_API_VERSION = "v21.0";
const META_API_URL = `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events`;

type MetaEventBody = {
  event_name?: string;
  event_time?: number;
  event_source_url?: string;
  user_data?: Record<string, unknown>;
  custom_data?: Record<string, unknown>;
  event_id?: string;
  action_source?: string;
};

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function buildSkippedResponse(reason: string, details?: unknown, message?: string) {
  return jsonResponse({
    success: false,
    skipped: true,
    reason,
    ...(message ? { message } : {}),
    ...(details !== undefined ? { details } : {}),
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const accessToken = Deno.env.get("META_CAPI_ACCESS_TOKEN");
  if (!accessToken) {
    console.error("META_CAPI_ACCESS_TOKEN is not configured");
    return buildSkippedResponse("missing_access_token", undefined, "Meta CAPI token is missing.");
  }

  try {
    const rawBody = await req.json();

    if (!isRecord(rawBody)) {
      console.error("Invalid Meta CAPI payload:", rawBody);
      return buildSkippedResponse("invalid_payload", undefined, "Meta CAPI payload must be a JSON object.");
    }

    const body = rawBody as MetaEventBody;
    if (!body.event_name || typeof body.event_name !== "string") {
      console.error("Meta CAPI payload missing event_name");
      return buildSkippedResponse("invalid_payload", undefined, "event_name is required.");
    }

    const eventData = {
      data: [
        {
          event_name: body.event_name,
          event_time: body.event_time || Math.floor(Date.now() / 1000),
          event_source_url: body.event_source_url,
          event_id: body.event_id,
          action_source: body.action_source || "website",
          user_data: {
            client_ip_address:
              req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("cf-connecting-ip"),
            client_user_agent: req.headers.get("user-agent"),
            ...(body.user_data || {}),
          },
          custom_data: body.custom_data,
        },
      ],
      access_token: accessToken,
    };

    const response = await fetch(META_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      console.error(`Meta CAPI error [${response.status}]:`, JSON.stringify(result));

      const metaError = isRecord(result) && isRecord(result.error) ? result.error : null;
      const metaMessage = typeof metaError?.message === "string" ? metaError.message : undefined;
      const metaCode = typeof metaError?.code === "number" ? metaError.code : undefined;
      const isInvalidCredentials =
        metaCode === 190 || metaMessage === "Error validating application. Application has been deleted.";

      return buildSkippedResponse(
        isInvalidCredentials ? "invalid_meta_credentials" : "meta_api_error",
        { upstreamStatus: response.status, result },
        isInvalidCredentials
          ? "Meta credentials are invalid. Update META_CAPI_ACCESS_TOKEN to resume Conversion API tracking."
          : "Meta Conversion API request failed, but the event was safely ignored."
      );
    }

    return jsonResponse({ success: true, result });
  } catch (error) {
    console.error("Meta CAPI error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return buildSkippedResponse("internal_error", { message }, "Meta event was safely ignored due to an internal error.");
  }
});
