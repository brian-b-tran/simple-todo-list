console.log("script is running..");
import "../css/app.css";
import { createElement, appendInOrder } from "./helpers/helpers.js";
import createList from "./list.js";
let boardWrapper = document.getElementById("board-wrapper");
let addBoardBtn = boardWrapper.lastChild.previousSibling;
let boardIndex = 0;
let boardArray = [];
addBoardBtn.addEventListener("click", () => {
  boardArray.push(board(boardIndex, "Board 1"));
  boardArray[boardIndex].createBoard();
  boardIndex++;
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
      boardArray[boardId].addList(`board-${boardId}`, "list name");
    });
    addListBtn.setAttribute("class", "lists add-list-btn");
    addListBtn.textContent = "+ add a new list";
    newBoard.appendChild(addListBtn);
    const newBoardTitle = document.createElement("div");
    newBoardTitle.setAttribute("class", "board-name");
    newBoardTitle.textContent = `${boardName}`;
    boardWrapper.insertBefore(newBoardTitle, addBoardBtn);
    boardWrapper.insertBefore(newBoard, addBoardBtn);
    console.log("creating new board");
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
