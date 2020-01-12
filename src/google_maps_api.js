// ? Load packages and set api key //
google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyBKE0Ll1qhSU9lXciUhxbROrq7FXrIUFqw"
});

//! Draw regions map function -------------------------------------------------------------------------------------------------- //
function drawRegionsMap() {
  // ? Set countries available/clickable on map //
  const data = google.visualization.arrayToDataTable([
    ["Country"],
    ["Canada"],
    ["US"]
  ]);

  // ? Set drawing options //
  const options = {
    backgroundColor: "white",
    // datalessRegionColor: "#F2F2F2",
    datalessRegionColor: "#555555",
    displayMode: "region",
    tooltip: {
      textStyle: { color: "#222222" },
      showColorCode: true
    },
    defaultColor: "#555555"
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
