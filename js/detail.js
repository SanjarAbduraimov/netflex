const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=684e89be3aaff7fd6d43d3d90e4aa5da&language=en-US`;

console.log(urlSearchParams, params.id);

// fetch(url)
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

async function fetchMovie() {
  let res = await fetch(url);
  let movie = await res.json();
  return movie;
}


document.addEventListener("DOMContentLoaded", ()=>{
    fetchMovie().then((movie)=>{
        console.log(movie);
    })
})