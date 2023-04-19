const chart1 = document.getElementById("myChart1");
new Chart(chart1, {
  type: "bar",
  data: {
    labels: [
      "Great Smoky Mountains",
      "Grand Canyon",
      "Zion",
      "Rocky Mountain",
      "Acadia",
      "Yosemite",
      "Yellowstone",
      "Joshua Tree",
      "Cuyahoga Valley",
      "Glacoer",
    ],
    datasets: [
      {
        label: "US Top 10 Most Visited NP",
        data: [12.94, 4.73, 4.69, 4.3, 3.97, 3.67, 3.29, 3.06, 2.91, 2.9],
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Top 10 Most Visited National Parks in 2022",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: true,
        position: "left",
        ticks: {
          callback: function (value, index, values) {
            return `${value} m`;
          },
        },
      },
    },
  },
});
