// ? Imports //
import { countriesArray } from "../utilities/country_code";
import { homePageReload } from "../core/page_reload";
// ? End of Imports //

// ? Load packages and set api key //
google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyBKE0Ll1qhSU9lXciUhxbROrq7FXrIUFqw"
});

// //! Draw regions map function -------------------------------------------------------------------------------------------------- //
function drawRegionsMap() {
  // ? Set countries available/clickable on map //
  const data = google.visualization.arrayToDataTable([
    ["United Arab Emirates"],
    ["Argentina"],
    ["Austria"],
    ["Australia"],
    ["Bulgaria"],
    ["Brazil"],
    ["Canada"],
    ["Switzerland"],
    ["China"],
    ["Colombia"],
    ["Cuba"],
    ["Czech Republic"],
    ["Germany"],
    ["Egypt"],
    ["France"],
    ["United Kingdom"],
    ["Greece"],
    ["Hong Kong"],
    ["Hungary"],
    ["Indonesia"],
    ["Ireland"],
    ["India"],
    ["Italy"],
    ["Japan"],
    ["South Korea"],
    ["Lithuania"],
    ["Latvia"],
    ["Morocco"],
    ["Mexico"],
    ["Malaysia"],
    ["Nigeria"],
    ["Netherlands"],
    ["Norway"],
    ["New Zealand"],
    ["Philippines"],
    ["Poland"],
    ["Portugal"],
    ["Romania"],
    ["Serbia"],
    ["Russia"],
    ["Saudi Arabia"],
    ["Sweden"],
    ["Singapore"],
    ["Slovenia"],
    ["Slovakia"],
    ["Thailand"],
    ["Turkey"],
    ["Taiwan"],
    ["Ukraine"],
    ["United States"],
    ["Venezuela"],
    ["South Africa"]
  ]);

  // ? Set drawing options //
  const options = {
    backgroundColor: "white",
    datalessRegionColor: "#bbbbbb",
    displayMode: "region",
    tooltip: {
      textStyle: { color: "#222222" },
      showColorCode: true
    },
    defaultColor: "#353535",
    height: 600,
    width: 1000,
    keepAspectRatio: false
  };

  const container = document.querySelector("#regions_div");

  // ? Create new chart are by selecting an element on the page //
  const chart = new google.visualization.GeoChart(container);

  // ? Draw map //
  chart.draw(data, options);

  // ? Select region handler //
  function SelectHandler() {
    const selection = chart.getSelection();

    let countrySelectedCode;

    if (selection.length > 0) {
      countriesArray.forEach(country => {
        if (country[0] === data.getValue(selection[0].row, 0)) {
          countrySelectedCode = country[1];
        }
      });
    }

    sessionStorage.setItem(
      "current-country",
      JSON.stringify(countrySelectedCode)
    );

    const currentSourceId =
      JSON.parse(sessionStorage.getItem("currentSourceId")) || "bbc-news";

    homePageReload("home", {
      topSource: currentSourceId,
      country: countrySelectedCode,
      localType: "news"
    });
  }

  // ? Add event listener for region click //
  google.visualization.events.addListener(chart, "select", SelectHandler);
}
// ! --------------------------------------------------------------------------------------------------------------------------- //

//! Draw map callable function ------------------------------------------------------------------------------------------------- //
export async function drawMap() {
  await google.charts.setOnLoadCallback(drawRegionsMap);
}
// ! --------------------------------------------------------------------------------------------------------------------------- //
