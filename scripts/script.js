// ? Imports //
import { drawMap } from "./google_maps_api";
import {
  searchIcon,
  mobileMenuIcon,
  logoButton,
  menuButtons
} from "./element_selectors";
import {
  handleSearchIconClick,
  handleMobileMenuIconClick,
  handleLogoHomeButtonClick,
  handleMenuButtonClick
} from "./handlers";
import { homePageReload } from "./page_reload";
// ? End of Imports //

// ? Draw map //
// drawMap();

// ? Add event listener for click on region //
// document.addEventListener("click", () => getSelection());

// ? Add event listener for search icon click //
searchIcon.addEventListener("click", handleSearchIconClick);

// ? Add event listener for mobile menu icon //
mobileMenuIcon.addEventListener("click", handleMobileMenuIconClick);

// ? Add event listener for scroll - must be present //
window.addEventListener("scroll", () => {
  document.documentElement.style.setProperty(
    "--scroll-y",
    `${window.scrollY}px`
  );
});

// ? Add event listener for logo home button //
logoButton.addEventListener("click", handleLogoHomeButtonClick);

// ? Add event listener for menu buttons //
menuButtons.forEach(button =>
  button.addEventListener("click", handleMenuButtonClick)
);

// ? Run on page load //
const currentSourceId =
  JSON.parse(sessionStorage.getItem("currentSourceId")) || "bbc-news";

homePageReload({ topSource: currentSourceId });

// ? Reconfigure vh for mobile //
window.addEventListener("resize", () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

// ? Disable hover states on mobile //
function hasTouch() {
  return (
    "ontouchstart" in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

if (hasTouch()) {
  // remove all the :hover stylesheets
  try {
    // prevent exception on browsers not supporting DOM styleSheets properly
    for (const si in document.styleSheets) {
      const styleSheet = document.styleSheets[si];
      if (!styleSheet.rules) continue;

      for (let ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
        if (!styleSheet.rules[ri].selectorText) continue;

        if (styleSheet.rules[ri].selectorText.match(":hover")) {
          styleSheet.deleteRule(ri);
        }
      }
    }
  } catch (ex) {}
}