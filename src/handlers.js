// ? Imports //
import { toggleSearchDisplay } from "./search_menu_bar";

// ! Handle search icon click function ------------------------------------------------------------------------------- //
export function handleSearchIconClick(e) {
  e.preventDefault();
  toggleSearchDisplay();
}
// ! ----------------------------------------------------------------------------------------------------------------- //
