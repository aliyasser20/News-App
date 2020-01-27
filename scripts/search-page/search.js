// ? Imports //
import {
  ageCalc,
  maxCharactersApply,
  imageAvailability
} from "../utilities/utility";
import { fetchNews } from "../apis/fetch_data";
import { addNewsToLocalStorage } from "../session-storage/local_storage";
import { homePageReload } from "../core/page_reload";

// ? End of Imports //

export async function createSearchElement(
  searchInput,
  searchSort,
  currentPage
) {
  const identifier = `search--${searchInput}--${searchSort}`;

  if (!(await JSON.parse(sessionStorage.getItem(identifier)))) {
    await addNewsToLocalStorage(
      fetchNews("search", {
        keywords: searchInput,
        pageSize: 70,
        sortBy: searchSort
      }),
      identifier
    );
  }

  const searchPageNewsArray = await JSON.parse(
    sessionStorage.getItem(identifier)
  );

  const searchPageElement = document.createElement("div");
  searchPageElement.classList.add("search-page");

  const searchPageBarArea = document.createElement("div");
  searchPageBarArea.classList.add("search-page-bar-area");

  searchPageBarArea.innerHTML = `
  <form>
    <button class="search-bar-search">
      <div class="search-bar-icon"></div>
    </button>
    <input type="text" placeholder="Search news ..." value="${searchInput}">
    <button class="search-bar-clear">&nbsp&nbspClear</button>
  </form>
  `;

  const noResultsElement = document.createElement("h3");
  noResultsElement.classList.add("no-results");

  noResultsElement.innerText = "No results found";

  const sortArea = document.createElement("div");
  sortArea.classList.add("sort-area");

  sortArea.innerHTML += `
  <p>Sort by:</p>
  `;

  const sortOptionsArray = ["Latest", "Popularity", "Relevancy"];

  sortOptionsArray.forEach(option => {
    if (option === searchSort) {
      sortArea.innerHTML += `
      <button class="sort-button selected-sort">${option}</button>
      `;
    } else {
      sortArea.innerHTML += `
      <button class="sort-button">${option}</button>
      `;
    }
  });

  const searchNewsElement = document.createElement("div");
  searchNewsElement.classList.add("search-news");

  let iterator = 0;

  const from = 0 + currentPage * 10;
  const to = 9 + currentPage * 10;

  if (searchPageNewsArray.length > 0) {
    for (let i = from; i < to; i++) {
      if (
        searchPageNewsArray[i + iterator].title &&
        searchPageNewsArray[i + iterator].url &&
        searchPageNewsArray[i + iterator].description &&
        searchPageNewsArray[i + iterator].title.length > 1 &&
        searchPageNewsArray[i + iterator].url.length > 1 &&
        searchPageNewsArray[i + iterator].description.length > 1
      ) {
        searchNewsElement.innerHTML += `
      <div class="card">
        <div class="second-box shadow white">
          <a href="${
            searchPageNewsArray[i + iterator].url
          }" class="article-title" target="_blank">
            <h3 class="article-title">${maxCharactersApply(
              searchPageNewsArray[i + iterator].title,
              80
            )}</h3>
          </a>
          <p class="article-headline">${maxCharactersApply(
            searchPageNewsArray[i + iterator].description,
            75
          )}</p>
          <p class="article-date">${ageCalc(
            searchPageNewsArray[i + iterator].publishedAt
          )}</p>
          <div class="image-container"
            style="background-image: url(${imageAvailability(
              searchPageNewsArray[i + iterator].urlToImage
            )});">
          </div>
        </div>
      </div>
    `;
      } else {
        iterator += 1;
        i -= 1;
      }

      if (i + iterator === searchPageNewsArray.length - 1) {
        return;
      }
    }
  }

  const changePageArea = document.createElement("div");
  changePageArea.classList.add("change-page-area");

  if (currentPage > 1) {
    changePageArea.innerHTML += `
    <button class="change-page-button">
      <div class="prev-icon"></div>
      <p>Previous</p>
    </button>
    `;
  }

  const pageNumbersArray = ["1", "2", "3", "4", "5"];

  pageNumbersArray.forEach(page => {
    if (page === currentPage) {
      changePageArea.innerHTML += `
      <button class="change-page-button-selected">
        <p>${page}</p>
      </button>
      `;
    } else {
      changePageArea.innerHTML += `
      <button class="change-page-button">
        <p>${page}</p>
      </button>
      `;
    }
  });

  if (currentPage < 5) {
    changePageArea.innerHTML += `
    <button class="change-page-button">
      <p>Next</p>
      <div class="next-icon"></div>
    </button>
    `;
  }

  searchPageElement.appendChild(searchPageBarArea);

  function handlePageNavigationButton(e) {
    const pressedButton = e.currentTarget.querySelector("p").innerText;

    window.scrollTo(0, 0);

    if (pressedButton === "Previous") {
      homePageReload("search", {
        searchInput,
        searchSort,
        currentPage: `${currentPage - 1}`
      });
    } else if (pressedButton === "Next") {
      homePageReload("search", {
        searchInput,
        searchSort,
        currentPage: `${Number(currentPage) + 1}`
      });
    } else {
      homePageReload("search", {
        searchInput,
        searchSort,
        currentPage: `${pressedButton}`
      });
    }
  }

  function handleSortByButton(e) {
    const pressedButton = e.currentTarget.innerText;

    window.scrollTo(0, 0);

    homePageReload("search", {
      searchInput,
      searchSort: pressedButton,
      currentPage: "1"
    });
  }

  if (searchPageNewsArray.length === 0) {
    searchPageElement.appendChild(noResultsElement);
  } else {
    searchPageElement.appendChild(sortArea);
    searchPageElement.appendChild(searchNewsElement);
    searchPageElement.appendChild(changePageArea);

    const pageNavigationButtons = searchPageElement.querySelectorAll(
      ".change-page-button"
    );

    pageNavigationButtons.forEach(button =>
      button.addEventListener("click", handlePageNavigationButton)
    );

    const sortByButtons = searchPageElement.querySelectorAll(".sort-button");

    sortByButtons.forEach(button =>
      button.addEventListener("click", handleSortByButton)
    );
  }

  const inputBar = searchPageElement.querySelector("input");

  function handleSubmit(e) {
    e.preventDefault();

    window.scrollTo(0, 0);

    if (inputBar.value.length > 0) {
      homePageReload("search", {
        searchInput: inputBar.value,
        searchSort: "Latest",
        currentPage: "1"
      });
    }
    inputBar.blur();
  }

  const searchForm = searchPageElement.querySelector("form");
  searchForm.addEventListener("submit", handleSubmit);

  const clearButton = searchPageElement.querySelector(".search-bar-clear");
  clearButton.addEventListener("click", () => {
    inputBar.focus();
    inputBar.value = "";
  });

  return searchPageElement;
}
