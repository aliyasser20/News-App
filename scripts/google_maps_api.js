// ? Load packages and set api key //
google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyBKE0Ll1qhSU9lXciUhxbROrq7FXrIUFqw"
});

//! Draw regions map function -------------------------------------------------------------------------------------------------- //
function drawRegionsMap() {
  // ? Set countries available/clickable on map //
  const data = google.visualization.arrayToDataTable([
    ["United Arab Emirates"],
    ["Argentina"],
    ["Austria"],
    ["Australia"],
    ["Belgium"],
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

  // ? Create new chart are by selecting an element on the page //
  const container = document.querySelector("#regions_div");
  const chart = new google.visualization.GeoChart(container);

  // ? Draw map //
  chart.draw(data, options);

  // ? Select region handler //
  function SelectHandler() {
    const selection = chart.getSelection();
    if (selection.length > 0) {
      console.log(data.getValue(selection[0].row, 0));
    }
  }

  // ? Add event listener for region click //
  google.visualization.events.addListener(chart, "select", SelectHandler);
}
// ! --------------------------------------------------------------------------------------------------------------------------- //

//! Draw map callable function ------------------------------------------------------------------------------------------------- //
export function drawMap() {
  google.charts.setOnLoadCallback(drawRegionsMap);
}
// ! --------------------------------------------------------------------------------------------------------------------------- //

const countriesArray = [
  ["United Arab Emirates", "ae"],
  ["Argentina", "ar"],
  ["Austria", "at"],
  ["Australia", "au"],
  ["Belgium", "be"],
  ["Bulgaria", "bg"],
  ["Brazil", "br"],
  ["Canada", "ca"],
  ["Switzerland", "ch"],
  ["China", "cn"],
  ["Colombia", "co"],
  ["Cuba", "cu"],
  ["Czech Republic", "cz"],
  ["Germany", "de"],
  ["Egypt", "eg"],
  ["France", "fr"],
  ["United Kingdom", "gb"],
  ["Greece", "gr"],
  ["Hong Kong", "hk"],
  ["Hungary", "hu"],
  ["Indonesia", "id"],
  ["Ireland", "ie"],
  ["India", "in"],
  ["Italy", "it"],
  ["Japan", "jp"],
  ["South Korea", "kr"],
  ["Lithuania", "lt"],
  ["Latvia", "lv"],
  ["Morocco", "ma"],
  ["Mexico", "mx"],
  ["Malaysia", "my"],
  ["Nigeria", "ng"],
  ["Netherlands", "nl"],
  ["Norway", "no"],
  ["New Zealand", "nz"],
  ["Philippines", "ph"],
  ["Poland", "pl"],
  ["Portugal", "pt"],
  ["Romania", "ro"],
  ["Serbia", "rs"],
  ["Russia", "ru"],
  ["Saudi Arabia", "sa"],
  ["Sweden", "se"],
  ["Singapore", "sg"],
  ["Slovenia", "si"],
  ["Slovakia", "sk"],
  ["Thailand", "th"],
  ["Turkey", "tr"],
  ["Taiwan", "tw"],
  ["Ukraine", "ua"],
  ["United States", "us"],
  ["Venezuela", "ve"],
  ["South Africa", "za"]
];
