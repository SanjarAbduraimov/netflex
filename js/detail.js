const urlSearchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(urlSearchParams.entries())
const url = `https://api.themoviedb.org/3/movie/580489/credits?api_key=9b5df320c81a1edb3c2c87fa739ff2f2&language=en-US`
const movies = document.querySelector(".movies")
async function fetchCredits() {
    const res = await fetch(url)
    const movie = await res.json()
    return movie
}

function displayDataCredit(movie) {
    let htmlContent = ""
    htmlContent += `<div class="card">
        <img
        height="250"
        src="https://image.tmdb.org/t/p/w500/${movie.profile_path}"> 
        </div>
        <ul class="horizontal"></ul>
        <h1 class="title">${movie.original_name}</h1>
        <h4 class="heading"></h4>`
    movies.innerHTML = htmlContent
}
document.addEventListener("DOMContentLoaded", () => {
    fetchCredits().then((movie) => {
        console.log(movie);
        displayDataCredit(movie)
    })
})