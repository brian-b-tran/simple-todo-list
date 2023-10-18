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

  const removeList = (listID) => {
    lists.filter((list) => {
      console.log(
        `removing list: ${lists.findIndex((list) => {
          list.getID();
        })}`
      );
      list.getID() !== listID;
    });
  };
  const getName = () => boardName;
  const getID = () => boardID;
  return { addList, removeList, lists, getName, getID };
};

export default board;
