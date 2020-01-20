// ? Imports //
import { fetchNews, fetchSources } from "./fetch_data";
import {
  addNewsToLocalStorage,
  addSourceOptionsToLocalStorage
} from "./local_storage";
import { createMainElement } from "./main";
// ? End of Imports //

export async function homePageReload(details) {
  // ? Select and clear main element //
  const mainElement = document.querySelector("main");
  if (mainElement) {
    mainElement.parentNode.removeChild(mainElement);
  }

  // ? News data is available on local storage don't fetch and add to local storage otherwise fetch and add to local storage //
  if (!(await JSON.parse(localStorage.getItem(`top--${details.topSource}`)))) {
    await addNewsToLocalStorage(
      fetchNews("top", { sources: details.topSource }),
      `top--${details.topSource}`
    );
    console.log("fetched news");
  }

  if (
    !(await JSON.parse(localStorage.getItem(`searchTop--${details.topSource}`)))
  ) {
    await addNewsToLocalStorage(
      fetchNews("search", { sources: details.topSource, sortBy: "popularity" }),
      `searchTop--${details.topSource}`
    );
    console.log("fetched searchTop news");
  }

  // ? Source options are available on local storage don't fetch and add to local storage otherwise fetch and add to local storage //
  if (!(await JSON.parse(localStorage.getItem("sourceOptionsArray")))) {
    await addSourceOptionsToLocalStorage(fetchSources());
    console.log("fetched sources");
  }

  // ? Create and add main element to page //
  document.body.appendChild(
    await createMainElement("home", { topSource: details.topSource })
  );
}
