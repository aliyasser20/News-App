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
    mainElement.appendChild(await createSearchElement(details.keyword));
  } else if (page === "category") {
    mainElement.appendChild(
      await createCategoryElement(
        details.selectedCategory,
        details.selectedParentCategory
      )
    );
  }
  return mainElement;
}
