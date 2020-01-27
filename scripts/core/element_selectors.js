// ? Select search bar elements //
const header = document.querySelector("header");
const searchIcon = header.querySelector(".search-icon");
const searchBar = document.querySelector(".search-bar-area");
const mobileMenuIcon = header.querySelector(".mobile-menu-icon");
const mobileMenuArea = document.querySelector(".mobile-menu-area");
const logoButton = header.querySelector(".logo");
const menuButtons = document.querySelectorAll(".menu-button");
const searchBarClear = document.querySelector(".search-bar-clear");
const searchBarSearch = document.querySelector(".search-bar-search");
const searchBarInput = document.querySelector("input");
const workingArea = document.querySelector(".working-area");
const cssLoaderElement = workingArea.querySelector(".css-loader");
const footer = document.querySelector("footer");
const footerButtons = footer.querySelectorAll("button");

// ? Exports //
export {
  header,
  searchIcon,
  searchBar,
  mobileMenuArea,
  mobileMenuIcon,
  logoButton,
  menuButtons,
  searchBarClear,
  searchBarSearch,
  searchBarInput,
  workingArea,
  cssLoaderElement,
  footerButtons
};
