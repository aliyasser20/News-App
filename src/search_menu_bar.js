// ? Imports //
import { searchBar, searchIcon, mobileMenuIcon } from "./element_selectors";

// ! Toggle search bar display function ------------------------------------------------------------------------------ //
export function toggleSearchDisplay() {
  if (searchIcon.classList.contains("clicked")) {
    searchIcon.classList.remove("clicked");
    searchBar.classList.remove("display");
    searchBar.classList.add("hide");
    mobileMenuIcon.style.visibility = "";
  } else {
    searchIcon.classList.add("clicked");
    searchBar.classList.remove("hide");
    searchBar.classList.add("display");
    mobileMenuIcon.style.visibility = "hidden";
  }
}
// ! ----------------------------------------------------------------------------------------------------------------- //
