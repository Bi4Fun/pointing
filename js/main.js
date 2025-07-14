let images = [];
const pointerImage = document.getElementById("pointer-image");
const coordsDisplay = document.getElementById("mouse-coordinates");
const overlay = document.getElementById("overlay");
let showImageTimeoutId;
let hideOverlayTimeoutId;
let isShowingImage = false;

// Tải file JSON
fetch("data/hehe.json")
  .then((response) => response.json())
  .then((data) => {
    images = data;
  })
  .catch((error) => console.error("Error loading JSON:", error));

// Tạo container cho lưới trong suốt (bao giờ xong thì comment đi)
const transparentGridContainer = document.createElement("div");
transparentGridContainer.id = "transparent-grid-container";
document.body.appendChild(transparentGridContainer);

const numCols = 60;
const numRows = 29;
let cellIndexCounter = 1;

for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    const cell = document.createElement("div");
    cell.classList.add("transparent-grid-cell");
    cell.textContent = cellIndexCounter++;
    transparentGridContainer.appendChild(cell);
  }
}

// Xác định ô dựa trên tọa độ chuột
function getGridCell(mouseX, mouseY) {
  const cellWidth = 32;
  const cellHeight = 954 / 29;
  const col = Math.floor(mouseX / cellWidth);
  const row = Math.floor(mouseY / cellHeight);
  const cellIndex = row * 60 + col + 1;
  return images.find((image) => image.cellIndex === cellIndex);
}

// Hiển thị hình ảnh sau 1 giây
function showImageDelayed(mouseX, mouseY) {
  clearTimeout(showImageTimeoutId);
  showImageTimeoutId = setTimeout(() => {
    const image = getGridCell(mouseX, mouseY);
    if (image) {
      pointerImage.style.opacity = 0;
      pointerImage.src = image.src;
      pointerImage.style.display = "block";
      overlay.style.display = "none";
      isShowingImage = true;
      setTimeout(function () {
        pointerImage.style.opacity = 1;
      }, 50);
    } else {
      pointerImage.style.display = "none";
      overlay.style.display = "flex";
      isShowingImage = false;
    }
  }, 1500);
}

// Ẩn hình ảnh và hiển thị overlay sau một khoảng thời gian ngắn (để tạo hiệu ứng chuyển đổi)
function hideImageAndShowOverlay() {
  clearTimeout(showImageTimeoutId); // Hủy timeout hiển thị ảnh nếu đang chờ
  pointerImage.style.display = "none";
  overlay.style.display = "flex";
  isShowingImage = false;
}

// Theo dõi chuyển động chuột
document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  coordsDisplay.textContent = `X: ${mouseX}, Y: ${mouseY}`;

  // Khi chuột di chuyển, ngay lập tức ẩn ảnh và hiển thị overlay
  hideImageAndShowOverlay();

  // Sau 1 giây, hiển thị ảnh mới dựa trên vị trí chuột
  showImageDelayed(mouseX, mouseY);
});

// Ẩn hình ảnh và hiển thị overlay khi chuột rời khỏi cửa sổ
document.addEventListener("mouseleave", () => {
  hideImageAndShowOverlay();
  coordsDisplay.textContent = `X: -, Y: -`;
});

// Hiển thị overlay ban đầu khi trang tải
hideImageAndShowOverlay();
