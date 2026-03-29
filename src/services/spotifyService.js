const clientId = "8ddcead0766a457abd8e7f42607140a1";
const clientSecret = "4c81b3615eb94554b4ed074a6d8b64d3";

let accessToken = "";

export async function getToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  accessToken = data.access_token;
}

export async function searchArtist(query) {
  if (!accessToken) {
    await getToken();
  }

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  return data.artists?.items?.[0];
}

export async function searchAlbum(query) {
  if (!accessToken) {
    await getToken();
  }

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  return data.albums?.items?.[0];
}

export async function searchPlaylist(query) {
  if (!accessToken) {
    await getToken();
  }

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=playlist&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  return data.playlists?.items?.[0];
}

export function formatDuration(ms) {
  if (!ms) return '0:00';
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
}

export async function getAlbumTracks(albumId, limit = 50) {
  if (!accessToken) await getToken();
  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=${limit}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  const tracks = data.items || [];
  const totalDuration = tracks.reduce((sum, track) => sum + (track.duration_ms || 0), 0);
  const avgDuration = tracks.length ? totalDuration / tracks.length : 0;
  return {
    total: data.total || 0,
    tracks,
    totalDuration,
    avgDuration,
    avgFormatted: formatDuration(avgDuration)
  };
}

export async function getArtistTopTracks(artistId, country = 'US') {
  if (!accessToken) await getToken();
  const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=${country}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  const tracks = data.tracks || [];
  const totalDuration = tracks.reduce((sum, track) => sum + (track.duration_ms || 0), 0);
  const avgDuration = tracks.length ? totalDuration / tracks.length : 0;
  return {
    total: tracks.length,
    tracks,
    avgDuration,
    avgFormatted: formatDuration(avgDuration)
  };
}

export async function searchEpisodes(query) {
  if (!accessToken) await getToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=episode&limit=10`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const data = await response.json();
  const episodes = data.episodes?.items || [];
  const totalDuration = episodes.reduce((sum, ep) => sum + (ep.duration_ms || 0), 0);
  const avgDuration = episodes.length ? totalDuration / episodes.length : 0;
  return {
    total: data.episodes?.total || 0,
    episodes,
    avgDuration,
    avgFormatted: formatDuration(avgDuration)
  };
}

export async function getPlaylistTracks(playlistId, limit = 50) {
  if (!accessToken) await getToken();
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  const tracks = data.items?.map(item => item.track).filter(Boolean) || [];
  const totalDuration = tracks.reduce((sum, track) => sum + (track.duration_ms || 0), 0);
  const avgDuration = tracks.length ? totalDuration / tracks.length : 0;
  return {
    total: tracks.length,
    tracks,
    avgDuration,
    avgFormatted: formatDuration(avgDuration)
  };
}
