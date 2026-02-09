import { defaultConfig } from "@pidedirecto/config";

export type ApiClientOptions = {
  baseUrl?: string;
  fetcher?: typeof fetch;
};

export function createApiClient(options: ApiClientOptions = {}) {
  const baseUrl = options.baseUrl ?? defaultConfig.apiBaseUrl;
  const fetcher = options.fetcher ?? fetch;

  return {
    async get<T>(path: string): Promise<T> {
      const response = await fetcher(`${baseUrl}${path}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      return (await response.json()) as T;
    }
  };
}
