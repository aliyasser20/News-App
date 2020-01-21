// ? Imports //
import { fetchNews, fetchSources } from "./fetch_data";
import {
  addNewsToLocalStorage,
  addSourceOptionsToLocalStorage
} from "./local_storage";
import { createMainElement } from "./main";
import { workingArea } from "./element_selectors";
// ? End of Imports //

export async function homePageReload(details) {
  // ? Try catch for handeling error //
  try {
    // ? Select and clear main element //
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.parentNode.removeChild(mainElement);
    }

    // ? News data is available on local storage don't fetch and add to local storage otherwise fetch and add to local storage //
    if (
      !(await JSON.parse(sessionStorage.getItem(`top--${details.topSource}`)))
    ) {
      await addNewsToLocalStorage(
        fetchNews("top", { sources: details.topSource }),
        `top--${details.topSource}`
      );
      console.log("fetched news");
    }

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

    // ? Source options are available on local storage don't fetch and add to local storage otherwise fetch and add to local storage //
    if (!(await JSON.parse(sessionStorage.getItem("sourceOptionsArray")))) {
      await addSourceOptionsToLocalStorage(fetchSources());
      console.log("fetched sources");
    }

    // ? Create and add main element to page //
    workingArea.appendChild(
      await createMainElement("home", { topSource: details.topSource })
    );
  } catch (error) {
    console.log(error);

    // ? Reset source id in session storage to bbc-news if error occurs //
    sessionStorage.setItem("currentSourceId", JSON.stringify("bbc-news"));

    // ? Create and add main element to page using bbc news as top news source //
    workingArea.appendChild(
      await createMainElement("home", { topSource: "bbc-news" })
    );
  }
}
