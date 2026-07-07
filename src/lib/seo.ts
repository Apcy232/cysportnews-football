import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

type PageMetadata = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function createMetadata({
  title,
  description,
  path
}: PageMetadata): Metadata {
  const canonicalUrl = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_CY"
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}
