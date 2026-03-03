import { supabase } from "@/react-app/lib/supabase";

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: Record<string, string> = { ...(options.headers as Record<string, string>) };
  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }
  return fetch(path, { ...options, headers });
}
