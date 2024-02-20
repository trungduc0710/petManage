"use strict";
//Lấy ra Dom element:
const submitBtn = document.getElementById("submit-btn");
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
const healthyBtn = document.getElementById("healthy-btn");
const calculateBmiBtn = document.getElementById("calculate-bmi-btn");

//Hiển thị dữ liệu mẫu lên web:
renderTableData(petArr);

// Hiển thị loại giống theo loài Dog/Cat
typeInput.addEventListener("change", renderBreed);

// Hàm hiển thị các loại giống theo loài Dog/Cat
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
submitBtn.addEventListener("click", function (e) {
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
    date: new Date(),
    bmi: "?",
  };
  //Kiểm tra các điều kiện đầu vào của dữ liệu:
  const validate = validateData(data);
  //Nếu dữ liệu đầu vào thỏa mãn thì dữ liệu sẽ được
  //thêm vào petArr, sau đó hiển thị và xóa dữ liệu ở các ô nhập liệu:
  if (validate) {
    petArr.push(data);
    saveToStorage("petArr", petArr);
    clearInput();
    renderTableData(petArr);
  }
});

//Hàm kiểm tra điều kiện thỏa mãn của dữ liệu ở form nhập liệu:
function validateData(data) {
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

  //Hàm kiểm tra trùng lặp của Pet ID:
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      isValidate = false;
      break;
    }
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
    </td>
    <td><button type="button" class="btn btn-danger" 
    onclick="deletePet('${pet.id}')">Delete</button></td>`;
    tableBodyEl.appendChild(row);
  });
}

// Hàm hiển thị ngày tháng
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}
//Hàm xóa các dữ liệu ở form nhập liệu:
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//Hàm xóa dữ liệu pet trên giao diện:
function deletePet(petID) {
  const isDeleted = confirm("Are you sure?");
  if (isDeleted) {
    for (let i = 0; i < petArr.length; i++) {
      if (petID === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
      }
    }
  }
}

let healthyCheck = true;
//Hàm xử lý khi click vào nút show Healthy Pet:
healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }

    renderTableData(healthyPetArr);

    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyCheck = true;
  }
});
