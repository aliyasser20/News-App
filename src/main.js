import { createHomeElement } from "./home";
import { createSearchElement } from "./search";
import { createCategoryElement } from "./category";

export function createMainElement(page, keyword) {
  const mainElement = document.createElement("main");
  if (page === "home") {
    mainElement.appendChild(createHomeElement);
  } else if (page === "search") {
    mainElement.appendChild(createSearchElement(keyword));
  } else {
    mainElement.appendChild(createCategoryElement(page));
  }

  return mainElement;
}
