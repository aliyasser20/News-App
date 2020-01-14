// ? Imports //
import {
  searchAreaForm,
  searchInput,
  searchButton,
  searchIcon
} from "./element_selectors";

// ! Toggle search bar display function ------------------------------------------------------------------------------ //
export function toggleSearchDisplay() {
  if (searchIcon.classList.contains("unclicked")) {
    searchIcon.classList.remove("unclicked");
    searchIcon.classList.add("clicked");
    searchAreaForm.classList.add("yes-search");
    searchInput.classList.remove("no-search");
    searchButton.classList.remove("no-search");
  } else {
    searchIcon.classList.add("unclicked");
    searchIcon.classList.remove("clicked");
    searchAreaForm.classList.remove("yes-search");
    searchInput.classList.add("no-search");
    searchButton.classList.add("no-search");
  }
}
// ! ----------------------------------------------------------------------------------------------------------------- //
