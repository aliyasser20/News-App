// ? Imports //
import { fetchNews, fetchSources } from "./fetch_data";
import {
  addNewsToLocalStorage,
  addSourceOptionsToLocalStorage
} from "./local_storage";
import { createMainElement } from "./main";
import { workingArea } from "./element_selectors";
import { drawMap } from "./google_maps_api";
import { countriesArray } from "./country_code";
import { wait } from "./utility";

// ? End of Imports //

async function load(details) {
  // ? News data is available on local storage don't fetch and add to local storage otherwise fetch and add to local storage //
  // ? top //
  if (
    !(await JSON.parse(sessionStorage.getItem(`top--${details.topSource}`)))
  ) {
    await addNewsToLocalStorage(
      fetchNews("top", { sources: details.topSource }),
      `top--${details.topSource}`
    );
    console.log("fetched news");
  }

  // ? topsearch //
  if (
    !(await JSON.parse(
      sessionStorage.getItem(`searchTop--${details.topSource}`)
    ))
  ) {
    await addNewsToLocalStorage(
      fetchNews("search", {
        sources: details.topSource,
        sortBy: "popularity",
        pageSize: 20
      }),
      `searchTop--${details.topSource}`
    );
    console.log("fetched searchTop news");
  }

  // ? local //
  let countrySelectedName;

  countriesArray.forEach(countryEntry => {
    if (countryEntry[1] === details.country) {
      countrySelectedName = countryEntry[0];
    }
  });

  if (
    !(await JSON.parse(sessionStorage.getItem(`local--${details.country}`)))
  ) {
    await addNewsToLocalStorage(
      fetchNews("search", {
        keywords: countrySelectedName,
        pageSize: 40,
        sortBy: "relevancy"
      }),
      `local--${details.country}`
    );
    console.log("fetched local news");
  }

  // ? categories //
  const categoriesArray = [
    "business",
    "health",
    "sports",
    "science",
    "technology",
    "entertainment"
  ];

  categoriesArray.forEach(async function(category) {
    console.log("worked");
    if (!(await JSON.parse(sessionStorage.getItem(`category--${category}`)))) {
      await addNewsToLocalStorage(
        fetchNews("search", {
          keywords: category,
          pageSize: 60,
          sortBy: "relevancy"
        }),
        `category--${category}`
      );
      console.log("fetched category news");
    }
  });

  // ? Source options are available on local storage don't fetch and add to local storage otherwise fetch and add to local storage //
  if (!(await JSON.parse(sessionStorage.getItem("sourceOptionsArray")))) {
    await addSourceOptionsToLocalStorage(fetchSources());
    console.log("fetched sources");
  }
}

// ! --------------------------------------------------------------------------
export async function homePageReload(page, details) {
  if (page === "home") {
    // ? Try catch for handeling error //
    try {
      // ? Select and clear main element //
      const mainElement = document.querySelector("main");
      if (mainElement) {
        mainElement.parentNode.removeChild(mainElement);
      }

      await load(details);
      await wait(100);

      // ? Create and add main element to page //
      workingArea.appendChild(
        await createMainElement("home", {
          topSource: details.topSource,
          country: details.country,
          localType: details.localType
        })
      );
    } catch (error) {
      console.log(error);

      // ? Reset source id in session storage to bbc-news if error occurs //
      sessionStorage.setItem("currentSourceId", JSON.stringify("bbc-news"));

      sessionStorage.setItem("current-country", JSON.stringify("ca"));

      // ? Create and add main element to page using bbc news as top news source //
      workingArea.appendChild(
        await createMainElement("home", {
          topSource: "bbc-news",
          country: "ca",
          localType: details.localType
        })
      );
    }
  } else if (page === "search") {
    console.log("search");
  } else if (page === "category") {
    console.log("category");
  }

  if (details.localType === "map") {
    // ? Draw map //
    await drawMap();

    // ? Add event listener for click on region //
    document.addEventListener("click", () => getSelection());
  }
}
