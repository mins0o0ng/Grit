const submitForm = document.getElementById("submit-form");
const submitTitle = document.getElementById("submit-title");
const submitInput = document.getElementById("submit-input");
const submitList = document.getElementById("submit-list");
const footer = document.querySelector("footer");

let posts = [];

submitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = submitTitle.value;
  const input = submitInput.value;
  submitTitle.value = "";
  submitInput.value = "";
  const submitObj = {
    title: title,
    post: input,
    id: Date.now(),
  };
  posts.push(submitObj);
  uploadPost(submitObj);
  savePost();
}); //제목, 내용을 제출하면 발생되는 파트

function uploadPost(submitObj) {
  const box = document.createElement("div");
  box.id = submitObj.id;
  box.innerText = `< ${dropDownBtn.innerText} >`;
  box.classList.add("postbox");
  const headerSpan = document.createElement("span");
  headerSpan.innerText = submitObj.title;
  headerSpan.id = "headerspan";
  const postSpan = document.createElement("span");
  postSpan.innerText = submitObj.post;
  postSpan.id = "postspan";
  postSpan.classList.add("hidden");

  dropDownBtn.innerText = "카테고리";

  box.addEventListener("click", showPost);
  box.appendChild(headerSpan);
  box.appendChild(postSpan);
  submitList.appendChild(box);
}

function savePost() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function showPost(event) {
  const postBox = event.target;
  const upHeader = document.getElementById("headerspan");
  const upPost = document.getElementById("postspan");

  const editBox = document.createElement("div");
  editBox.classList.add("editbox");
  const editTitle = document.createElement("input");
  editTitle.classList.add("edit-title");
  editBox.appendChild(editTitle);
  editTitle.value = upHeader.innerText;
  const editPost = document.createElement("textarea");
  editPost.classList.add("edit-post");
  editBox.appendChild(editPost);
  editPost.value = upPost.innerText;
  const editBtn = document.createElement("button");
  editBtn.innerText = "수정";
  editBtn.classList.add("editbtn");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "삭제";
  deleteBtn.classList.add("deletebtn");

  editBox.appendChild(editBtn);
  editBox.appendChild(deleteBtn);
  footer.appendChild(editBox);

  editBtn.addEventListener("click", () => {
    const editHeader = document.createElement("span");
    upHeader.innerText = editTitle.value;
    const editSpan = document.createElement("span");
    upPost.innerText = editPost.value;
    editSpan.classList.add("hidden");

    editBox.remove();
  });

  deleteBtn.addEventListener("click", (event) => {
    const removeBox = document.querySelector(".postbox");
    removeBox.remove();
    editBox.remove();
  });
}

//드롭다운 파트
const dropDownBtn = document.querySelector(".dropbtn");

document.addEventListener("DOMContentLoaded", (event) => {
  const dropbtn = document.querySelector(".dropbtn");
  const dropdownContent = document.getElementById("dropdownContent");

  dropbtn.addEventListener("click", (event) => {
    event.preventDefault();
    dropdownContent.classList.toggle("show");
  });

  window.addEventListener("click", (event) => {
    if (!event.target.matches(".dropbtn")) {
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    }
  });
});

function selectItem(event) {
  event.preventDefault();
  dropDownBtn.innerText = event.target.innerText;
  document.getElementById("dropdownContent").classList.remove("show");
}
