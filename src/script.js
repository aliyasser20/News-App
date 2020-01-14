// ? Imports //
import { fetchNews, fetchSources } from "./fetch_data";
import { drawMap } from "./google_maps_api";
import {
  searchAreaForm,
  searchInput,
  searchButton,
  searchIcon
} from "./element_selectors";
import { handleSearchIconClick } from "./handlers";

// ? Get news //
// fetchNews("top", {
//   sources: "cbc-news"
// });

// ? Get sources //
// fetchSources();

// ? Draw map //
// drawMap();

// ? Add event listner for click on region //
// document.addEventListener("click", () => getSelection());

// ? Add event listner for search icon click //
searchIcon.addEventListener("click", handleSearchIconClick);
