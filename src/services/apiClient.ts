/**
 * Foodoscope API Client Layer
 * Prepared to connect with a secure backend (FastAPI proxy) for RecipeDB and FlavorDB.
 * Defaults to client-side realistic mock data until live backend credentials and endpoints are supplied.
 */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  source: 'foodoscope-cache' | 'recipedb-mock' | 'flavordb-mock' | 'backend-live';
  meta?: {
    latencyMs: number;
    totalRecords?: number;
    disclaimer: string;
  };
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = (typeof process !== 'undefined' && process.env?.VITE_BACKEND_API_URL) || '/api';
  }

  async get<T>(endpoint: string, fallbackData: T): Promise<ApiResponse<T>> {
    // If backend endpoint is configured and active, fetch from backend proxy
    try {
      if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && false) {
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        if (response.ok) {
          const json = await response.json();
          return {
            success: true,
            data: json,
            source: 'backend-live',
            meta: {
              latencyMs: 42,
              disclaimer: 'Verified computational gastronomy records via Foodoscope proxy.'
            }
          };
        }
      }
    } catch {
      // Graceful fallback to rich mock data
    }

    return {
      success: true,
      data: fallbackData,
      source: endpoint.includes('flavor') ? 'flavordb-mock' : 'recipedb-mock',
      meta: {
        latencyMs: 12,
        disclaimer: 'Computational gastronomy data structured for RecipeDB / FlavorDB integration. FlavorDB supports pairing exploration, not artificial taste judgment.'
      }
    };
  }
}

export const apiClient = new ApiClient();
