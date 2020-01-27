export async function addNewsToLocalStorage(news, identifier) {
  // ? Get news //
  const recievedNews = await news;
  const recievedNewsArray = recievedNews.articles;
  sessionStorage.setItem(identifier, JSON.stringify(recievedNewsArray));
}

export async function addSourceOptionsToLocalStorage(sourceOptions) {
  const receivedSourceOptions = await sourceOptions;
  const receivedSourceOptionsArray = receivedSourceOptions.sources;
  sessionStorage.setItem(
    "sourceOptionsArray",
    JSON.stringify(receivedSourceOptionsArray)
  );
}
