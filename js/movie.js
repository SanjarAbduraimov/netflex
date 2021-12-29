let heroImg = document.querySelector(".hero__img");
const url = `https://api.themoviedb.org/3/movie/6a3365f259717027cd77969d5a0bf8b2f85347c4?api_key=e73f1beef4c6f7e3179582f971655d86&language=en-US`;

async function fetchFunction() {
  const res = await fetch(url);
  const data = res.json();
  return data;
}

function displayData(movie) {
  let htmlContent = "";
  htmlContent += `
  <a href="#">
    <img
      class="hero__img w-100"
      src="${movie.backdrop_path}"
      alt="hero__img"
    />
  </a>`;
  heroImg.innerHTML = htmlContent;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchFunction().then((data) => {
    displayData(movie);
  });
});
