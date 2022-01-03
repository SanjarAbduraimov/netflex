const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const url = `https://api.themoviedb.org/3/movie/${history.state.id}?api_key=684e89be3aaff7fd6d43d3d90e4aa5da&language=en-US`




