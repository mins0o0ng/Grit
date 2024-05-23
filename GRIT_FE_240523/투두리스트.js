const clock = document.querySelector(".clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000);

const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  paintTodo(newTodo);
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  const label = document.createElement("label");
  // label.htmlFor = "checkbox";
  const checkbox = document.createElement("input");
  checkbox.type = "file";
  checkbox.id = "checkbox";
  const span = document.createElement("span");
  span.innerText = newTodo;
  const button = document.createElement("button");
  button.innerText = "X";
  button.classList.add("delete-btn");

  button.addEventListener("click", deleteTodo);
  checkbox.addEventListener("change", () => {
    if (checkbox.files.length > 0) {
      span.style.textDecoration = "line-through";
      label.style.backgroundColor = "yellowgreen";
    } else {
      span.style.textDecoration = "none";
      label.style.backgroundColor = "white";
    }
  });

  li.appendChild(label);
  li.appendChild(span);
  li.appendChild(button);
  li.appendChild(checkbox);

  todoList.appendChild(li);
}

todoForm.addEventListener("submit", handleTodoSubmit);

const td = document.querySelectorAll("td");
let currentValue = 0;
const focus = document.querySelector(".focus-time");

td.forEach((element) => {
  function handleStudy() {
    if (element.style.backgroundColor !== "yellowgreen") {
      element.style.backgroundColor = "yellowgreen";
      currentValue += 10;
      String(Math.floor(currentValue % 60)).padStart(2, "0");
      focus.innerText = `${Math.floor(currentValue / 60)}H ${String(
        Math.floor(currentValue % 60)
      ).padStart(2, "0")}M`;
    } else {
      element.style.backgroundColor = "white";
      currentValue -= 10;
      focus.innerText = `${Math.floor(currentValue / 60)}H ${String(
        Math.floor(currentValue % 60)
      ).padStart(2, "0")}M`;
    }
  }
  element.addEventListener("click", handleStudy);
});
