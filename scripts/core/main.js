// ? Imports //
import { createHomeElement } from "../home-page/home";
import { createSearchElement } from "../search-page/search";
import { createCategoryElement } from "../category-page/category";
// ? End of Imports //

export async function createMainElement(page, details) {
  const mainElement = document.createElement("main");
  if (page === "home") {
    mainElement.appendChild(await createHomeElement(details));
  } else if (page === "search") {
    mainElement.appendChild(
      await createSearchElement(
        details.searchInput,
        details.searchSort,
        details.currentPage
      )
    );
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
