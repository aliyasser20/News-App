// ? Imports //
import { toggleSearchDisplay } from "./search_menu_bar";
import { toggleMobileMenuDisplay } from "./mobile_menu";
import { searchBarInput } from "./element_selectors";
// ? End of Imports //

export function handleSearchIconClick(e) {
  e.preventDefault();
  toggleSearchDisplay();
}

export function handleMobileMenuIconClick(e) {
  e.preventDefault();
  toggleMobileMenuDisplay();
}

export function handleLogoHomeButtonClick(e) {
  e.preventDefault();
  console.log("home button clicked");
}

export function handleMenuButtonClick(e) {
  e.preventDefault();
  console.log(e.currentTarget);
}

export function handleSearchBarClearClick(e) {
  e.preventDefault();
  searchBarInput.value = "";
}

export function handleSearchBarSearchClick(e) {
  e.preventDefault();
  const searchInputted = searchBarInput.value;
}
