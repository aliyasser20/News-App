// ? Imports //
import {
  ageCalc,
  maxCharactersApply,
  imageAvailability
} from "../utilities/utility";
import { homePageReload } from "../core/page_reload";
import { countriesArray } from "../utilities/country_code";
import { toggleSearchDisplay } from "../header/search_menu_bar";
// ? End of Imports //

export async function createLocalNewsElement(localType, country) {
  const currentSourceId = JSON.parse(sessionStorage.getItem("currentSourceId"));

  const identifier = `local--${country}`;
  const localNewsArray = await JSON.parse(sessionStorage.getItem(identifier));

  const localNewsElement = document.createElement("div");
  localNewsElement.classList.add("local-news");

  const localHeaderElement = document.createElement("span");
  localHeaderElement.classList.add("section-header");

  let hiddenOrNot = "";
  if (localType === "map") hiddenOrNot = "hidden";

  localHeaderElement.innerHTML += `
    <h2 class="following-title">Local News</h2>
    <button class="local-country">${country}</button>
    <div class="line"></div>
    <button class="see-all" ${hiddenOrNot}>See All</button>
  `;

  localNewsElement.appendChild(localHeaderElement);

  if (localType === "map") {
    const countrySelectorElement = document.createElement("div");
    countrySelectorElement.classList.add("country-selector-area");
    countrySelectorElement.classList.add("shadow");
    countrySelectorElement.classList.add("white");

    countrySelectorElement.innerHTML += `
      <div class="request-area">
        <p class="request">Please select region:</p>
        <div class="powered-google"></div>
      </div>
      <div id="regions_div"></div>
      <div class="country-buttons-area">
        <button class="country-button">Argentina</button>
        <button class="country-button">Austria</button>
        <button class="country-button">Australia</button>
        <button class="country-button">Bulgaria</button>
        <button class="country-button">Brazil</button>
        <button class="country-button">Canada</button>
        <button class="country-button">Switzerland</button>
        <button class="country-button">China</button>
        <button class="country-button">Colombia</button>
        <button class="country-button">Cuba</button>
        <button class="country-button">Czech Republic</button>
        <button class="country-button">Germany</button>
        <button class="country-button">Egypt</button>
        <button class="country-button">France</button>
        <button class="country-button">United Kingdom</button>
        <button class="country-button">Greece</button>
        <button class="country-button">Hong Kong</button>
        <button class="country-button">Hungary</button>
        <button class="country-button">Indonesia</button>
        <button class="country-button">Ireland</button>
        <button class="country-button">India</button>
        <button class="country-button">Italy</button>
        <button class="country-button">Japan</button>
        <button class="country-button">South Korea</button>
        <button class="country-button">Lithuania</button>
        <button class="country-button">Latvia</button>
        <button class="country-button">Morocco</button>
        <button class="country-button">Mexico</button>
        <button class="country-button">Malaysia</button>
        <button class="country-button">Nigeria</button>
        <button class="country-button">Netherlands</button>
        <button class="country-button">Norway</button>
        <button class="country-button">New Zealand</button>
        <button class="country-button">Philippines</button>
        <button class="country-button">Poland</button>
        <button class="country-button">Portugal</button>
        <button class="country-button">Romania</button>
        <button class="country-button">Serbia</button>
        <button class="country-button">Russia</button>
        <button class="country-button">Saudi Arabia</button>
        <button class="country-button">Sweden</button>
        <button class="country-button">Singapore</button>
        <button class="country-button">Slovenia</button>
        <button class="country-button">Slovakia</button>
        <button class="country-button">Thailand</button>
        <button class="country-button">Turkey</button>
        <button class="country-button">Taiwan</button>
        <button class="country-button">Ukraine</button>
        <button class="country-button">United Arab Emirates</button>
        <button class="country-button">United States</button>
        <button class="country-button">Venezuela</button>
        <button class="country-button">South Africa</button>
      </div>
    `;

    localNewsElement.appendChild(countrySelectorElement);
  }

  if (localType === "news") {
    const newsElement = document.createElement("div");
    newsElement.classList.add("news");

    const textDirection = "left";

    let iterator = 0;

    for (let i = 0; i < 6; i++) {
      if (
        localNewsArray[i + iterator].title &&
        localNewsArray[i + iterator].url &&
        localNewsArray[i + iterator].description &&
        localNewsArray[i + iterator].title.length > 1 &&
        localNewsArray[i + iterator].url.length > 1 &&
        localNewsArray[i + iterator].description.length > 1
      ) {
        newsElement.innerHTML += `
        <div class="card">
          <div class="second-box shadow white">
            <a href="${
              localNewsArray[i + iterator].url
            }" class="article-title" target="_blank">
            <h3 class="article-title" style="text-align: ${textDirection};">${maxCharactersApply(
          localNewsArray[i + iterator].title,
          100
        )}</h3>
            </a>
            <p class="article-headline" style="text-align: ${textDirection};">${maxCharactersApply(
          localNewsArray[i + iterator].description,
          75
        )}</p>
            <p class="article-date">${ageCalc(
              localNewsArray[i + iterator].publishedAt
            )}</p>
            <div class="image-container"
              style="background-image: url(${imageAvailability(
                localNewsArray[i + iterator].urlToImage
              )});">
            </div>
          </div>
        </div>
        `;
      } else {
        iterator += 1;
        i -= 1;
      }
    }

    localNewsElement.appendChild(newsElement);
  }

  // ? Handle toggle button click function //
  function handleCountryTogglerButtonClick(e) {
    const nextMjaorElment = e.target.parentNode.nextElementSibling;

    if (nextMjaorElment.classList.contains("news")) {
      homePageReload("home", {
        topSource: currentSourceId,
        country,
        localType: "map"
      });
    }

    if (nextMjaorElment.classList.contains("country-selector-area")) {
      homePageReload("home", {
        topSource: currentSourceId,
        country,
        localType: "news"
      });
    }
  }

  // ? Handle country button click function //
  function handleCountryButtonClick(e) {
    console.log(e.target.innerText);

    let countrySelectedCode;

    countriesArray.forEach(countryEntry => {
      if (countryEntry[0] === e.target.innerText) {
        countrySelectedCode = countryEntry[1];
      }
    });

    sessionStorage.setItem(
      "current-country",
      JSON.stringify(countrySelectedCode)
    );

    homePageReload("home", {
      topSource: currentSourceId,
      country: countrySelectedCode,
      localType: "news"
    });
  }

  // ? Select and add event listener to country toggler button //
  const countryTogglerButton = localNewsElement.querySelector(".local-country");
  countryTogglerButton.addEventListener(
    "click",
    handleCountryTogglerButtonClick
  );

  // ? Select and add event listeners to country buttons //
  const countryButtons = localNewsElement.querySelectorAll(".country-button");
  countryButtons.forEach(button =>
    button.addEventListener("click", handleCountryButtonClick)
  );

  function handleSeeAllButtonClick(e) {
    const parentElement = e.target.parentNode;
    const selectedcountry = parentElement
      .querySelector(".local-country")
      .innerText.toLowerCase();

    console.log(selectedcountry);

    window.scrollTo(0, 0);

    toggleSearchDisplay("off");

    const currentlySelectedMenuButtons = document.querySelectorAll(
      ".selected.menu-button"
    );

    currentlySelectedMenuButtons.forEach(button => {
      button.classList.remove("selected");
    });

    const newSelectedMenuButtons = [];

    const menuButtons = document.querySelectorAll(".menu-button");

    menuButtons.forEach(button => {
      if (button.firstElementChild.innerText.toLowerCase() === "local") {
        newSelectedMenuButtons.push(button);
      }
    });

    newSelectedMenuButtons.forEach(button => {
      button.classList.add("selected");
    });

    homePageReload("category", {
      selectedCategory: selectedcountry,
      selectedParentCategory: selectedcountry
    });
  }

  const seeAllButton = localNewsElement.querySelector(".see-all");
  seeAllButton.addEventListener("click", handleSeeAllButtonClick);

  return localNewsElement;
}
