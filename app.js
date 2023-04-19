function getIt(defaultInput) {
  $("#cards").empty();
  $("#carouselExampleDark").empty();
  let input = $("#input").val();
  if (defaultInput !== undefined) {
    input = defaultInput;
  }
  $.get(
    `https://developer.nps.gov/api/v1/parks?parkCode=${input}&api_key=7La6D6fg0dVgtXjh8QgGUrOT0ncoCgBk75P9mFhh`,
    (data) => {
      if (data.data.length === 0) {
        $.get(
          `https://developer.nps.gov/api/v1/parks?q=${input}&api_key=7La6D6fg0dVgtXjh8QgGUrOT0ncoCgBk75P9mFhh`,
          (data) => {
            console.log(data.data);
            update(data.data);
            return;
          }
        );
      }
      console.log(data.data);
      update(data.data);
      return;
    }
  );
}
// event listener
$("#yosemite").on("click", function () {
  getIt("yose");
});
$("#yellowStone").on("click", function () {
  getIt("yell");
});
$("#arch").on("click", function () {
  getIt("arch");
});
$("#grandTeton").on("click", function () {
  getIt("grte");
});
$("#joshuaTree").on("click", function () {
  getIt("jotr");
});
$("#zion").on("click", function () {
  getIt("zion");
});
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
    const address = ele.addresses[0];
    let phoneNumber = ele.contacts.phoneNumbers[0].phoneNumber;
    phoneNumber = phoneNumber.split("/").join("-");
    const emailAddress = ele.contacts.emailAddresses[0].emailAddress;

    // <img class="npImg" src=${image}>

    const html = `
    <div class="card" style="width: 80%;">
    <img src="${image}" class="card-img-top" alt="...">
    <div class="card-body">
      <a class="card-title" href="${url}" style="font-size:40px"">${name}</a>
      <p class="card-text">${description}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${address.line1} ${address.city} ${address.stateCode} ${address.postalCode}</li>
      <li class="list-group-item">Contact number: ${phoneNumber}</li>
      <li class="list-group-item">email: ${emailAddress}</li>
    </ul>
    <div class="card-body">
      <a href="https://en.wikipedia.org/wiki/${name}" class="card-link">Wikipedia</a>
      <a href="${directions}" class="card-link">Directions</a>
    </div>
  </div>
    `;
    // const html = `<span class="nationalPark">
    //                 <h3 class="npName">
    //                   <a href=${url}>${name}</a>
    //                 </h3>
    //                 <h3 class="npDescription">${description}</h3>
    //                 <div class="directions">
    //                   <a href=${directions}>Get Directions</a>
    //                   <p>
    //                     ${directionsInfo}
    //                   </p>
    //                 </div>
    //               </span>`;
    $("body").append($(`${html}`));
  }
}
