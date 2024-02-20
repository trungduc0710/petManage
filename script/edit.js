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
const submitBtn = document.getElementById("submit-btn");
const formEl = document.getElementById("container-form");

// Hiển thị dữ liệu pet vào bảng
renderTableData(petArr);

// Hàm hiển thị dữ liệu pet vào bảng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row">${pet.id}</th>
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
        </td>
        <td><button type="button" style="background-color:#ffc107; color:#000" class="btn btn-danger" 
        onclick="starEditPet('${pet.id}')">Edit</button></td>
        `;

    tableBodyEl.appendChild(row);
  });

  // Hàm hiển thị thời gian
  function displayTime(date) {
    if (typeof date === "string") {
      return date;
    } else if (typeof date === "object") {
      return JSON.parse(JSON.stringify(date));
    }
  }
}

//Hàm hiển thị form chỉnh sửa dữ liệu pet khi click vào nút Edit
function starEditPet(petId) {
  // Hiện form nhập dữ liệu
  formEl.classList.remove("hide");

  // Tìm dữ liệu của pet cần edit
  const pet = petArr.find((pet) => pet.id === petId);

  // Hiển thị dữ liệu của pet cần edit lên form nhập liệu
  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
  // Hiển thị đúng loại theo từng loài Dog/Cat
  renderBreed();
  // Hiển thị loại Pet ban đầu, trước chỉnh sửa
  breedInput.value = `${pet.breed}`;
  typeInput.addEventListener("change", renderBreed);
}

// Hàm hiển thị các loại theo từng loài Dog/Cat khi người dùng click chọn type
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  // Nếu type là Dog
  if (typeInput.value === "Dog") {
    // Mảng chứa các loại của loài Dog
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
    // Nếu type là Cat
  } else if (typeInput.value === "Cat") {
    // Mảng chứa các loại của loài Cat
    const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

//Hàm xử lý dữ liệu khi click vào nút Submit:
submitBtn.addEventListener("click", function () {
  //Data sẽ lấy các giá trị từ form nhập liệu:
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  //Kiểm tra các điều kiện đầu vào của dữ liệu:
  const isValidate = validate(data);

  if (isValidate) {
    // Tìm index của Pet theo pet.id
    const index = petArr.findIndex((pet) => pet.id === data.id);
    // Gán ngày tháng cũ vào data
    data.date = petArr[index].date;
    // Cập nhật dữ liệu mới cho pet theo index tìm được
    petArr[index] = data;
    // lưu dữ liệu xuống local
    saveToStorage("petArr", petArr);
    // Ẩn form nhập liệu
    formEl.classList.add("hide");
    // Hiển thị lại bảng pet sau khi edit
    renderTableData(petArr);
  }
});

// Hàm kiểm tra điều kiện đầu vào của dữ liệu
function validate(data) {
  let isValidate = true;

  if (data.id.trim() === "") {
    alert("Nhập Pet ID");
    isValidate = false;
  }

  if (data.name.trim() === "") {
    alert("Nhập Pet Name");
    isValidate = false;
  }

  if (isNaN(data.age)) {
    alert("Nhập Age");
    isValidate = false;
  }

  if (isNaN(data.weight)) {
    alert("Nhập Weight");
    isValidate = false;
  }

  if (isNaN(data.length)) {
    alert("Nhập Length");
    isValidate = false;
  }

  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }

  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }

  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }

  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }

  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }

  return isValidate;
}
