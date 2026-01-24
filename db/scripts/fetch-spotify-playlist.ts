import * as fs from 'fs';
import * as path from 'path';

// Spotify API interfaces
interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  duration_ms: number;
}

interface SpotifyPlaylistResponse {
  items: Array<{
    track: SpotifyTrack;
  }>;
  next?: string;
}

interface SongForSeed {
  title: string;
  artist: string;
  defaultDuration: number;
  defaultTuning: string;
}

// Load Spotify credentials from admin/.env.development
function loadSpotifyCredentials(): { clientId: string; clientSecret: string } {
  const envPath = path.resolve(process.cwd(), '../admin/api/.env.development');

  if (!fs.existsSync(envPath)) {
    throw new Error(`Spotify credentials file not found: ${envPath}`);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const clientIdMatch = envContent.match(/SPOTIFY_CLIENT_ID=(.+)/);
  const clientSecretMatch = envContent.match(/SPOTIFY_CLIENT_SECRET=(.+)/);

  if (!clientIdMatch || !clientSecretMatch) {
    throw new Error('SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET not found in .env.development');
  }

  return {
    clientId: clientIdMatch[1].trim(),
    clientSecret: clientSecretMatch[1].trim(),
  };
}

// Get Spotify access token
async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Failed to get Spotify access token: ${response.statusText}`);
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

// Fetch all tracks from playlist
async function fetchPlaylistTracks(playlistId: string, accessToken: string): Promise<SpotifyTrack[]> {
  const tracks: SpotifyTrack[] = [];
  let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  while (url) {
    console.log(`Fetching: ${url}`);
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    const data = (await response.json()) as SpotifyPlaylistResponse;

    // Extract tracks from items
    for (const item of data.items) {
      if (item.track) {
        tracks.push(item.track);
      }
    }

    // Check if there are more pages
    url = data.next || '';
  }

  return tracks;
}

// Transform Spotify tracks to seed format
function transformTracks(spotifyTracks: SpotifyTrack[]): SongForSeed[] {
  return spotifyTracks.map(track => ({
    title: track.name,
    artist: track.artists?.[0]?.name || 'Unknown Artist',
    defaultDuration: Math.round(track.duration_ms / 1000),
    defaultTuning: 'Standard',
  }));
}

// Main execution
async function main() {
  console.log('🎵 Fetching Spotify playlist...\n');

  try {
    // Load credentials
    const { clientId, clientSecret } = loadSpotifyCredentials();
    console.log('✅ Spotify credentials loaded');

    // Get access token
    const accessToken = await getAccessToken(clientId, clientSecret);
    console.log('✅ Access token obtained\n');

    // Fetch playlist tracks
    const playlistId = '4V9HqxTXiZWWdP3bnYns03';
    const spotifyTracks = await fetchPlaylistTracks(playlistId, accessToken);
    console.log(`✅ Fetched ${spotifyTracks.length} tracks\n`);

    // Transform to seed format
    const songs = transformTracks(spotifyTracks);

    // Display songs
    console.log('📝 Songs to add:\n');
    console.log('const songs = [');

    for (const song of songs) {
      console.log(`  { title: "${song.title}", artist: "${song.artist}", defaultDuration: ${song.defaultDuration}, defaultTuning: "${song.defaultTuning}" },`);
    }

    console.log('];\n');

    // Save to file for reference
    const outputPath = path.resolve(process.cwd(), './spotify-playlist-songs.json');
    fs.writeFileSync(outputPath, JSON.stringify(songs, null, 2));
    console.log(`✅ Songs saved to: ${outputPath}`);
    console.log(`\n🎉 Total songs: ${songs.length}`);

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
