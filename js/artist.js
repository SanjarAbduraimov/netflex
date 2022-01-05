import config from "../configs.js";
const { API_KEY, BACKEND_API, IMG_URL } = config;

export async function fetchArtist() {
  const url = `${BACKEND_API}person/${history.state.id}?api_key=${API_KEY}`;
  const res = await fetch(url);
  const artist = await res.json();
  return artist;
}

export function displayArtist(data) {
  console.log(data, "dfjbjdnfjnjn");
  const artist = document.querySelector(".movies");
  console.log(data, artist);
  let htmlContent = "";
  htmlContent += `<div class="card">
    <img height="500" src="${IMG_URL}${data.profile_path}" alt="moviezone" />
  </div>`;
  artist.innerHTML = htmlContent;
}
// export { fetchArtist, displayArtist };
