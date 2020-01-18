import { createTopNewsElement } from "./top_news";
import { createLocalNewsElement } from "./local_news";
import { createCategoryNewsElement } from "./category_news";

export function createHomeElement() {
  const homeElement = document.createElement("div");
  homeElement.classList.add("home");

  homeElement.appendChild(createTopNewsElement("All"));
  homeElement.appendChild(createLocalNewsElement);
  homeElement.appendChild(createCategoryNewsElement);

  return homeElement;
}
