// ? Imports //
import { createHomeElement } from "./home";
import { createSearchElement } from "./search";
import { createCategoryElement } from "./category";
// ? End of Imports //

export async function createMainElement(page, details) {
  const mainElement = document.createElement("main");
  if (page === "home") {
    mainElement.appendChild(await createHomeElement(details));
  } else if (page === "search") {
    mainElement.appendChild(createSearchElement(details.keyword));
  } else {
    mainElement.appendChild(createCategoryElement(page));
  }
  return mainElement;
}
