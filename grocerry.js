const formEl = document.querySelector(".grocery-form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".grocery-list");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");
const alertDiv = document.querySelector(".alert");

let list = loadStoredData();

// Load stored data when the script loads
function loadStoredData() {
  const storedData = localStorage.getItem("list");
  return storedData ? JSON.parse(storedData) : [];
}

// Populate the list with stored data
list.forEach(task => {
  toDoList(task.name, task.checked);
});

submitBtn.addEventListener("click", () => {
  toDoList();
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

clearBtn.addEventListener("click", () => {
  ulEl.innerHTML = ""; // Clear the list
  list = [];
  updateLocalStorage();
  showAlert("All items cleared!", "success");
});

function toDoList(taskName, checked) {
  let newTask = taskName || inputEl.value.trim(); // Trim to remove whitespace
  let isChecked = checked || false;

  if (newTask === "") {
    showAlert("Please enter a task!", "error");
    return; // Exit the function early if input is empty
  }

  const liEl = document.createElement("li");
  liEl.innerText = newTask;
  if (isChecked) {
    liEl.classList.add("checked");
  }
  ulEl.append(liEl);
  inputEl.value = "";

  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
  liEl.append(checkBtnEl);

  const editBtnEl = document.createElement("div");
  editBtnEl.classList.add("edit-btn");
  editBtnEl.innerHTML = `<i class="fas fa-edit"></i>`;
  liEl.append(editBtnEl);

  const deleteBtnEl = document.createElement("div");
  deleteBtnEl.classList.add("delete-btn");
  deleteBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
  liEl.append(deleteBtnEl);

  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  editBtnEl.addEventListener("click", () => {
    const newText = prompt("Edit task:", liEl.innerText);
    if (newText !== null && newText !== "") {
      liEl.innerText = newText;
      updateLocalStorage();
    }
  });

  deleteBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });

  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}

function showAlert(message, type) {
  alertDiv.textContent = message;
  alertDiv.className = `alert ${type}`;
  setTimeout(() => {
    alertDiv.textContent = "";
    alertDiv.className = "alert";
  }, 2000);
}