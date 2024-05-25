//시계 파트
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

//투두리스트 파트
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
let todoCount = 0; // 할 일 리스트 개수를 추적할 변수
const countDisplay = document.querySelector(".count");
const TODOS_KEY = "todos";

let todos = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
// 리스트 개수를 업데이트하고 화면에 표시하는 함수
function updateTodoCount() {
  countDisplay.innerText = todos.length;
}

window.addEventListener("DOMContentLoaded", () => {
  updateTodoCount();
});

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
  updateTodoCount(); // 리스트 개수 업데이트
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
  updateTodoCount(); // 리스트 개수 업데이트
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const label = document.createElement("label");
  // label.htmlFor = "checkbox";
  const checkbox = document.createElement("input");
  checkbox.type = "file";
  checkbox.id = "checkbox";
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "X";
  button.classList.add("delete-btn");

  button.addEventListener("click", deleteTodo);
  checkbox.addEventListener("change", () => {
    const fileInput = document.getElementById("checkbox");
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

const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}

// 타임 테이블 파트
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
