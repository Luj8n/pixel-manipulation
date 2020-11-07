let image;

function preload() {
  image = L.loadImage("./libraries/L.js/icon.png");
}

let pixelSize = 45;

function setup() {
  L.setCanvasSize(900, 900);
  L.centerCanvas();
  L.background("white");
  L.Image(image, 0, 0, L.width, L.height);

  let cols = L.width / pixelSize;
  let rows = L.height / pixelSize;

  let imageData = L.getImageData(0, 0, L.width, L.height);
  let pixels = imageData.data;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let squareX = j * pixelSize;
      let squareY = i * pixelSize;
      let redSum = 0;
      let greenSum = 0;
      let blueSum = 0;
      let alphaSum = 0;
      let pixelsInSquare = 0;
      for (let relativeY = 0; relativeY < pixelSize; relativeY++) {
        for (let relativeX = 0; relativeX < pixelSize; relativeX++) {
          let x = squareX + relativeX;
          let y = squareY + relativeY;
          let index = (x + y * L.width) * 4;

          let red = pixels[index];
          let green = pixels[index + 1];
          let blue = pixels[index + 2];
          let alpha = pixels[index + 3];

          redSum += red;
          greenSum += green;
          blueSum += blue;
          alphaSum += alpha;

          pixelsInSquare++;
        }
      }

      redSum = Math.round(redSum / pixelsInSquare);
      greenSum = Math.round(greenSum / pixelsInSquare);
      blueSum = Math.round(blueSum / pixelsInSquare);
      alphaSum = Math.round(alphaSum / pixelsInSquare);

      L.fill(`rgba(${redSum}, ${greenSum}, ${blueSum}, ${alphaSum / 255})`);
      L.Rectangle(squareX, squareY, pixelSize, pixelSize);
    }
  }
  // L.putImageData(imageData, 0, 0);
}
