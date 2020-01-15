// ? Imports //
import { toggleSearchDisplay } from "./search_menu_bar";
import { toggleMobileMenuDisplay } from "./mobile_menu";

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
