"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// Hiển thị danh sách Breed
renderBreedTable(breedArr);

// Bắt sự kiện ấn nút submit
btnSubmit.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  const isValidate = validate(data);
  if (isValidate) {
    breedArr.push(data);
    saveToStorage("breedArr", breedArr);
    renderBreedTable(breedArr);
    delteteForm();
  }
});

function validate(data) {
  let isValidate = true;
  if (breedInput.value.trim().length === 0) {
    alert("Please input for breed!");
    isValidate = false;
  }

  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }

  return isValidate;
}

function delteteForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

function renderBreedTable() {
  tableBodyEl.innerHTML = "";
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td scope = "col">${index + 1}</td>
        <td scope = "col">${breedItem.breed}</td>
        <td scope = "col">${breedItem.type}</td>
        <td><button type="button" onclick = "deleteBreed('${
          breedItem.breed
        }')" class="btn btn-danger">Delete</button></td>
        `;
    tableBodyEl.appendChild(row);
  });
}

// Hàm xóa các breed
function deleteBreed(breed) {
  const isDelete = confirm("Are you sure?");

  if (isDelete) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        saveToStorage("breedArr", breedArr);
        renderBreedTable(breedArr);
        break;
      }
    }
  }
}
