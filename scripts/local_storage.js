export async function addNewsToLocalStorage(news, identifier) {
  // ? Get news //
  const recievedNews = await news;
  const recievedNewsArray = recievedNews.articles;
  localStorage.setItem(identifier, JSON.stringify(recievedNewsArray));
}

export async function addSourceOptionsToLocalStorage(sourceOptions) {
  const receivedSourceOptions = await sourceOptions;
  const receivedSourceOptionsArray = receivedSourceOptions.sources;
  localStorage.setItem(
    "sourceOptionsArray",
    JSON.stringify(receivedSourceOptionsArray)
  );
}
