// ? Imports //
import {
  mobileMenuArea,
  mobileMenuIcon,
  searchIcon
} from "./element_selectors";

// ! Toggle mobile menu bar display function ------------------------------------------------------------------------- //
export function toggleMobileMenuDisplay() {
  if (mobileMenuIcon.classList.contains("menu-clicked")) {
    mobileMenuIcon.classList.remove("menu-clicked");
    mobileMenuArea.classList.remove("display");
    mobileMenuArea.classList.add("hide");
    searchIcon.style.visibility = "";

    // ? Scroll stop and fix //
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  } else {
    mobileMenuIcon.classList.add("menu-clicked");
    mobileMenuArea.classList.remove("hide");
    mobileMenuArea.classList.add("display");
    searchIcon.style.visibility = "hidden";

    // ? Scroll stop and fix //
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  }
}
// ! ----------------------------------------------------------------------------------------------------------------- //
