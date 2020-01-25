// ? Imports //
import { toggleSearchDisplay } from "./search_menu_bar";
import { toggleMobileMenuDisplay } from "./mobile_menu";
import { searchBarInput } from "./element_selectors";
import { homePageReload } from "./page_reload";

// ? End of Imports //

export function handleSearchIconClick(e) {
  e.preventDefault();
  toggleSearchDisplay();
}

export function handleMobileMenuIconClick(e) {
  e.preventDefault();
  toggleMobileMenuDisplay();
}

export function handleLogoHomeButtonClick(e) {
  e.preventDefault();

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
    if (button.firstElementChild.innerText.toLowerCase() === "home") {
      newSelectedMenuButtons.push(button);
    }
  });

  newSelectedMenuButtons.forEach(button => {
    button.classList.add("selected");
  });

  const currentSourceId =
    JSON.parse(sessionStorage.getItem("currentSourceId")) || "bbc-news";

  const currentCountryFromStorage = JSON.parse(
    sessionStorage.getItem("current-country")
  );

  homePageReload("home", {
    topSource: currentSourceId,
    country: currentCountryFromStorage,
    localType: "news"
  });
}

export function handleMenuButtonClick(e) {
  e.preventDefault();
  const pressedButton = e.currentTarget.firstElementChild.innerText.toLowerCase();

  const currentSourceId =
    JSON.parse(sessionStorage.getItem("currentSourceId")) || "bbc-news";

  const currentCountryFromStorage = JSON.parse(
    sessionStorage.getItem("current-country")
  );

  if (pressedButton === "home") {
    homePageReload("home", {
      topSource: currentSourceId,
      country: currentCountryFromStorage,
      localType: "news"
    });
  } else if (pressedButton === "local") {
    homePageReload("category", {
      selectedCategory: currentCountryFromStorage,
      selectedParentCategory: currentCountryFromStorage
    });
  } else {
    homePageReload("category", {
      selectedCategory: pressedButton,
      selectedParentCategory: pressedButton
    });
  }

  window.scrollTo(0, 0);

  toggleSearchDisplay("off");
  toggleMobileMenuDisplay("off");

  const currentlySelectedMenuButtons = document.querySelectorAll(
    ".selected.menu-button"
  );

  currentlySelectedMenuButtons.forEach(button => {
    button.classList.remove("selected");
  });

  const newSelectedMenuButtons = [];

  const menuButtons = document.querySelectorAll(".menu-button");

  menuButtons.forEach(button => {
    if (button.firstElementChild.innerText.toLowerCase() === pressedButton) {
      newSelectedMenuButtons.push(button);
    }
  });

  newSelectedMenuButtons.forEach(button => {
    button.classList.add("selected");
  });
}

export function handleSearchBarClearClick(e) {
  e.preventDefault();
  searchBarInput.value = "";
}

export function handleSearchBarSearchClick(e) {
  e.preventDefault();
  const searchInputted = searchBarInput.value;
}
