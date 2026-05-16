import { createServerFn } from "@tanstack/react-start";

type Video = { id: string; title: string; duration: string; thumbnail: string };
type Playlist = { id: string; title: string; description: string; videos: Video[] };
export type YouTubeResult =
  | { ok: true; playlists: Playlist[] }
  | { ok: false; error: string };

const CHANNEL_HANDLE = "erkinjon_writes";
const API = "https://www.googleapis.com/youtube/v3";

// Parse ISO 8601 duration (PT#H#M#S) → "H:MM:SS" or "M:SS"
function fmtDuration(iso: string): string {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "";
  const h = Number(m[1] || 0);
  const mm = Number(m[2] || 0);
  const ss = Number(m[3] || 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(mm)}:${pad(ss)}` : `${mm}:${pad(ss)}`;
}

async function gfetch(path: string, params: Record<string, string>, key: string) {
  const url = new URL(`${API}/${path}`);
  Object.entries({ ...params, key }).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`YouTube API ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

export const getChannelPlaylists = createServerFn({ method: "GET" }).handler(
  async (): Promise<YouTubeResult> => {
    const key = process.env.YOUTUBE_API_KEY || "AIzaSyDkLVbZfjzUSZLUv5WB7t8Dz2WsS3teoCU";
if (!key) return { ok: false, error: "missing_key" };

    try {
      // 1. Resolve channel by handle
      const ch = await gfetch("channels", { part: "id", forHandle: CHANNEL_HANDLE }, key);
      const channelId = ch.items?.[0]?.id;
      if (!channelId) return { ok: false, error: "channel_not_found" };

      // 2. Fetch playlists for the channel
      const pl = await gfetch(
        "playlists",
        { part: "snippet,contentDetails", channelId, maxResults: "50" },
        key,
      );
      const playlistsRaw: Array<{ id: string; snippet: any; contentDetails: any }> =
        pl.items || [];
      if (playlistsRaw.length === 0) return { ok: true, playlists: [] };

      // 3. For each playlist, fetch videos (up to 25 per playlist)
      const playlists: Playlist[] = [];
      for (const p of playlistsRaw) {
        const items = await gfetch(
          "playlistItems",
          { part: "snippet,contentDetails", playlistId: p.id, maxResults: "25" },
          key,
        );
        const videoIds: string[] = (items.items || [])
          .map((it: any) => it.contentDetails?.videoId)
          .filter(Boolean);
        if (videoIds.length === 0) {
          playlists.push({
            id: p.id,
            title: p.snippet?.title || "Untitled playlist",
            description: p.snippet?.description || "",
            videos: [],
          });
          continue;
        }

        // 4. Get durations + thumbnails in batch
        const vids = await gfetch(
          "videos",
          { part: "snippet,contentDetails", id: videoIds.join(",") },
          key,
        );
        const videos: Video[] = (vids.items || []).map((v: any) => ({
          id: v.id,
          title: v.snippet?.title || "",
          duration: fmtDuration(v.contentDetails?.duration || ""),
          thumbnail:
            v.snippet?.thumbnails?.high?.url ||
            v.snippet?.thumbnails?.medium?.url ||
            `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
        }));

        playlists.push({
          id: p.id,
          title: p.snippet?.title || "Untitled playlist",
          description: p.snippet?.description || "",
          videos,
        });
      }

      return { ok: true, playlists };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown_error";
      console.error("YouTube fetch failed:", msg);
      return { ok: false, error: msg.includes("403") ? "quota_or_key" : "fetch_failed" };
    }
  },
);
