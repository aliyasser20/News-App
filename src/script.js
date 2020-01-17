// ? Imports //
import { fetchNews, fetchSources } from "./fetch_data";
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

// ? Get news //
// fetchNews("top", {
//   sources: "bbc-news"
// });

// ? Get sources //
// fetchSources();

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
