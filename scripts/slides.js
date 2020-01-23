import { homePageReload } from "./page_reload";
import { ageCalc, maxCharactersApply, imageAvailability } from "./utility";

export async function handleWidthChange() {
  const width = window.innerWidth || document.body.clientWidth;
  const currentCountryFromStorage =
    JSON.parse(sessionStorage.getItem("current-country")) || "CA";

  let thirdboxes;
  const third = document.querySelector(".third");

  if (third) {
    thirdboxes = third.querySelectorAll(".third-box");
  } else {
    thirdboxes = [];
  }

  const currentSourceId =
    (await JSON.parse(sessionStorage.getItem("currentSourceId"))) || "bbc-news";

  if (width > 950 && thirdboxes.length === 0) {
    console.log("changed");
    return slidesCreator(4);
  }

  if (width <= 950 && width > 550 && thirdboxes.length === 0) {
    console.log("changed");
    return slidesCreator(2);
  }

  if (width < 550 && thirdboxes.length === 0) {
    console.log("changed");
    return slidesCreator(1);
  }

  if (width > 950 && thirdboxes.length !== 4) {
    homePageReload("home", {
      topSource: currentSourceId,
      country: currentCountryFromStorage,
      localType: "news"
    });
  }

  if (width <= 950 && width > 550 && thirdboxes.length !== 2) {
    homePageReload("home", {
      topSource: currentSourceId,
      country: currentCountryFromStorage,
      localType: "news"
    });
  }

  if (width < 550 && thirdboxes.length !== 1) {
    homePageReload("home", {
      topSource: currentSourceId,
      country: currentCountryFromStorage,
      localType: "news"
    });
  }
}

async function singleSlideCreator(numberOfNewsPerSlide, slideNumber) {
  const currentSource =
    (await JSON.parse(sessionStorage.getItem("currentSourceId"))) || "bbc-news";

  const topNewsIdentifier = `top--${currentSource}`;
  const searchTopNewsIdentifier = `searchTop--${currentSource}`;

  const topNewsArray = await JSON.parse(
    sessionStorage.getItem(topNewsIdentifier)
  );

  const searchTopNewsArray = await JSON.parse(
    sessionStorage.getItem(searchTopNewsIdentifier)
  );

  let singleSlideHTML = "";

  // if (slideNumber === 0) {
  //   for (let i = 0; i < numberOfNewsPerSlide; i++) {
  //     singleSlideHTML += `
  //     <div class="third-box shadow white">
  //       <button>
  //         <h3 class="article-title">${maxCharactersApply(
  //           topNewsArray[i + 3].title,
  //           100
  //         )}</h3>
  //       </button>
  //       <p class="article-date">${ageCalc(
  //         topNewsArray[i + 3].publishedAt
  //       )}</p>
  //       <div class="image-container"
  //         style="background-image: url(${imageAvailability(
  //           topNewsArray[i + 3].urlToImage
  //         )});">
  //       </div>
  //     </div>
  //     `;
  //   }
  // } else {
  //   for (let i = 0; i < numberOfNewsPerSlide; i++) {
  //     singleSlideHTML += `
  //     <div class="third-box shadow white">
  //       <button>
  //         <h3 class="article-title">${maxCharactersApply(
  //           searchTopNewsArray[i + slideNumber * numberOfNewsPerSlide - 1]
  //             .title,
  //           100
  //         )}</h3>
  //       </button>
  //       <p class="article-date">${ageCalc(
  //         searchTopNewsArray[i + slideNumber * numberOfNewsPerSlide - 1]
  //           .publishedAt
  //       )}</p>
  //       <div class="image-container"
  //         style="background-image: url(${imageAvailability(
  //           searchTopNewsArray[i + slideNumber * numberOfNewsPerSlide - 1]
  //             .urlToImage
  //         )});">
  //       </div>
  //     </div>
  //     `;
  //   }
  // }

  for (let i = 0; i < numberOfNewsPerSlide; i++) {
    singleSlideHTML += `
      <div class="third-box shadow white">
        <a href="${
          searchTopNewsArray[i + slideNumber * numberOfNewsPerSlide].url
        }" class="article-title" target="_blank">
        <h3 class="article-title">${maxCharactersApply(
          searchTopNewsArray[i + slideNumber * numberOfNewsPerSlide].title,
          70
        )}</h3>
        </a>
        <p class="article-date">${ageCalc(
          searchTopNewsArray[i + slideNumber * numberOfNewsPerSlide].publishedAt
        )}</p>
        <div class="image-container"
          style="background-image: url(${imageAvailability(
            searchTopNewsArray[i + slideNumber * numberOfNewsPerSlide]
              .urlToImage
          )});">
        </div>
      </div>
      `;
  }

  return singleSlideHTML;
}

export async function slidesCreator(numberOfNewsPerSlide) {
  window.addEventListener("resize", handleWidthChange);

  let slidesHTML = "";

  let slideNumber;

  if (numberOfNewsPerSlide === 1) slideNumber = 20;
  if (numberOfNewsPerSlide === 2) slideNumber = 10;
  if (numberOfNewsPerSlide === 4) slideNumber = 5;

  for (let i = 0; i < slideNumber; i++) {
    let currentOrNext = "";

    if (i === 0) {
      currentOrNext = "current";
    }
    if (i === 1) {
      currentOrNext = "next";
    }

    slidesHTML += `
    <div class="slide ${currentOrNext}">
    <div class="third">
    ${await singleSlideCreator(numberOfNewsPerSlide, i)}
    </div>
    </div>
    `;
  }

  return slidesHTML;
}
