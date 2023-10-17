console.log("script is running..");
import "../css/app.css";
import { createElement, appendInOrder } from "./helpers/helpers.js";
import createList from "./list.js";
let boardWrapper = document.getElementById("board-wrapper");
let addBoardBtn = boardWrapper.lastChild.previousSibling;
let boardIndex = 0;
let boardArray = [];

let isModalOpen = false;

function toggleModal() {
  if (isModalOpen) {
    document.getElementById("modal-wrapper").style.display = "none";
  } else {
    document.getElementById("modal-wrapper").style.display = "flex";
  }
  isModalOpen = !isModalOpen;
}
addBoardBtn.addEventListener("click", (e) => {
  toggleModal();
  document.getElementById("board-name-input").focus();
});
document.getElementById("modal-wrapper").addEventListener("click", (e) => {
  toggleModal();
});
document.getElementById("modalContent").addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
});

document.getElementById("boardForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  boardArray.push(board(boardIndex, data.get("Name")));
  boardArray[boardIndex].createBoard();
  boardIndex++;
  e.target.reset();
  toggleModal();
  return true;
});

const board = (id, name) => {
  let boardName = name;
  let lists = [];
  let listIndex = 0;
  let boardId = id;

  function addList(target, name) {
    lists.push(createList(listIndex, name));
    const parent = document.getElementById(target);
    const listTitle = createElement("div", { class: "list-title" });
    const contentMenu = createElement("div", { class: "content-menu" });
    const dot = createElement("div", { class: "dot" });
    appendInOrder(contentMenu, dot, dot.cloneNode(true), dot.cloneNode(true));
    appendInOrder(
      listTitle,
      document.createTextNode(lists[listIndex].getName()),
      contentMenu
    );

    const AddTaskBtn = createElement("div", {
      class: "list-item add-task-btn",
    });

    const addBtnContent = createElement("div", {
      class: "list-item-content",
      data: `${listIndex}`,
    });
    addBtnContent.addEventListener("click", (e) => {
      document;
      e.target.parentNode.parentNode.lastChild.appendChild(
        createListItem("Task")
      );
    });
    appendInOrder(
      addBtnContent,
      createElement("div", { class: "content-check-box" }).appendChild(
        document.createTextNode("+")
      ),
      createElement("div", { class: "content-text" }).appendChild(
        document.createTextNode(" add a task")
      )
    );
    AddTaskBtn.appendChild(addBtnContent);
    const listsContainer = createElement("div", {
      class: "lists",
      id: `lists-${boardIndex}-${listIndex}`,
    });
    appendInOrder(
      listsContainer,
      listTitle,
      AddTaskBtn,
      createElement("div", { class: "list", id: "list-0" })
    );

    parent.insertBefore(listsContainer, parent.lastChild);
    listIndex++;
  }

  function createBoard() {
    const newBoard = createElement("div", {
      class: "board",
      id: `board-${boardId}`,
    });
    const addListBtn = document.createElement("div");
    addListBtn.addEventListener("click", (e) => {
      e.stopPropagation;
      document.getElementById("newListForm").style.display = "block";
      document
        .getElementById("newListInput")
        .addEventListener("focusout", (e) => {
          e.target.value = "";
          document.getElementById("newListForm").style.display = "none";
        });
      document.getElementById("newListInput").focus();
    });
    addListBtn.setAttribute("class", "lists add-list-btn");
    addListBtn.textContent = "+ add a new list";

    const listForm = createElement("form", { id: "newListForm" });
    const textInput = createElement("input", {
      type: "text",
      name: "Name",
      placeholder: "List Name",
      id: "newListInput",
    });
    listForm.appendChild(textInput);
    addListBtn.appendChild(listForm);

    listForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      boardArray[boardId].addList(`board-${boardId}`, data.get("Name"));
      e.target.reset();
      document.getElementById("newListForm").style.display = "none";
    });

    newBoard.appendChild(addListBtn);
    const newBoardTitle = document.createElement("div");
    newBoardTitle.setAttribute("class", "board-name");
    newBoardTitle.textContent = `${boardName}`;
    const contentMenu = createElement("div", { class: "content-menu" });
    const dot = createElement("div", { class: "dot" });
    appendInOrder(contentMenu, dot, dot.cloneNode(true), dot.cloneNode(true));
    newBoardTitle.appendChild(contentMenu);
    boardWrapper.insertBefore(newBoardTitle, addBoardBtn);
    boardWrapper.insertBefore(newBoard, addBoardBtn);
  }

  return { createBoard, addList, lists, boardName };
};

function createListItem(text) {
  const listItemContainer = createElement("div", { class: "list-item" });
  const listItemContent = createElement("div", { class: "list-item-content" });
  const contentMenu = createElement("div", { class: "content-menu" });
  const dot = createElement("div", { class: "dot" });
  appendInOrder(contentMenu, dot, dot.cloneNode(true), dot.cloneNode(true));
  const contentText = createElement("div", { class: "content-text" });
  contentText.appendChild(document.createTextNode(text));
  const checkBox = createElement("div", { class: "content-check-box" });
  checkBox.appendChild(createElement("div", { class: "circle" })),
    appendInOrder(listItemContent, checkBox, contentText, contentMenu);
  listItemContainer.appendChild(listItemContent);
  return listItemContainer;
}
