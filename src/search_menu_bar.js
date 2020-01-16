// ? Imports //
import { searchBar, searchIcon, mobileMenuIcon } from "./element_selectors";

// ! Toggle search bar display function ------------------------------------------------------------------------------ //
export function toggleSearchDisplay() {
  if (searchIcon.classList.contains("clicked")) {
    searchIcon.classList.remove("clicked");
    searchBar.classList.remove("display-search");
    searchBar.classList.add("hide-search");
    mobileMenuIcon.style.visibility = "";
  } else {
    searchIcon.classList.add("clicked");
    searchBar.classList.remove("hide-search");
    searchBar.classList.add("display-search");
    mobileMenuIcon.style.visibility = "hidden";
  }
}
// ! ----------------------------------------------------------------------------------------------------------------- //
