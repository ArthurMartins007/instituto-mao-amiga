export const API_BASE_URL = 'http://192.168.1.100:8080';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new ApiError(0, 'Não foi possível conectar à API.');
  }

  if (!response.ok) {
    throw new ApiError(response.status, `A API respondeu com o status ${response.status}.`);
  }

  return response.json() as Promise<T>;
}
