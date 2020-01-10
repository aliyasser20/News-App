// ? Define api main endpoint //
const endPoint = "https://newsapi.org";

// ? Define type subpoints //
const topNews = "/v2/top-headlines?";
const searchNews = "/v2/everything?";
const sourcesFinder = "/v2/sources?";

// ? Define parameter subpoints //
const languageSelector = "language=";
const keywordsSelector = "q=";
const countrySelector = "country=";
const categorySelector = "category=";
const sourcesSelector = "sources=";
const pageSizeSelector = "pageSize=";
const sortBySelector = "sortBy=";
const fromSelector = "from=";
const toSelector = "to=";

// ? Define api key //
const apiKey = "apiKey=5024963fa5464b67b100d3613c415c02";

// ? Define default parameters //
const defaultLanguage = "en";

//! Fetch news function ------------------------------------------------------------------------------------------------------- //
export async function fetchNews(typeOfNews, options) {
  let submitPoint = endPoint;

  // ? Update submit point url depending on type of news requested //
  if (typeOfNews === "top") {
    submitPoint += topNews;
  } else if (typeOfNews === "search") {
    submitPoint += searchNews;
  }

  // ? Add default english language parameter if no language specified //
  if (options && options.language) {
    submitPoint += `${languageSelector}${options.language}`;
  } else {
    submitPoint += `${languageSelector}${defaultLanguage}`;
  }

  // ? Add parameters that can be added to a top news request only//
  if (options && typeOfNews === "top") {
    if ("country" in options)
      submitPoint += `&${countrySelector}${options.country}`;
    if ("category" in options)
      submitPoint += `&${categorySelector}${options.category}`;
  }

  // ? Add parameters that can be added to a search news request only //
  if (options && typeOfNews === "search") {
    if ("sortBy" in options)
      submitPoint += `&${sortBySelector}${options.sortBy}`;
    if ("from" in options) submitPoint += `&${fromSelector}${options.from}`;
    if ("to" in options) submitPoint += `&${toSelector}${options.to}`;
  }

  // ? Add parameters that can be added to both types of news requests request only //
  if (options) {
    if ("keywords" in options)
      submitPoint += `&${keywordsSelector}${options.keywords}`;
    if ("sources" in options)
      submitPoint += `&${sourcesSelector}${options.sources}`;
    if ("pageSize" in options)
      submitPoint += `&${pageSizeSelector}${options.pageSize}`;
  }

  // ? Add api key //
  submitPoint += `&${apiKey}`;

  // ? Fetch news //
  const results = await fetch(submitPoint);
  const news = await results.json();

  // console.log(submitPoint);
  // console.log(news);
}
// ! --------------------------------------------------------------------------------------------------------------------------- //

//! Fetch sources function ----------------------------------------------------------------------------------------------------- //
export async function fetchSources() {
  const results = await fetch(`${endPoint}${sourcesFinder}${apiKey}`);
  const sources = await results.json();
  // console.log(sources);
}
// ! --------------------------------------------------------------------------------------------------------------------------- //
