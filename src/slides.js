import { homePageReload } from "./page_reload";

export function handleWidthChange() {
  const width = window.innerWidth || document.body.clientWidth;

  const slidesElements = document.querySelectorAll(".slide");
  const thirdboxes = document.querySelectorAll(".third-box");

  if (width > 950 && thirdboxes.length === 0) {
    console.log("changed");
    return slidesCreator(4);
  }

  if (width <= 950 && thirdboxes.length === 0) {
    console.log("changed");
    return slidesCreator(2);
  }

  if (width > 950 && thirdboxes.length === 10) {
    slidesElements.forEach(element => element.remove());
    console.log("worked");

    const currentSourceId =
      JSON.parse(localStorage.getItem("currentSourceId")) || "bbc-news";

    homePageReload({ topSource: currentSourceId });
  }

  if (width <= 950 && thirdboxes.length === 20) {
    slidesElements.forEach(element => element.remove());
    console.log("worked");

    const currentSourceId =
      JSON.parse(localStorage.getItem("currentSourceId")) || "bbc-news";

    homePageReload({ topSource: currentSourceId });
  }
}

function singleSlideCreator(numberOfNewsPerSlide) {
  let singleSlideHTML = "";

  for (let i = 0; i < numberOfNewsPerSlide; i++) {
    singleSlideHTML += `
    <div class="third-box shadow white">
      <button>
        <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
      </button>
      <p class="article-date">10 hours ago</p>
      <div class="image-container"
        style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
      </div>
    </div>
    `;
  }
  return singleSlideHTML;
}

export function slidesCreator(numberOfNewsPerSlide) {
  window.addEventListener("resize", handleWidthChange);

  let slidesHTML = "";

  for (let numberOfSlides = 0; numberOfSlides < 5; numberOfSlides++) {
    let currentOrNext = "";

    if (numberOfSlides === 0) {
      currentOrNext = "current";
    }
    if (numberOfSlides === 1) {
      currentOrNext = "next";
    }

    slidesHTML += `
    <div class="slide ${currentOrNext}">
    <div class="third">
    ${singleSlideCreator(numberOfNewsPerSlide)}
    </div>
    </div>
    `;
  }

  return slidesHTML;
}
