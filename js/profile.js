import configs from "../configs.js";
const { API_KEY, BACKEND_API, SESSION_ID, IMG_URL} = configs;

async function fetchDetailsData() {
  const profileUrl = `${BACKEND_API}account?api_key=${API_KEY}&session_id=${SESSION_ID}`;
  const res = await fetch(profileUrl);
  const data = await res.json();
  console.log(data);
  return data;
}

async function DisplayDetails(data) {
  const imgPath = document.querySelector(".img_wrapper");
  const profileName = document.querySelector(".profile_name");
  profileName.innerHTML = `${data.username}`;
  let imgContent = `
    <a href="#"> <img class="profile_pic" src="${IMG_URL}${data.avatar_path}" width="100%" height="100%" alt="" /></a>`;
    imgPath.innerHTML = imgContent;
    console.log(data.avatar_path);
}



document.addEventListener("DOMContentLoaded", () => {
  fetchDetailsData().then((data)=>{
      DisplayDetails(data)
  });
});
