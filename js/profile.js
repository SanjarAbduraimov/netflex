import configs from "../configs.js";
const { API_KEY, BACKEND_API, SESSION_ID } = configs;

async function fetchDetailsData() {
  const profileUrl = `${BACKEND_API}account?api_key=684e89be3aaff7fd6d43d3d90e4aa5da&session_id=${SESSION_ID}`;
  const res = await fetch(profileUrl);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function getWatchList() {
  const watchlistUrl = ``;
  const res = await fetch(watchlistUrl);
  const watchlistData = await res.json();
  return watchlistData;
}

async function DisplayDetails(data) {
  const imgPath = document.querySelector(".img_wrapper");
  const profileName = document.querySelector(".profile_name");
  profileName.innerHTML = `${data.username}`;
  let imgContent = `
    <a href="#"> <img class="profile_pic" src="${data.avatar_path}" width="100%" height="100%" alt="" /></a>`;
    imgPath.innerHTML = imgContent;
}

export async function profileEvent() {
  const 
}