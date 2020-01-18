// ? Imports //
import { createTopNewsElement } from "./top_news";
import { fetchNews, fetchSources } from "./fetch_data";
import {
  addNewsToLocalStorage,
  addSourceOptionsToLocalStorage
} from "./local_storage";
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
// import { createMainElement } from "./main";

// ? Get news //
// fetchNews("top", {
//   sources: "abc-news-au"
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

// const x = window.matchMedia("(max-width: 800px)");

// function handleWidthChange(width) {
//   if (width.matches) {
//     console.log("yes");
//   } else {
//     console.log("no");
//   }
// }

// handleWidthChange(x);

// x.addListener(handleWidthChange);

// ? Dump home page content html into body //
// document.body.appendChild(createMainElement("home"));

// const sourcesButton = mainElement.querySelector(".sources");
// sourcesButton.addEventListener("click", () => console.log("clickedd"));

// TODO
// addNewsToLocalStorage(
//   fetchNews("top", { sources: "bbc-news" }),
//   "top--BBC News"
// );

// addSourceOptionsToLocalStorage(fetchSources());

// createTopNewsElement("BBC News");
