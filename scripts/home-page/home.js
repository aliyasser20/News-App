// ? Imports //
import { createTopNewsElement } from "./top_news";
import { createLocalNewsElement } from "./local_news";
import { createCategoryNewsElement } from "./category_news";
// ? End of Imports //

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
