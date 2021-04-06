// Data source--> https://data.giss.nasa.gov/gistemp/
//created mew arrays to get data into it
const xlabels = [];
const ylabels = [];
//called the function chartIt
charIt();
//we call function ChartIt wait till getData function proceeds once it proceeds then
//continue with chartIt function
async function charIt() {
  await getData();
  //chart js library used
  var ctx = document.getElementById("chart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xlabels,
      datasets: [
        {
          label: "Temperature in °C",
          data: ylabels,
          fill: false,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          responsive: true,
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return value + "°";
              },
            },
          },
        ],
      },
    },
  });
  //chart js libarary used upto here
}
//wrote a function to get data
async function getData() {
  const response = await fetch("ZonAnn.Ts+dSST.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const columns = row.split(",");
    const year = columns[0];
    xlabels.push(year); //pushing the values in data to labels displayed on x axis
    const temp = columns[1];
    ylabels.push(parseFloat(temp) + 14); //pushing the values in data to labels displayed on y axis
    console.log(year, temp);
  });
}
