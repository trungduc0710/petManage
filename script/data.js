"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

// Bắt sự kiện click vào nút Export
btnExport.addEventListener("click", function () {
  const isExport = confirm("Bạn xác nhận chắc chắn Export?");
  if (isExport) {
    saveStaticDataToFile();
  }
});

// Hàm lưu dữ liệu xuống file
function saveStaticDataToFile() {
  // Tạo dữ liệu để lưu xuống file
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  // Lưu file
  saveAs(blob, "petData.json");
}

// Bắt sự kiện click vào nút Import
btnImport.addEventListener("click", function () {
  // Kiểm tra xem người dùng đã chọn tập tin chưa
  if (!fileInput.value) {
    alert("Vui lòng chọn file muốn import!");
  } else {
    const isImport = confirm("Bạn có chắc chắn import?");
    if (isImport) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Sự kiện load dữ liệu từ file lên
      reader.addEventListener("load", function () {
        // Kiểm tra cáu trúc của file có hợp lệ

        // Lưu dữ liệu xuống localStorage
        saveToStorage("petArr", JSON.parse(reader.result));
        // Thông báo import thành công
        alert("Import thành công!");

        false;
      });

      // Đọc file
      if (file) {
        reader.readAsText(file);
      }

      // Reset file input
      fileInput.value = "";
    }
  }
});
