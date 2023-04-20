function getIt(defaultInput) {
  $("#cards").empty();
  $("#carouselExampleDark").empty();
  $("#results").empty();
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
    const address = ele.addresses[0];
    const num = ele.contacts.phoneNumbers[0].phoneNumber.replace(/\D/g, "");
    const phoneNumber =
      num.slice(0, 3) + "-" + num.slice(3, 6) + "-" + num.slice(6, 10);
    const emailAddress = ele.contacts.emailAddresses[0].emailAddress;
    const parkCode = ele.parkCode;

    const html = `
    <div class="card" id="${parkCode}" style="width: 80%;">
      <img src="${image}" class="card-img-top" alt="...">
      <div class="card-body">
        <a class="card-title" href="${url}" style="font-size:40px" target="_blank"">${name}</a>
        <p class="card-text">${description}</p>
       </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${address.line1}, ${address.city}, ${address.stateCode} ${address.postalCode}</li>
        <li class="list-group-item">Contact Number: ${phoneNumber} | Email: ${emailAddress}</li>
      </ul>
      <div class="card-body">
        <a href="https://en.wikipedia.org/wiki/${name}" class="card-link" target="_blank">Wikipedia</a>
        <a href="${directions}" class="card-link" target="_blank">Directions</a>
      </div>
    </div>
    `;
    $("#results").append($(`${html}`));

    // add videos
    if (parkCode === "yose") {
      let iframeYose = document.createElement("iframe");
      iframeYose.id = "yoseVideo";
      iframeYose.src = "https://www.youtube.com/embed/s9M30w085SY";
      iframeYose.width = "100%";
      iframeYose.height = "600";
      $("#yose").append($(iframeYose));
    }
    if (parkCode === "yell") {
      let iframeYell = document.createElement("iframe");
      iframeYell.id = "yellVideo";
      iframeYell.src = "https://www.youtube.com/embed/3RDYVVmVR2U";
      iframeYell.width = "100%";
      iframeYell.height = "600";
      $("#yell").append($(iframeYell));
    }
    if (parkCode === "arch") {
      let iframeArch = document.createElement("iframe");
      iframeArch.id = "archVideo";
      iframeArch.src = "https://www.youtube.com/embed/B4UKkCwbAmw";
      iframeArch.width = "100%";
      iframeArch.height = "600";
      $("#arch").append($(iframeArch));
    }
    if (parkCode === "zion") {
      let iframeZion = document.createElement("iframe");
      iframeZion.id = "zionVideo";
      iframeZion.src = "https://www.youtube.com/embed/ecc7t3PkkiM";
      iframeZion.width = "100%";
      iframeZion.height = "600";
      $("#zion").append($(iframeZion));
    }
    if (parkCode === "jotr") {
      let iframeJotr = document.createElement("iframe");
      iframeJotr.id = "jotrVideo";
      iframeJotr.src = "https://www.youtube.com/embed/MQrSgsy6yHQ";
      iframeJotr.width = "100%";
      iframeJotr.height = "600";
      $("#jotr").append($(iframeJotr));
    }
    if (parkCode === "grte") {
      let iframeGrte = document.createElement("iframe");
      iframeGrte.id = "grteVideo";
      iframeGrte.src = "https://www.youtube.com/embed/oRxLvMHLI3I";
      iframeGrte.width = "100%";
      iframeGrte.height = "600";
      $("#grte").append($(iframeGrte));
    }
  }
}
