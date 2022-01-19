import configs from "../configs.js";
import { showLoader } from "./loader.js";
const { BACKEND_API, API_KEY, IMG_URL ,SESSION_ID} = configs;


export function searchText1(){
    const search_text = document.querySelector(".search__input");
    search_text.addEventListener("change",(e)=>{
      e.preventDefault();
      console.log(search_text.value);
      let data = fetchSearchMovie(search_text.value).then(data=>inFetchSearchMovie(data));
      console.log(data);
      inFetchSearchMovie(data)
    })
  }
  
  export async function fetchSearchMovie(search) {
    const urls = `${BACKEND_API}search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`;
    const res = await fetch(urls);
    const data = await res.json();
    return data;
  }
  
  export function inFetchSearchMovie(searchData){
    const searchline = document.querySelector(".Results");
    let x=0;
    let htmlContents = ``;
    searchData.results.forEach((data)=>{
        htmlContents  += `
        <li>Movies<span>${data.total_results}</span></li>
        <li>TV Shows<span></span></li>
        <li>People<span></span></li>
        <li>Companies<span></span></li>
        <li>Keywords<span></span></li>
        <li>Collections<span></span></li>
        <li>Networks<span></span></li>
        `;
        searchline.innerHTML = htmlContents;
    })
  }