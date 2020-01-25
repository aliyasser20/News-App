// ? Imports //
import {
  mobileMenuArea,
  mobileMenuIcon,
  searchIcon
} from "./element_selectors";

// ! Toggle mobile menu bar display function ------------------------------------------------------------------------- //
export function toggleMobileMenuDisplay(forced) {
  if (mobileMenuIcon.classList.contains("menu-clicked")) {
    mobileMenuIcon.classList.remove("menu-clicked");
    mobileMenuArea.classList.remove("display-mobile-menu");
    mobileMenuArea.classList.add("hide-mobile-menu");
    searchIcon.style.visibility = "";

    // ? Scroll stop and fix //
    const scrollYYY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";

    if (forced !== "off") {
      window.scrollTo(0, parseInt(scrollYYY || "0") * -1);
    }
  } else if (forced !== "off") {
    mobileMenuIcon.classList.add("menu-clicked");
    mobileMenuArea.classList.remove("hide-mobile-menu");
    mobileMenuArea.classList.add("display-mobile-menu");
    searchIcon.style.visibility = "hidden";

    // ? Scroll stop and fix //
    document.body.style.position = "fixed";
    const scrollYY = document.documentElement.style.getPropertyValue(
      "--scroll-y"
    );
    document.body.style.top = `-${scrollYY}`;
  }
}
// ! ----------------------------------------------------------------------------------------------------------------- //
