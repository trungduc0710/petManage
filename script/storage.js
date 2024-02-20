"use strict";

// Thêm animation khi click vào Sidebar
const navEl = document.getElementById("sidebar");

navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

// Dữ liệu Pet mẫu để test chức năng
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "#a02727",
  breed: "Mèo Xiêm",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "#f4ed15",
  breed: "Chó Pug",
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(),
};

// Dữ liệu breed mẫu để test chức năng
const breed1 = {
  breed: "Chó Pug",
  type: "Dog",
};

const breed2 = {
  breed: "Mèo Xiêm",
  type: "Cat",
};
const breed3 = {
  breed: "Chó Husky",
  type: "Dog",
};
const breed4 = {
  breed: "Mèo Mướp",
  type: "Cat",
};

// Tạo mảng petArr
const petArr = getFromStorage("petArr");
// Tạo mảng breedAr
const breedArr = getFromStorage("breedArr");

// Lấy dữ liệu petArr
if (!getFromStorage("petArr")) {
  saveToStorage("petArr", [data1, data2]);
}

// Lấy dữ liệu breedArr
if (!getFromStorage("breedArr")) {
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
}

// Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
