import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = "https://madbucks.lovable.app";
const DEFAULT_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/440dd8f6-9c0b-4ecb-bd9e-f97570d2fe64/id-preview-958f7570--73ece3c5-8be4-4129-9e40-88989d2cad5b.lovable.app-1775316074145.png";
const SITE_NAME = "Madbucks";
const DEFAULT_DESC = "Madbucks é a primeira linha brasileira de skincare desenvolvida exclusivamente para preservar, proteger e intensificar tatuagens. Vegano e cruelty-free.";

export const SEO = ({
  title,
  description = DEFAULT_DESC,
  canonical,
  type = "website",
  image = DEFAULT_IMAGE,
  noindex = false,
  jsonLd,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Skincare Premium para Tatuagens`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        Array.isArray(jsonLd)
          ? jsonLd.map((ld, i) => (
              <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
            ))
          : <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};
