// ? Imports //
import { toggleSearchDisplay } from "../header/search_menu_bar";
import { toggleMobileMenuDisplay } from "../header/mobile_menu";
import { searchBarInput, searchIcon } from "./element_selectors";
import { homePageReload } from "./page_reload";

// ? End of Imports //

export function handleSearchIconClick(e) {
  e.preventDefault();
  toggleSearchDisplay();
}

export function handleMobileMenuIconClick(e) {
  e.preventDefault();
  const tester = document.querySelector(".search-page");

  if (tester) {
    toggleMobileMenuDisplay("no search");
  } else {
    toggleMobileMenuDisplay();
  }
}

export function handleLogoHomeButtonClick(e) {
  e.preventDefault();

  window.scrollTo(0, 0);

  toggleSearchDisplay("off");
  searchIcon.style.visibility = "";

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
  searchIcon.style.visibility = "";

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
  searchBarInput.focus();
}

export function handleSearchBarSearchClick(e) {
  e.preventDefault();
  const searchInputted = searchBarInput.value;

  window.scrollTo(0, 0);
  toggleSearchDisplay("off");
  searchIcon.style.visibility = "hidden";

  const currentlySelectedMenuButtons = document.querySelectorAll(
    ".selected.menu-button"
  );

  currentlySelectedMenuButtons.forEach(button => {
    button.classList.remove("selected");
  });

  if (searchBarInput.value.length > 0) {
    homePageReload("search", {
      searchInput: searchInputted,
      searchSort: "Latest",
      currentPage: "1"
    });
  }

  searchBarInput.value = "";
  searchBarInput.blur();
}

export function handleFooterButtonClick(e) {
  e.preventDefault();

  const pressedButtonElement = e.currentTarget;
  const pressedButton = e.currentTarget.innerText.toLowerCase();
  let parentButtonElement;
  let parentButton;

  if (pressedButtonElement.classList.contains("following-link")) {
    const buttonParentElement = e.currentTarget.parentNode.parentNode;
    parentButtonElement = buttonParentElement.querySelector(".category-link");
    parentButton = parentButtonElement.innerText.toLowerCase();

    homePageReload("category", {
      selectedCategory: pressedButton,
      selectedParentCategory: parentButton
    });
  } else {
    homePageReload("category", {
      selectedCategory: pressedButton,
      selectedParentCategory: pressedButton
    });

    parentButton = pressedButton;
  }

  window.scrollTo(0, 0);

  toggleSearchDisplay("off");
  toggleMobileMenuDisplay("off");
  searchIcon.style.visibility = "";

  const currentlySelectedMenuButtons = document.querySelectorAll(
    ".selected.menu-button"
  );

  currentlySelectedMenuButtons.forEach(button => {
    button.classList.remove("selected");
  });

  const newSelectedMenuButtons = [];

  const menuButtons = document.querySelectorAll(".menu-button");

  menuButtons.forEach(button => {
    if (button.firstElementChild.innerText.toLowerCase() === parentButton) {
      newSelectedMenuButtons.push(button);
    }
  });

  newSelectedMenuButtons.forEach(button => {
    button.classList.add("selected");
  });
}
