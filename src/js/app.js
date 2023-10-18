console.log("script is running..");
import "../css/app.css";
import board from "./board.js";
import renderer from "./renderer";
let boardIndex = 0;
let boardArray = [];

const render = renderer();
document.getElementById("boardForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  boardArray.push(board(boardIndex, data.get("Name") || "New Board"));
  render.createBoardComponent(boardArray[boardIndex]);
  boardIndex++;
  e.target.reset();
  render.toggleModal();
  return true;
});
