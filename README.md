[![homepage][1]][2]

[1]: ./assets/readme-images/full-logo.png
[2]: https://newsapp-as.netlify.com/

Hi! This is a simple news aggregator single-page application deployed on [**Netlify**](https://newsapp-as.netlify.com/). This is my first web app. This SPA presents categorized news from 30+ sources and directs user to the original article on the source's website. 

The app makes use of two APIs: [**News API**](https://newsapi.org/) & [**Google GeoChart**](https://developers.google.com/chart/interactive/docs/gallery/geochart). This document should show how the app was roughly created and deployed.

## Technologies
* Adobe Xd
* HTML 5
* CSS 3
* SASS
* JavaScript (Vanilla)
* Parcel Bundler
* NPM
* Visual Studio Code

## App Preview

Here is a preview of the app's main sections:

![home-page](./assets/readme-images/home-page.gif)

![top-news-slider](./assets/readme-images/top-news-slider.gif)

![top-news-source](./assets/readme-images/top-news-source.gif)

![map](./assets/readme-images/map.gif)

![search](./assets/readme-images/search.gif)


## Pre-Development (UI Design)

Before the app was developed, an initial UI design was created on **Adobe Xd**. The design mainly presented the **structure** of the pages and the **color theme** with some modifications made later. This is my first time using Adobe Xd. 

Here is a preview of the initial design: 

![initial screenshots](assets/readme-images/screenshots-dark-yellow.png)

## APIs

### News API

The news provider API used in this app is [**newsapi.org**](https://newsapi.org/). This API allows two types of requests: **top news** request & **search news** request. News can be further filtered by **language**, **country**, **category** and **source**. Search results can also be sorted by **publish date**, **popularity**, or **relevancy**. 

The results of the API include: the article **title**, **headline**, **author**, **published date**, **source**, **url**, **url to image**, and **content** (truncated to 260 characters for free developer users).

Both types of requests were used in the app along with different filters and sorting for different sections. 

### Google GeoChart

This API is provided by [**Google**](https://developers.google.com/) and allows for data visualization in a map view. In this app, the map was used to select desired region for the local news section and page. 

## Page Load & Session Storage

On initial page load, a number of requests are made to the news API to get news for the main sections of the page. These news are then saved in session storage using generated identifier keys. Then, the the results are displayed on the page.

Any request made after that by searching news, changing top news source (default is BBC News), changing local news region (default is Canada) or selecting footer subcategories is saved first to session storage and then displayed on page. The reason behind this is the 500 requests/day limit set by News API. This caching of news allows for less requests to be made to avoid reaching daily limit. 

The **current source selected** for the top news section and the **current region selected** for local news are also stored and updated on session storage. 

Checking if news already present in session storage. Fetching and caching news if not:

```javascript
  if (
    !(await JSON.parse(sessionStorage.getItem(`top--${details.topSource}`)))
  ) {
    await addNewsToSessionStorage(
      fetchNews("top", { sources: details.topSource }),
      `top--${details.topSource}`
    );
  }
```

```javascript
export async function addNewsToSessionStorage(news, identifier) {
  const receivedNews = await news;
  const receivedNewsArray = receivedNews.articles;
  sessionStorage.setItem(identifier, JSON.stringify(receivedNewsArray));
}
```

Appending created elements to DOM:

```javascript
workingArea.appendChild(
  await createMainElement("home", {
    topSource: "bbc-news",
    country: "ca",
    localType: "news"
  })
);
```

```javascript
export async function createHomeElement(details) {
  const homeElement = document.createElement("div");
  homeElement.classList.add("home");

  homeElement.appendChild(await createTopNewsElement(details.topSource));
  homeElement.appendChild(
    await createLocalNewsElement(details.localType, details.country)
  );
  homeElement.appendChild(await createCategoryNewsElement());

  return homeElement;
}
```

## Deployment 

This app is deployed on [**Netlify**](https://newsapp-as.netlify.com/). The deployed version is connected to the github repository. Any pushed updates on the master branch automatically trigger a rebuild on the netlify server. 

A **package.json** file has been set up with all the dependencies needed for this app:

``` json
{
  "name": "newsapp",
  "version": "1.0.0",
  "description": "",
  "main": "./src/script.js",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html --public-url ./"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "parcel-bundler": "^1.12.4",
    "sass": "^1.24.4"
  },
  "dependencies": {
    "date-fns": "^2.9.0",
    "dotenv": "^8.2.0"
  },
  "browserslist": [
    "last 1 chrome versions"
  ]
}
```

The **build command** is ```npm run build```.

The **publish directory** is ```dist```.

API keys are set up on Netlify as environment variables.

## Run Locally

1. Clone git repository
2. Install dependencies using ```npm install```
3. Create a [News API](https://newsapi.org/) free account and get API key
4. Create a [Google](https://developers.google.com/) developer account and get API key
5. Create **.env** file in the root directory of the repository and add the API keys as environment variables:
   
```
newsAppApiKey = "add key here"
googleMapsApiKey = "add key here"
```

6. Run ```npm start```. Check localhost provided after execution ```(http://localhost:1234/)```

----
**Note**: This app was created for demo purposes only.