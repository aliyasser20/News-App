// ? Imports //
import { ageUtility } from "./utility";

//! Create top news element function -------------------------------------------------------------------------------------------------- //
export async function createTopNewsElement(currentSource) {
  // ? Retrieve from local storage //
  const sourceOptionsArray = await JSON.parse(
    localStorage.getItem("sourceOptionsArray")
  );

  // ? transform source options array into button strings //
  let sourceOptionsString = "";
  sourceOptionsArray.forEach(sourceOption => {
    if (sourceOption.language === "en") {
      sourceOptionsString += `<button class="source-option">${sourceOption.name}</button>
      `;
    }
  });

  const identifier = `top--${currentSource}`;
  const topNewsArray = await JSON.parse(localStorage.getItem(identifier));

  const topNewsElement = document.createElement("div");
  topNewsElement.classList.add("top-news");

  topNewsElement.innerHTML += `
    <span class="section-header">
    <h2 class="title">Top News</h2>
    <div class="line"></div>
    <button class="sources">${currentSource}</button>
    <div class="modal-outer" hidden></div>
    <div class="shadow source-menu-hidden">
      <p class="request">Please select a source:</p>
      <div class="source-options">
        <button class="source-option">All</button>
        ${sourceOptionsString}
      </div>
    </div>
    </span>
  `;

  topNewsElement.innerHTML += `
    <div class="news">
      <div class="first shadow white">
        <button>
          <h3 class="article-title">${topNewsArray[0].title}</h3>
        </button>
        <p class="article-headline">${topNewsArray[0].description}</p>
        <p class="article-date">${topNewsArray[0].publishedAt}</p>
        <div class="image-container"
          style="background-image: url(${topNewsArray[0].urlToImage});">
        </div>
      </div>
      <div class="second">
        <div class="second-box shadow white">
          <button>
            <h3 class="article-title">${topNewsArray[1].title}</h3>
          </button>
          <p class="article-headline">${topNewsArray[1].description}</p>
          <p class="article-date">${topNewsArray[1].publishedAt}</p>
          <div class="image-container"
            style="background-image: url(${topNewsArray[1].urlToImage});">
          </div>
        </div>
        <div class="second-box shadow white">
          <button>
            <h3 class="article-title">${topNewsArray[2].title}</h3>
          </button>
          <p class="article-headline">${topNewsArray[2].description}</p>
          <p class="article-date">${topNewsArray[1].publishedAt}</p>
          <div class="image-container"
            style="background-image: url(${topNewsArray[2].urlToImage});">
          </div>
        </div>
      </div>


      <div class="slider">
        <button class="slider-left slider-unavailable"></button>
        <div class="slides">
          <div class="slide prev">
            <div class="third">
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
            </div>
          </div>
          <div class="slide current">
            <div class="third">
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
            </div>
          </div>
          <div class="slide next">
            <div class="third">
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
            </div>
          </div>
          <div class="slide">
            <div class="third">
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
              <div class="third-box shadow white">
                <button>
                  <h3 class="article-title">Anger in Vietnam over deadly 'land grab' clashes</h3>
                </button>
                <p class="article-date">10 hours ago</p>
                <div class="image-container"
                  style="background-image: url(https://ichef.bbci.co.uk/news/1024/branded_news/14FAB/production/_110513958_dongtam.jpg);">
                </div>
              </div>
            </div>
          </div>
        </div>
        <button class="slider-right slider-available shadow"></button>
      </div>
    </div>
  `;

  console.log(topNewsElement);
  return topNewsElement;
}
//! -------------------------------------------------------------------------------------------------------------------------------- //
