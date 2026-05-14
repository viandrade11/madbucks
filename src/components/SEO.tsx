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
const DEFAULT_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c568c68b-7aa2-4391-867a-fb14dc99ca9c/id-preview-6f8492f6--73ece3c5-8be4-4129-9e40-88989d2cad5b.lovable.app-1775318904946.png";
const SITE_NAME = "Madbucks";
const DEFAULT_DESC = "Skincare brasileiro para tatuagens: preserva, protege e intensifica. Natural, livre de crueldade animal e dermatologicamente testado.";

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
      {canonicalUrl && <link rel="alternate" hrefLang="pt-BR" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pt_BR" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={fullTitle} />

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
