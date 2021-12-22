import configs from "../configs.js";
const { API_KEY, BACKEND_API, DEFAULT_IMG } = configs;

export async function fetchDetails(id) {
  const res = await fetch(
    `${BACKEND_API}movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data;
}

export function displayDetails(data) {
  const { poster_path, title } = data;
  const posterImg = document.querySelector(".poster__wrapper");
  const img = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : DEFAULT_IMG;
  posterImg.innerHTML = `
    <div class="poster__wrapper">
      <div class="card">
        <img
        width=400"
          src="${img}"
          alt="${title}"
        />
      </div>
    </div>
  `;
}
