const DEFAULT_API_BASE_URL = "http://localhost:4000";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

export const apiUrl = (path: string) => {
  if (!path) {
    return API_BASE_URL;
  }
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(apiUrl(path), {
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

export async function adminRequest<T>(
  path: string,
  adminPassword: string,
  options?: RequestInit,
): Promise<T | null> {
  const res = await fetch(apiUrl(path), {
    credentials: "include",
    ...options,
    headers: {
      ...(options?.headers || {}),
      "x-admin-password": adminPassword,
    },
  });

  if (res.status === 204) {
    return null;
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}
