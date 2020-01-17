// ? Imports //
import {
  searchBar,
  searchIcon,
  mobileMenuIcon,
  searchBarClear,
  searchBarSearch
} from "./element_selectors";

import {
  handleSearchBarClearClick,
  handleSearchBarSearchClick
} from "./handlers";

// ! Toggle search bar display function ------------------------------------------------------------------------------ //
export function toggleSearchDisplay() {
  if (searchIcon.classList.contains("clicked")) {
    searchIcon.classList.remove("clicked");
    searchBar.classList.remove("display-search");
    searchBar.classList.add("hide-search");
    mobileMenuIcon.style.visibility = "";

    // ? Remove event listener for search bar clear button //
    searchBarClear.removeEventListener("click", handleSearchBarClearClick);

    // ? Remove event listener for search bar search button //
    searchBarSearch.removeEventListener("click", handleSearchBarSearchClick);
  } else {
    searchIcon.classList.add("clicked");
    searchBar.classList.remove("hide-search");
    searchBar.classList.add("display-search");
    mobileMenuIcon.style.visibility = "hidden";

    // ? Add event listener for search bar clear button //
    searchBarClear.addEventListener("click", handleSearchBarClearClick);

    // ? Add event listener for search bar search button //
    searchBarSearch.addEventListener("click", handleSearchBarSearchClick);
  }
}
// ! ----------------------------------------------------------------------------------------------------------------- //
