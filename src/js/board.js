import createList from "./list.js";
import renderer from "./renderer.js";
const createBoard = (id, name) => {
  let boardName = name
    ? name
    : id !== 0
    ? `New Board (${id + 1})`
    : `New Board`;
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
  const updateName = (newName) => {
    boardName = newName;
  };
  const getName = () => boardName;
  const getID = () => boardID;
  return { updateName, addList, removeList, lists, getName, getID };
};

export default createBoard;
