// ? Imports //
import { ageCalc, maxCharactersApply, imageAvailability } from "./utility";
import { homePageReload } from "./page_reload";
import { handleWidthChange } from "./slides";
// ? End of Imports //

export async function createTopNewsElement(currentSource) {
  // ? Retrieve from local storage //
  const sourceOptionsArray = await JSON.parse(
    localStorage.getItem("sourceOptionsArray")
  );

  let currentSourceName = "";

  sourceOptionsArray.forEach(sourceOption => {
    if (sourceOption.id === currentSource) {
      currentSourceName = sourceOption.name;
    }
  });

  // ? transform source options array into button strings //
  let sourceOptionsString = "";
  sourceOptionsArray.forEach(sourceOption => {
    if (sourceOption.language === "en") {
      sourceOptionsString += `<button class="source-option">${sourceOption.name}</button>
      `;
    }
  });

  const identifier = `top--${currentSource}`;
  const topNewsArray = await JSON.parse(localStorage.getItem(identifier));

  const topNewsElement = document.createElement("div");
  topNewsElement.classList.add("top-news");

  topNewsElement.innerHTML += `
    <span class="section-header">
    <h2 class="title">Top News</h2>
    <div class="line"></div>
    <button class="sources">${currentSourceName}</button>
    <div class="modal-outer" hidden></div>
    <div class="shadow source-menu-hidden source-menu">
      <p class="request">Please select a source:</p>
      <div class="source-options">
        ${sourceOptionsString}
      </div>
    </div>
    </span>
  `;

  topNewsElement.innerHTML += `
    <div class="news">
      <div class="first shadow white">
        <button>
          <h3 class="article-title">${maxCharactersApply(
            topNewsArray[0].title,
            100
          )}</h3>
        </button>
        <p class="article-headline">${maxCharactersApply(
          topNewsArray[0].description,
          140
        )}</p>
        <p class="article-date">${ageCalc(topNewsArray[0].publishedAt)}</p>
        <div class="image-container"
          style="background-image: url(${imageAvailability(
            topNewsArray[0].urlToImage
          )});">
        </div>
      </div>
      <div class="second">
        <div class="second-box shadow white">
          <button>
            <h3 class="article-title">${maxCharactersApply(
              topNewsArray[1].title,
              100
            )}</h3>
          </button>
          <p class="article-headline">${maxCharactersApply(
            topNewsArray[1].description,
            75
          )}</p>
          <p class="article-date">${ageCalc(topNewsArray[1].publishedAt)}</p>
          <div class="image-container"
            style="background-image: url(${imageAvailability(
              topNewsArray[1].urlToImage
            )});">
          </div>
        </div>
        <div class="second-box shadow white">
          <button>
            <h3 class="article-title">${maxCharactersApply(
              topNewsArray[2].title,
              100
            )}</h3>
          </button>
          <p class="article-headline">${maxCharactersApply(
            topNewsArray[2].description,
            75
          )}</p>
          <p class="article-date">${ageCalc(topNewsArray[2].publishedAt)}</p>
          <div class="image-container"
            style="background-image: url(${imageAvailability(
              topNewsArray[2].urlToImage
            )});">
          </div>
        </div>
      </div>
      <div class="slider">
        <button class="slider-left slider-unavailable"></button>
        <div class="slides">
          ${await handleWidthChange()}
        </div>
        <button class="slider-right slider-available shadow"></button>
      </div>
    </div>
  `;

  // ? Element selectors //
  const sourceButton = topNewsElement.querySelector(".sources");
  const sourceMenu = topNewsElement.querySelector(".source-menu");
  const modalOuter = topNewsElement.querySelector(".modal-outer");
  const sourceOptionButtons = topNewsElement.querySelectorAll(".source-option");
  const sliderLeftButton = topNewsElement.querySelector(".slider-left");
  const sliderRightButton = topNewsElement.querySelector(".slider-right");

  // ? Handlers //
  function handleSourceButtonClick() {
    sourceMenu.classList.add("source-menu-shown");
    sourceMenu.classList.remove("source-menu-hidden");
    modalOuter.removeAttribute("hidden");
  }

  function handleModalOuterClick() {
    sourceMenu.classList.add("source-menu-hidden");
    sourceMenu.classList.remove("source-menu-shown");
    modalOuter.setAttribute("hidden", "hidden");
  }

  function handleSourceOptionClick(e) {
    let currentSourceIdSelected = "";

    sourceOptionsArray.forEach(sourceOption => {
      if (sourceOption.name === e.target.innerText) {
        currentSourceIdSelected = sourceOption.id;
      }
    });

    localStorage.setItem(
      "currentSourceId",
      JSON.stringify(currentSourceIdSelected)
    );

    homePageReload({ topSource: currentSourceIdSelected });
  }

  function handleSliderLeftButtonClick(e) {
    const prevSlide = topNewsElement.querySelector(".prev");
    const currentSlide = topNewsElement.querySelector(".current");
    const nextSlide = topNewsElement.querySelector(".next");

    if (prevSlide) {
      e.target.parentNode.lastElementChild.classList.remove(
        "slider-unavailable"
      );
      e.target.parentNode.lastElementChild.classList.add("slider-available");
      e.target.parentNode.lastElementChild.classList.add("shadow");

      if (prevSlide.previousElementSibling) {
        prevSlide.previousElementSibling.classList.add("prev");
      } else {
        e.target.classList.remove("shadow");
        e.target.classList.remove("slider-available");
        e.target.classList.add("slider-unavailable");
      }

      currentSlide.classList.remove("current");
      currentSlide.classList.add("next");

      prevSlide.classList.remove("prev");
      prevSlide.classList.add("current");

      if (nextSlide) nextSlide.classList.remove("next");
    }
  }

  function handleSliderRightButtonClick(e) {
    const prevSlide = topNewsElement.querySelector(".prev");
    const currentSlide = topNewsElement.querySelector(".current");
    const nextSlide = topNewsElement.querySelector(".next");

    if (nextSlide) {
      e.target.parentNode.firstElementChild.classList.remove(
        "slider-unavailable"
      );
      e.target.parentNode.firstElementChild.classList.add("slider-available");
      e.target.parentNode.firstElementChild.classList.add("shadow");

      currentSlide.classList.remove("current");
      currentSlide.classList.add("prev");

      if (prevSlide) prevSlide.classList.remove("prev");

      nextSlide.classList.remove("next");
      nextSlide.classList.add("current");

      if (nextSlide.nextElementSibling) {
        nextSlide.nextElementSibling.classList.add("next");
      } else {
        e.target.classList.remove("shadow");
        e.target.classList.remove("slider-available");
        e.target.classList.add("slider-unavailable");
      }
    }
  }
  // ? Add event listeners //
  sourceButton.addEventListener("click", handleSourceButtonClick);
  modalOuter.addEventListener("click", handleModalOuterClick);
  sourceOptionButtons.forEach(sourceOptionButton =>
    sourceOptionButton.addEventListener("click", handleSourceOptionClick)
  );

  sliderLeftButton.addEventListener("click", handleSliderLeftButtonClick);
  sliderRightButton.addEventListener("click", handleSliderRightButtonClick);

  return topNewsElement;
}