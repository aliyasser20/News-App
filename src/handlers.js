// ? Imports //
import { toggleSearchDisplay } from "./search_menu_bar";
import { toggleMobileMenuDisplay } from "./mobile_menu";
import { searchBarInput } from "./element_selectors";

// ! Handle search icon click function ------------------------------------------------------------------------------- //
export function handleSearchIconClick(e) {
  e.preventDefault();
  toggleSearchDisplay();
}
// ! ----------------------------------------------------------------------------------------------------------------- //

// ! Handle mobile menu icon click function -------------------------------------------------------------------------- //
export function handleMobileMenuIconClick(e) {
  e.preventDefault();
  toggleMobileMenuDisplay();
}
// ! ----------------------------------------------------------------------------------------------------------------- //

// ! Handle logo home button click function -------------------------------------------------------------------------- //
export function handleLogoHomeButtonClick(e) {
  e.preventDefault();
  console.log("home button clicked");
}
// ! ----------------------------------------------------------------------------------------------------------------- //

// ! Handle menu button click function ------------------------------------------------------------------------------- //
export function handleMenuButtonClick(e) {
  e.preventDefault();
  console.log(e.currentTarget);
}
// ! ----------------------------------------------------------------------------------------------------------------- //

// ! Handle search bar clear button click function ------------------------------------------------------------------- //
export function handleSearchBarClearClick(e) {
  e.preventDefault();
  searchBarInput.value = "";
}
// ! ------------------------------------------------------------------------------------------------------------------ //

// ! Handle search bar search button click function ------------------------------------------------------------------- //
export function handleSearchBarSearchClick(e) {
  e.preventDefault();
  const searchInputted = searchBarInput.value;
}
// ! ------------------------------------------------------------------------------------------------------------------ //
