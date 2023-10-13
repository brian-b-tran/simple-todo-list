console.log("script is running..");
import "../css/app.css";
import { createElement, appendInOrder } from "./helpers/helpers.js";
import createList from "./list.js";
let boardWrapper = document.getElementById("board-wrapper");
let addBoardBtn = boardWrapper.lastChild.previousSibling;
addBoardBtn.addEventListener("click", () => {
  createBoard();
});

function createBoard() {
  const newBoard = document.createElement("div");
  newBoard.setAttribute("class", "board");

  const addListBtn = document.createElement("div");
  addListBtn.addEventListener("click", (e) => {
    e.stopPropagation;
    addList(e.target);
  });
  addListBtn.setAttribute("class", "lists add-list-btn");
  addListBtn.textContent = "+ add a new list";
  newBoard.appendChild(addListBtn);
  const newBoardTitle = document.createElement("div");
  newBoardTitle.setAttribute("class", "board-name");
  newBoardTitle.textContent = "New Board";
  boardWrapper.insertBefore(newBoardTitle, addBoardBtn);
  boardWrapper.insertBefore(newBoard, addBoardBtn);
  console.log("creating new board");
}

function addList(target) {
  const board = target.parentNode;
  const nodeToInsertBefore = target;
  console.log(target);
  console.log(nodeToInsertBefore);
  const listTitle = createElement("div", { class: "list-title" });
  const contentMenu = createElement("div", { class: "content-menu" });
  const dot = createElement("div", { class: "dot" });
  appendInOrder(contentMenu, dot, dot.cloneNode(true), dot.cloneNode(true));
  appendInOrder(listTitle, document.createTextNode("List Name"), contentMenu);

  const AddTaskBtn = createElement("div", {
    class: "list-item add-task-btn",
  });
  AddTaskBtn.addEventListener("click", () => {
    document.getElementById("list-0").appendChild(createListItem("Task 1"));
  });
  const addBtnContent = createElement("div", { class: "list-item-content" });
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
  const lists = createElement("div", { class: "lists" });
  appendInOrder(
    lists,
    listTitle,
    AddTaskBtn,
    createElement("div", { class: "list", id: "list-0" })
  );
  board.insertBefore(lists, nodeToInsertBefore);
}

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
const board = (name) => {
  let boardName = name;
  let lists = [];
  let listIndex = 0;

  const addList = (listName) => {
    lists.push(createList(listIndex, listName));
    listIndex++;
  };

  return { addList, lists, boardName };
};
