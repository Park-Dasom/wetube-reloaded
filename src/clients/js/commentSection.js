import { async } from "regenerator-runtime";

const form = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");
const videoId = videoContainer.dataset.id;
const btn = document.getElementById("commentDelBtn");

const handleDelBtn = async (event) => {
  const videoComment = document.querySelector(".video__comment");
  const commentId = videoComment.dataset.id;
  const li = event.target.parentElement;
  li.remove();
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  if (response.status === 201) {
    window.location.reload();
  }
};

const addComment = (text, newCommentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = newCommentId;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `  ${text}   `;
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(delBtn);
  videoComments.prepend(newComment);
  delBtn.addEventListener("click", handleDelBtn);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    console.log(text, newCommentId);
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (btn) {
  btn.addEventListener("click", handleDelBtn);
}
