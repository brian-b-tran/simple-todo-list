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
  boardArray.push(board(boardIndex, data.get("Name") || "New Board"));
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

    const addBtnContent = createElement("form", {
      class: "list-item-content",
      data: `${listIndex}`,
    });
    addBtnContent.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const listOfTasks = e.target.parentNode.parentNode.lastChild;
      listOfTasks.insertBefore(
        createListItem(data.get("task")),
        listOfTasks.firstChild
      );
      e.target.reset();
    });
    appendInOrder(
      addBtnContent,
      createElement("div", { class: "content-check-box" }).appendChild(
        document.createTextNode("+")
      ),
      createElement("input", {
        class: "content-text",
        placeholder: "add a task",
        type: "text",
        name: "task",
      })
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
      data: `${boardId}`,
    });
    const addListBtn = document.createElement("div");
    addListBtn.addEventListener("click", (e) => {
      e.stopPropagation;
      console.log(e.target.parentNode);
      let id = e.target.parentNode.getAttribute("data");
      console.log(id);
      console.log(boardId);
      document.getElementById(`newListForm${id}`).style.display = "block";
      document
        .getElementById(`newListInput${id}`)
        .addEventListener("focusout", (e) => {
          e.target.value = "";
          document.getElementById(`newListForm${id}`).style.display = "none";
        });
      document.getElementById(`newListInput${id}`).focus();
    });
    addListBtn.setAttribute("class", "lists add-list-btn");
    addListBtn.textContent = "+ add a new list";

    const listForm = createElement("form", {
      id: `newListForm${boardId}`,
      style: "display:none",
    });
    const textInput = createElement("input", {
      type: "text",
      name: "Name",
      placeholder: "List Name",
      id: `newListInput${boardId}`,
    });
    listForm.appendChild(textInput);
    addListBtn.appendChild(listForm);

    listForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      boardArray[boardId].addList(
        `board-${boardId}`,
        data.get("Name") || "New List"
      );
      e.target.reset();
      e.target.style.display = "none";
      return true;
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

function createListItem(inputText) {
  let text = inputText || "New Task";
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
