const colours = document.querySelectorAll("a");
let compStyle;
let details = navigator.userAgent;
let regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details);
let canColor = false;
let isActiveAvailable = false;

function vibrate(duration = 220) {
  if (navigator.vibrate) {
    navigator.vibrate(duration);
  }
}

window.addEventListener("orientationchange", () => {
  window.location.reload();
});
window.onload = function () {
  document.querySelector("html").style.height =
    document.documentElement.clientHeight + "px";
};
window.onresize = function () {
  window.location.reload();
};

//Colouring part

colours.forEach((colourElem) => {
  colourElem.addEventListener("click", (ColEvent) => {
    canColor = true;
    vibrate();
    compStyle = window.getComputedStyle(colourElem).backgroundColor;
    colours.forEach((colourElem2) => {
      colourElem2.classList.remove("active");
      isActiveAvailable = false;
    }),
      ColEvent.target.classList.add("active");
    isActiveAvailable = true;
    document.querySelectorAll("path").forEach((pathElem2) => {
      pathElem2.addEventListener("click", () => {
        if (canColor == true) {
          vibrate(100);
          if (pathElem2.classList[0]) {
            pathElem2.style.fill = compStyle;
          }
        }
      });
    });
  });
});

function erase() {
  if (isActiveAvailable) {
    canColor = false;
    vibrate();
    const tempColours = document.querySelector(".active");
    tempColours.classList.remove("active");
    isActiveAvailable = false;
    document.querySelectorAll("path").forEach((pathElem) => {
      pathElem.addEventListener("click", () => {
        if (!canColor) {
          vibrate(100);
          compStyle = "";
          if (pathElem.classList[0]) {
            pathElem.style.fill = "#fff";
          }
        }
      });
    });
  }
}

function clearAll() {
  vibrate();
  document.querySelectorAll("path").forEach((pathElem) => {
    if (pathElem.classList[0]) {
      pathElem.style.fill = "#fff";
    }
  });
}

const anchor = document.createElement("a");

function download() {
  vibrate();
  const svg = document.querySelector("svg");

  const data = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([data], {
    type: "image/svg+xml; charset=utf-8",
  });

  const url = URL.createObjectURL(svgBlob);
  const img = new Image();

  img.src = url;

  img.addEventListener("load", () => {
    const bbox = svg.getBBox();

    const canvas = document.createElement("canvas");
    canvas.width = bbox.width;
    canvas.height = bbox.height;

    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, bbox.width, bbox.height);

    URL.revokeObjectURL(url);
    anchor.download = "image.png";
    document.body.appendChild(anchor);
    anchor.href = canvas.toDataURL();
    anchor.click();
    anchor.remove();
  });
}

function share() {
  vibrate();
  let svg = document.querySelector("svg");
  let serialized = new XMLSerializer().serializeToString(svg);
  let blobObj = new Blob([serialized], {
    type: "image/svg+xml; charset=utf-8",
  });
  let objURL = URL.createObjectURL(blobObj);
  let ImgObj = new Image();
  ImgObj.src = objURL;
  ImgObj.addEventListener("load", () => {
    let blobObj = svg.getBBox();
    let canvas = document.createElement("canvas");
    canvas.width = blobObj.width;
    canvas.height = blobObj.height;
    let context2d = canvas.getContext("2d");
    context2d.drawImage(ImgObj, 0, 0, blobObj.width, blobObj.height);
    const img = document.createElement("img");
    let div = document.createElement("div");
    document.body.appendChild(div);
    div.id = "splash";
    let span = document.createElement("span");
    let para = document.createElement("p");
    para.textContent = "Long press on image to share";
    div.appendChild(span);
    div.appendChild(para);
    div.appendChild(img);
    para.id = "info";
    span.textContent = "X";
    span.id = "cross";

    if (!isMobileDevice) {
      para.style.display = "none";
    }
    span.addEventListener("click", () => {
      vibrate();
      div.remove();
    });
    URL.revokeObjectURL(objURL);
    img.src = canvas.toDataURL();
  });
}
