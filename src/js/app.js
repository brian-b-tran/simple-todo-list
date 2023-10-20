console.log("script is running..");
import "../css/app.css";

import renderer from "./renderer";

const render = renderer();
document.getElementById("boardForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  render.createBoardComponent(data.get("Name"));
  e.target.reset();
  render.toggleModal();
});
