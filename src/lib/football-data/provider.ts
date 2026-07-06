export type FootballDataProviderName = "api-football" | "sportmonks";

export type ProviderHealth = {
  provider: FootballDataProviderName;
  ok: boolean;
  checkedAt: string;
  message?: string;
};

export interface FootballDataProvider {
  name: FootballDataProviderName;
  checkHealth(): Promise<ProviderHealth>;
}

export function getConfiguredProviderName(): FootballDataProviderName {
  const provider = process.env.FOOTBALL_API_PROVIDER;

  if (provider === "sportmonks") {
    return "sportmonks";
  }

  return "api-football";
}
