const endPoint = "https://api.currentsapi.services";
const latestNews = "/v1/latest-news?";
const searchNews = "/v1/search?";
const languageSelector = "language=";
const keywordsSelector = "keywords=";
const countrySelector = "country=";
const categorySelector = "category=";
const domainSelector = "domain=";
const apiKey = "apiKey=MTLbAdBXovp6xN8F8tpR9lOWcbvIhzMb0xpy1ei2TSKNGEcx";
const defaultLanguage = "en";

export async function fetchNews(typeOfNews, options) {
  let submitPoint = endPoint;

  if (typeOfNews === "latest") {
    submitPoint += latestNews;
  } else if (typeOfNews === "search") {
    submitPoint += searchNews;
  }

  if (options && options.language) {
    submitPoint += `${languageSelector}${options.language}`;
  } else {
    submitPoint += `${languageSelector}${defaultLanguage}`;
  }

  if (options && typeOfNews === "search") {
    if ("country" in options)
      submitPoint += `&${countrySelector}${options.country}`;
    if ("keywords" in options)
      submitPoint += `&${keywordsSelector}${options.keywords}`;
    if ("domain" in options)
      submitPoint += `&${domainSelector}${options.domain}`;
    if ("category" in options)
      submitPoint += `&${categorySelector}${options.category}`;
  }

  submitPoint += `&${apiKey}`;
  console.log(submitPoint);
  const results = await fetch(submitPoint);
  const news = await results.json();
  // console.log(news);
}
