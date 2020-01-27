// ? Imports //
import {
  ageCalc,
  maxCharactersApply,
  imageAvailability
} from "../utilities/utility";
import { countriesArray } from "../utilities/country_code";
import { fetchNews } from "../apis/fetch_data";
import { addNewsToLocalStorage } from "../session-storage/local_storage";
// ? End of Imports //

export async function createCategoryElement(
  selectedCategory,
  selectedParentCategory
) {
  console.log(selectedCategory);
  const categoryPageElement = document.createElement("div");
  categoryPageElement.classList.add("category-page");

  const categoryPageHeaderElement = document.createElement("div");
  categoryPageHeaderElement.classList.add("category-header");

  let identifier;
  let categoryPageNewsArray;

  if (selectedCategory.length === 2) {
    identifier = `local--${selectedCategory}`;
    categoryPageNewsArray = await JSON.parse(
      sessionStorage.getItem(identifier)
    );
    console.log("local news more");

    let countrySelectedName;

    countriesArray.forEach(countryEntry => {
      if (countryEntry[1] === selectedCategory) {
        countrySelectedName = countryEntry[0];
      }
    });

    if (selectedCategory === "uk") countrySelectedName = "United Kingdom";

    categoryPageHeaderElement.innerHTML += `
    <div class="category-header">
      <h2>${countrySelectedName}</h2>
    </div>
    `;
  } else if (
    selectedCategory === "business" ||
    selectedCategory === "health" ||
    selectedCategory === "sports" ||
    selectedCategory === "science" ||
    selectedCategory === "technology" ||
    selectedCategory === "entertainment"
  ) {
    identifier = `category--${selectedCategory}`;

    categoryPageNewsArray = await JSON.parse(
      sessionStorage.getItem(identifier)
    );

    categoryPageHeaderElement.innerHTML += `
    <div class="category-header">
      <h2>${selectedCategory}</h2>
    </div>
    `;
  } else if (selectedCategory === "us  &  canada") {
    identifier = "local--us";
    categoryPageNewsArray = await JSON.parse(
      sessionStorage.getItem(identifier)
    );

    const countrySelectedName = "US&nbsp & &nbspCanada";

    categoryPageHeaderElement.innerHTML += `
    <div class="category-header">
      <h2>${countrySelectedName}</h2>
    </div>
    `;
  } else {
    identifier = `else--${selectedCategory}`;

    if (!(await JSON.parse(sessionStorage.getItem(identifier)))) {
      await addNewsToLocalStorage(
        fetchNews("search", {
          keywords: selectedCategory,
          pageSize: 50,
          sortBy: "relevancy"
        }),
        identifier
      );
    }

    categoryPageNewsArray = await JSON.parse(
      sessionStorage.getItem(identifier)
    );

    categoryPageHeaderElement.innerHTML += `
      <div class="category-header">
        <h2>${selectedParentCategory} - ${selectedCategory}</h2>
      </div>
      `;
    console.log("fetched else news");
  }

  const categoryPageNewsElement = document.createElement("div");
  categoryPageNewsElement.classList.add("category-page-news");

  categoryPageNewsElement.innerHTML += `
  <div class="first-card">
    <div class="second-box shadow white">
      <a href="${
        categoryPageNewsArray[0].url
      }" class="article-title" target="_blank">
        <h3 class="article-title">${maxCharactersApply(
          categoryPageNewsArray[0].title,
          100
        )}</h3>
      </a>
      <p class="article-headline">${maxCharactersApply(
        categoryPageNewsArray[0].description,
        140
      )}</p>
      <p class="article-date">${ageCalc(
        categoryPageNewsArray[0].publishedAt
      )}</p>
      <div class="image-container"
        style="background-image: url(${imageAvailability(
          categoryPageNewsArray[0].urlToImage
        )});">
      </div>
    </div>
  </div>
  `;

  let iterator = 0;

  for (let i = 1; i < 15; i++) {
    if (
      categoryPageNewsArray[i + iterator].title &&
      categoryPageNewsArray[i + iterator].url &&
      categoryPageNewsArray[i + iterator].description &&
      categoryPageNewsArray[i + iterator].title.length > 1 &&
      categoryPageNewsArray[i + iterator].url.length > 1 &&
      categoryPageNewsArray[i + iterator].description.length > 1
    ) {
      categoryPageNewsElement.innerHTML += `
      <div class="card">
        <div class="second-box shadow white">
          <a href="${
            categoryPageNewsArray[i + iterator].url
          }" class="article-title" target="_blank">
            <h3 class="article-title">${maxCharactersApply(
              categoryPageNewsArray[i + iterator].title,
              80
            )}</h3>
          </a>
          <p class="article-headline">${maxCharactersApply(
            categoryPageNewsArray[i + iterator].description,
            75
          )}</p>
          <p class="article-date">${ageCalc(
            categoryPageNewsArray[i + iterator].publishedAt
          )}</p>
          <div class="image-container"
            style="background-image: url(${imageAvailability(
              categoryPageNewsArray[i + iterator].urlToImage
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

  for (let i = 15; i < 39; i++) {
    if (
      categoryPageNewsArray[i + iterator].title &&
      categoryPageNewsArray[i + iterator].url &&
      categoryPageNewsArray[i + iterator].description &&
      categoryPageNewsArray[i + iterator].title.length > 1 &&
      categoryPageNewsArray[i + iterator].url.length > 1 &&
      categoryPageNewsArray[i + iterator].description.length > 1
    ) {
      categoryPageNewsElement.innerHTML += `
    <div class="card" hidden>
        <div class="second-box shadow white">
          <a href="${
            categoryPageNewsArray[i].url
          }" class="article-title" target="_blank">
            <h3 class="article-title">${maxCharactersApply(
              categoryPageNewsArray[i].title,
              100
            )}</h3>
          </a>
          <p class="article-headline">${maxCharactersApply(
            categoryPageNewsArray[i].description,
            75
          )}</p>
          <p class="article-date">${ageCalc(
            categoryPageNewsArray[i].publishedAt
          )}</p>
          <div class="image-container"
            style="background-image: url(${imageAvailability(
              categoryPageNewsArray[i].urlToImage
            )});">
          </div>
        </div>
      </div>
    `;
    } else {
      iterator += 1;
      i -= 1;
    }

    if (i + iterator === categoryPageNewsArray.length - 1) {
      return;
    }
  }

  const showMoreButtonAreaElement = document.createElement("div");
  showMoreButtonAreaElement.classList.add("show-more");

  showMoreButtonAreaElement.innerHTML = `
  <button class="show-more-button">
    <p>Show More</p>
  </button>
  `;

  categoryPageElement.appendChild(categoryPageHeaderElement);
  categoryPageElement.appendChild(categoryPageNewsElement);
  categoryPageElement.appendChild(showMoreButtonAreaElement);

  let showMoreCounter = 0;

  function handleShowMoreButtonClick() {
    const hiddenElements = categoryPageElement.querySelectorAll("[hidden]");

    if (hiddenElements.length > 0) {
      for (let i = 0; i < 8; i++) {
        hiddenElements[i].removeAttribute("hidden");
      }
      showMoreCounter += 1;
    }

    if (showMoreCounter === 3) {
      showMoreButtonAreaElement.classList.remove("show-more");
      showMoreButtonAreaElement.classList.add("show-more-hidden");
    }
  }

  const showMoreButton = categoryPageElement.querySelector(".show-more-button");
  showMoreButton.addEventListener("click", handleShowMoreButtonClick);

  return categoryPageElement;
}
