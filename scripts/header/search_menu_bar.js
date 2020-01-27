// ? Imports //
import {
  searchBar,
  searchIcon,
  mobileMenuIcon,
  searchBarClear,
  searchBarSearch
} from "../core/element_selectors";

import {
  handleSearchBarClearClick,
  handleSearchBarSearchClick
} from "../core/handlers";

// ! Toggle search bar display function ------------------------------------------------------------------------------ //
export function toggleSearchDisplay(forced) {
  const searchInput = searchBar.querySelector("input");

  if (searchIcon.classList.contains("clicked")) {
    searchIcon.classList.remove("clicked");
    searchBar.classList.remove("display-search");
    searchBar.classList.add("hide-search");
    mobileMenuIcon.style.visibility = "";

    searchInput.blur();

    // ? Remove event listener for search bar clear button //
    searchBarClear.removeEventListener("click", handleSearchBarClearClick);

    // ? Remove event listener for search bar search button //
    searchBarSearch.removeEventListener("click", handleSearchBarSearchClick);
  } else if (forced !== "off") {
    searchIcon.classList.add("clicked");
    searchBar.classList.remove("hide-search");
    searchBar.classList.add("display-search");
    mobileMenuIcon.style.visibility = "hidden";

    searchInput.focus();

    // ? Add event listener for search bar clear button //
    searchBarClear.addEventListener("click", handleSearchBarClearClick);

    // ? Add event listener for search bar search button //
    searchBarSearch.addEventListener("click", handleSearchBarSearchClick);
  }
}
// ! ----------------------------------------------------------------------------------------------------------------- //
