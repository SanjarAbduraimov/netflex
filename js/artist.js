import config from "../configs.js";
import { showLoader } from "./loader.js";
const { API_KEY, BACKEND_API, IMG_URL } = config;

export async function fetchArtist() {
    const url = `${BACKEND_API}person/${history.state.id}?api_key=${API_KEY}`;
    const res = await fetch(url);
    const artist = await res.json();
    return artist;
}
export async function fetchKnownFor() {
    const popularUrl = `${BACKEND_API}person/${history.state.id}/movie_credits?api_key=${API_KEY}&language=en-US&page=1`
    const res = await fetch(popularUrl)
    const artist = await res.json()
    return artist
}
export async function fetchCombinedCredits() {
    const url = `${BACKEND_API}person/${history.state.id}/movie_credits?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url)
    const artist = await res.json()
    return artist
}
export async function fetchInforms() {
    const url = `${BACKEND_API}person/${history.state.id}?api_key=${API_KEY}`;
    const res = await fetch(url);
    const artist = await res.json();
    return artist;
}
export function displayCombinedCredits(data) {
    const combined__credits__acting = document.querySelector(".acting__shadow")
    const combined__credits = document.querySelector(".others")
    let htmlContentActing = ""
    let htmlContent = ""
    data.cast.forEach((data) => {
        htmlContentActing += `
      <h4 class="movie__title qwerty" data-id = "${data.id} ">${data.title} <span class="movie__character">as ${data.character}</span></h4>`
    })
    data.crew.forEach((data) => {
        htmlContent += `<h1 class="heading">${data.department}</h1>
      <div class="shadow">
      <h4 class="movie__title qwerty" data-id = "${data.id} ">${data.title} <span class="movie__character">... ${data.job}</span></h4>
      </div>`
    })
    combined__credits__acting.innerHTML = htmlContentActing
    combined__credits.innerHTML = htmlContent
}
export function displayKnownFor(data) {
    const knownFor = document.querySelector(".known__for")
    let htmlContent = ""
    data.cast.forEach((data) => {
        htmlContent += `<li style="cursor: pointer;">
        <img class="qwerty" height="200 "data-id = "${data.id} "
          src="${data.poster_path?IMG_URL + data.poster_path:"https://via.placeholder.com/130x200"}"
          alt="moviezone " />
        <h3 class="img__title">${data.title}</h3>
        </li>`
    })
    knownFor.innerHTML = htmlContent
}
export function displayArtist(data) {
    const artist = document.querySelector(".movies");
    const title = document.querySelector(".title")
    let htmlContent = "";
    let htmlContentt = ""
    htmlContent += `
    <div class="card">
    <img height="500" src="${data.profile_path?IMG_URL + data.profile_path:"https://via.placeholder.com/300x500"}" alt="moviezone" />
    </div>
      <div class="personal-informs">
      <h3>Personal Info</h3>
      <div class="personal-menu">
        <h4 class="personal-title">Known For</h4>
        <h5 class="personal-text">${data.known_for_department}</h5>
      </div>
      <div class="personal-menu">
        <h4 class="personal-title">Known Credits</h4>
        <h5 class="personal-text">41</h5>
      </div>
      <div class="personal-menu">
        <h4 class="personal-title">Gender</h4>
        <h5 class="personal-text">Male</h5>
      </div>
      <div class="personal-menu">
        <h4 class="personal-title">Birthday</h4>
        <h5 class="personal-text">${data.birthday}</h5>
      </div>
      <div class="personal-menu">
        <h4 class="personal-title">Place of Birth</h4>
        <h5 class="personal-text">${data.place_of_birth}</h5>
      </div>
      <div class="personal-menu">
        <h4 class="personal-title">Also Known As</h4>
        <h5 class="personal-text names">${data.also_known_as}<br></h5>
      </div>
    </div>
    `
    htmlContentt += `${data.name} — The Movie Database (TMDB)`
    title.innerHTML = htmlContentt
    artist.innerHTML = htmlContent;
}
export function displayInforms(data) {
    const informs = document.querySelector(".informs")
    let htmlContent = ""
    htmlContent += `<div>
    <h1 class="title">${data.name}</h1>
    <h4 class="heading">Biography</h4>
    <p class="text">${data.biography}</p>
    </div>`
    informs.innerHTML = htmlContent
}
export function movieHandler() {
    let artists = document.querySelectorAll(".qwerty");
    artists.forEach((artist) => {
        artist.onclick = (e) => {
            let element = e.target;
            let artistWrapperElement = element.closest("[data-id]");
            let id = artistWrapperElement.dataset.id;
            console.log(element, id);
            history.pushState({ id }, "movie", "/movie.html");
            location.reload();
        };
    });
}