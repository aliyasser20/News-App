// ? Imports //
import { fetchNews, fetchSources } from "./fetch_data";
import { drawMap } from "./google_maps_api";

// ? Get news //
// fetchNews("top", {
//   sources: "cbc-news"
// });

// ? Get sources //
// fetchSources();

// ? Draw map //
drawMap();

// ? Add event listner for click on region //
document.addEventListener("click", () => getSelection());
