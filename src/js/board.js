import createList from "./list.js";
import renderer from "./renderer.js";
const board = (id, name) => {
  let boardName = name;
  let lists = [];
  let listIndex = 0;
  let boardID = id;

  const addList = (boardID, name) => {
    lists.push(createList(listIndex, name));
    const render = renderer();
    render.createListComponent(boardID, lists[listIndex]);
    listIndex++;
  };
  const getName = () => boardName;
  const getID = () => boardID;
  return { addList, lists, getName, getID };
};

export default board;
