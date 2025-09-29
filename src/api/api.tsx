const API_KEY = (window as any).LASTFM_API_KEY || 'd858d8a86db7242eb0919f0b3ff516e1';
const API_ROOT = 'https://ws.audioscrobbler.com/2.0/';

async function api(params: Record<string, string | number>) {
    const url = new URL(API_ROOT);
    url.search = new URLSearchParams({ format: 'json', api_key: API_KEY, ...params }).toString();
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Network ' + res.status);
    const data = await res.json();
    if (data.error) throw new Error(data.message);
    return data;
}
export default api;