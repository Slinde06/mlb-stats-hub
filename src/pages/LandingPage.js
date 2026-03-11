import { useState } from "react";
import { searchArtist } from "../services/spotifyService";

function LandingPage() {
  const [query, setQuery] = useState("");
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const data = await searchArtist(query);
      setArtist(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Spotify Artist Explorer</h1>

      <input
        type="text"
        placeholder="Enter artist name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading</p>}

      {artist && (
        <table border="1" style={{ marginTop: "20px", width: "600px" }}>
          <thead>
            <tr>
              <th>Artist Image</th>
              <th>Name</th>
              <th>Followers</th>
              <th>Popularity</th>
              <th>Genres</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <img
                  src={artist.images?.[0]?.url}
                  width="100"
                  alt="artist"
                />
              </td>

              <td>{artist.name}</td>

              <td>{artist?.followers?.total}</td>

              <td>{artist?.popularity}</td>

              <td>{artist?.genres?.join(", ")}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LandingPage;