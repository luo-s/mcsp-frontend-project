// //
// $.get(
//   "https://developer.nps.gov/api/v1/parks?parkCode=yellow&api_key=7La6D6fg0dVgtXjh8QgGUrOT0ncoCgBk75P9mFhh",
//   (data) => {
//     console.log(data);
//   }
// );

function getIt() {
  $("#carouselExampleDark").empty();
  let input = $("#input").val();
  console.log(input);
  $.get(
    `https://developer.nps.gov/api/v1/parks?parkCode=${input}&api_key=7La6D6fg0dVgtXjh8QgGUrOT0ncoCgBk75P9mFhh`,
    (data) => {
      console.log(data.data);
      update(data.data);
      return;
    }
  );
}

// $("#yosemite").on("click", function () {
//   getIt();
// });

// $("#yellowStone").on("click", function () {
//   getIt();
// });

// $("#arch").on("click", function () {
//   getIt();
// });

// // $("body").keydown(function (event) {
// //   if ((event, key === "Enter" && $("input").val() !== "")) {
// //     getIt();
// //   }
// // });

$("#search").on("click", function () {
  getIt();
});

function update(data) {
  for (let ele of data) {
    const name = ele.fullName;
    const url = ele.url;
    const description = ele.description;
    const image = ele.images[0].url;
    const directions = ele.directionsUrl;
    const directionsInfo = ele.directionsInfo;

    //                    <img class="npImg" src=${image}>

    const html = `<span class="nationalPark">
                    <h3 class="npName">
                      <a href=${url}>${name}</a>
                    </h3>
                    <h3 class="npDescription">${description}</h3>
                    <div class="directions">
                      <a href=${directions}>Get Directions</a>
                      <p>
                        ${directionsInfo}
                      </p>
                    </div>
                  </span>`;
    $("#carouselExampleDark").append($(`${html}`));
  }
}
