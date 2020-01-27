// ? Imports //
import {
  ageCalc,
  maxCharactersApply,
  imageAvailability
} from "../utilities/utility";
import { homePageReload } from "../core/page_reload";
import { toggleSearchDisplay } from "../header/search_menu_bar";
// ? End of Imports //

async function createEachCategoryElement(category) {
  const categoryElement = document.createElement("div");
  categoryElement.classList.add("category-news");

  categoryElement.innerHTML += `
  <span class="section-header">
    <h2 class="title">${category}</h2>
    <div class="line"></div>
    <button class="see-all">See All</button>
  </span>
  `;

  const newsElement = document.createElement("div");
  newsElement.classList.add("news");

  const identifier = `category--${category}`;
  const categoryNewsArray = await JSON.parse(
    sessionStorage.getItem(identifier)
  );

  let iterator = 0;

  const englishStringRegex = /(\sis\s)|(\sor\s)|(\sand\s)|(\sin\s)|(\sthis\s)|(\sthe\s)|(\san\s)|(\sof\s)|(\sby\s)|(\shave\s)/g;

  for (let i = 0; i < 4; i++) {
    if (categoryNewsArray[i + iterator].title.match(englishStringRegex)) {
      newsElement.innerHTML += `
        <div class="third-box shadow white">
          <a href="${
            categoryNewsArray[i + iterator].url
          }" class="article-title" target="_blank">
            <h3 class="article-title";">${maxCharactersApply(
              categoryNewsArray[i + iterator].title,
              70
            )}</h3>
          </a>
          <p class="article-date">${ageCalc(
            categoryNewsArray[i + iterator].publishedAt
          )}</p>
          <div class="image-container"
            style="background-image: url(${imageAvailability(
              categoryNewsArray[i + iterator].urlToImage
            )});">
          </div>
        </div>
        `;
    } else {
      iterator += 1;
      i -= 1;
    }
  }

  categoryElement.appendChild(newsElement);

  return categoryElement;
}

export async function createCategoryNewsElement() {
  const categoriesElement = document.createElement("div");
  categoriesElement.classList.add("categories");

  categoriesElement.appendChild(await createEachCategoryElement("business"));
  categoriesElement.appendChild(await createEachCategoryElement("health"));
  categoriesElement.appendChild(await createEachCategoryElement("sports"));
  categoriesElement.appendChild(await createEachCategoryElement("science"));
  categoriesElement.appendChild(await createEachCategoryElement("technology"));
  categoriesElement.appendChild(
    await createEachCategoryElement("entertainment")
  );

  function handleSeeAllButtonClick(e) {
    const parentElement = e.target.parentNode;
    const selectedCategoryTitle = parentElement
      .querySelector(".title")
      .innerText.toLowerCase();

    window.scrollTo(0, 0);

    toggleSearchDisplay("off");

    const currentlySelectedMenuButtons = document.querySelectorAll(
      ".selected.menu-button"
    );

    currentlySelectedMenuButtons.forEach(button => {
      button.classList.remove("selected");
    });

    const newSelectedMenuButtons = [];

    const menuButtons = document.querySelectorAll(".menu-button");

    menuButtons.forEach(button => {
      if (
        button.firstElementChild.innerText.toLowerCase() ===
        selectedCategoryTitle.toLowerCase()
      ) {
        newSelectedMenuButtons.push(button);
      }
    });

    newSelectedMenuButtons.forEach(button => {
      button.classList.add("selected");
    });

    homePageReload("category", {
      selectedCategory: selectedCategoryTitle,
      selectedParentCategory: selectedCategoryTitle
    });
  }

  const seeAllButtons = categoriesElement.querySelectorAll(".see-all");

  seeAllButtons.forEach(button =>
    button.addEventListener("click", handleSeeAllButtonClick)
  );
  return categoriesElement;
}
