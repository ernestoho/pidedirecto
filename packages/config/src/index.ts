export type AppConfig = {
  apiBaseUrl: string;
  websocketUrl: string;
  mapsProvider: "google" | "mapbox" | "osm";
  environment: "development" | "staging" | "production";
};

export const defaultConfig: AppConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000",
  websocketUrl: process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:4000",
  mapsProvider: "google",
  environment: (process.env.NEXT_PUBLIC_ENVIRONMENT as AppConfig["environment"]) ?? "development"
};
