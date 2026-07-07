import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

const routes = [
  { path: "/", priority: 1, changeFrequency: "hourly" },
  { path: "/fixtures", priority: 0.9, changeFrequency: "daily" },
  { path: "/results", priority: 0.9, changeFrequency: "daily" },
  { path: "/table", priority: 0.9, changeFrequency: "daily" },
  { path: "/clubs", priority: 0.8, changeFrequency: "weekly" },
  { path: "/players", priority: 0.8, changeFrequency: "weekly" },
  { path: "/europe", priority: 0.8, changeFrequency: "daily" },
  { path: "/matches", priority: 0.7, changeFrequency: "weekly" },
  { path: "/news", priority: 0.9, changeFrequency: "daily" }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
