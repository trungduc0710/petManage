"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const findBtn = document.getElementById("find-btn");
const formEl = document.getElementById("container-form");

// Hiển thị toàn bộ dữ liệu Pet
renderTableData(petArr);

// Hiển thị tất cả các loài Dog và Cat trong Breed Input
renderBreedAll();
// Bắt sự kiện clcik vào nút Find
findBtn.addEventListener("click", function () {
  let petArrFind = petArr;
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }

  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }

  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }

  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }

  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }

  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }

  renderTableData(petArrFind);
});

//Hàm hiển thị dữ liệu pet ra giao diện:
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${pet.id}</th>
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight} kg</td>
      <td>${pet.length} cm</td>
      <td>${pet.breed}</td>
      <td>
          <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
      </td>
      <td><i class="bi ${
        pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td>
        ${displayTime(pet.date).slice(8, 10)}
        /${displayTime(pet.date).slice(5, 7)}
        /${displayTime(pet.date).slice(0, 4)}
      </td>`;
    tableBodyEl.appendChild(row);
  });
}

// Hàm hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

// Hàm hiển thị các loại của cả loài Dog và Cat
function renderBreedAll() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
