// Data source--> https://data.giss.nasa.gov/gistemp/
chartIt();
const temps = [];
const years = [];
const Nhems = [];
const Shems = [];
async function chartIt() {
  await getData();
  var ctx = document.getElementById("chart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "Global Temperature in °C",
          data: temps,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          responsive: true,
          responsiveAnimationDuration: 1.2,
          maintainAspectRatio: true,
          pointradius: 0,
          duration: 1000,
          fill: false,
          borderWidth: 1,
        },
        {
          label: "Northern Hemisphere Temperature in °C",
          data: Nhems,
          borderColor: "rgba(99, 132, 255, 1)",
          backgroundColor: "rgba(99, 132, 255, 0.5)",
          responsive: true,
          responsiveAnimationDuration: 1.1,
          maintainAspectRatio: true,
          duration: 1000,
          pointradius: 0,
          fill: false,
          borderWidth: 1,
        },
        {
          label: "Southern Hemisphere Temperature in °C",
          data: Shems,
          borderColor: "rgba(99, 255, 132, 1)",
          backgroundColor: "rgba(99, 255, 132, 0.5)",
          responsive: true,
          responsiveAnimationDuration: 1.1,
          maintainAspectRatio: true,
          pointradius: 0,
          duration: 1000,
          fill: false,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
Chart.defaults.global.defaultFontColor = "blue";
let chart = new Chart(ctx, {
  type: "line",
  data: data,
  options: {
    legend: {
      labels: {
        // This more specific font property overrides the global property
        fontColor: "blue",
      },
    },
  },
});

async function getData() {
  const response = await fetch("ZonAnn.Ts+dSST.csv");
  const data = await response.text();
  const table = data.split("\n").slice(1);
  table.forEach((row) => {
    const column = row.split(",");

    const year = column[0];
    years.push(year);
    //   const temp = column[1];
    //   const Nhem = column[2];
    //   const Shem = column[3];
    temps.push(parseFloat(column[1]));
    Nhems.push(parseFloat(column[2]));
    Shems.push(parseFloat(column[3]));
    // console.log(years, temps, Nhems, Shems);
  });
}
