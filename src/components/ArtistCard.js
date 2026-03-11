function ArtistCard({ artist }) {
  return (
    <div style={{border:"1px solid white", padding:"20px"}}>
      <h2>{artist.name}</h2>
      <p>Followers: {artist.followers.total}</p>
      <p>Popularity: {artist.popularity}</p>
      <img src={artist.images[0]?.url} width="200" />
    </div>
  );
}

export default ArtistCard;