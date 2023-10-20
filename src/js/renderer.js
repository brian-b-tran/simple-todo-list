import { createElement, appendInOrder } from "./helpers/helpers.js";
import createBoard from "./board.js";
const renderer = () => {
  const boardWrapper = document.getElementById("board-wrapper");
  const addBoardBtn = boardWrapper.lastChild.previousSibling;

  let boardArray = [];
  let boardIndex = 0;
  let isModalOpen = false;
  //Modal Stuff
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
  //

  const createBoardComponent = (boardName) => {
    const board = createBoard(boardIndex, boardName);
    boardArray.push(board);
    const newBoard = createElement("div", {
      class: "board",
      id: `${board.getID()}`,
    });

    newBoard.appendChild(createAddListBtnComponent(board));
    const newBoardTitle = document.createElement("div");
    newBoardTitle.setAttribute("class", "board-name");
    const text = createElement("div", { class: "board-title" });
    text.textContent = `${board.getName()}`;
    appendInOrder(newBoardTitle, text, createMenuComponent(board.getID()));
    boardWrapper.insertBefore(newBoardTitle, addBoardBtn);
    boardWrapper.insertBefore(newBoard, addBoardBtn);

    boardIndex++;
  };

  const createAddListBtnComponent = (board) => {
    const addListBtn = createElement("div", {
      class: "lists add-list-btn",
    });
    addListBtn.textContent = "+ add a new list";
    addListBtn.addEventListener("click", (e) => {
      e.stopPropagation;
      document.getElementById(`newListForm${board.getID()}`).style.display =
        "block";
      document
        .getElementById(`newListInput${board.getID()}`)
        .addEventListener("focusout", (e) => {
          e.target.value = "";
          document.getElementById(`newListForm${board.getID()}`).style.display =
            "none";
        });
      document.getElementById(`newListInput${board.getID()}`).focus();
    });

    const listForm = createElement("form", {
      id: `newListForm${board.getID()}`,
      style: "display:none",
      autocomplete: "off",
    });
    const textInput = createElement("input", {
      type: "text",
      name: "Name",
      placeholder: "List Name",
      id: `newListInput${board.getID()}`,
      autocomplete: "off",
    });
    listForm.appendChild(textInput);
    listForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      board.addList(`${board.getID()}`, data.get("Name"));
      e.target.reset();
      e.target.style.display = "none";
      return true;
    });
    addListBtn.appendChild(listForm);
    return addListBtn;
  };

  const createMenuComponent = (dataID) => {
    const Menu = createElement("div", {
      class: "content-menu hide",
      data: dataID,
    });
    const dots = [
      createElement("div", { class: "dot" }),
      createElement("div", { class: "dot" }),
      createElement("div", { class: "dot" }),
    ];
    const dropDown = createElement("div", {
      class: "dropDown hide",
    });
    const dropDownItemDelete = createElement("button", {
      class: "drownDownButton",
      data: `${dataID}`,
    });
    dropDownItemDelete.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = e.target.getAttribute("data");
      const itemToRemove = document.getElementById(`${id}`);
      if (id.length === 1) {
        itemToRemove.previousSibling.remove();
      }
      itemToRemove.remove();
    });
    dropDownItemDelete.textContent = "Delete";

    const dropDownItemEdit = createElement("button", {
      class: "drownDownButton",
      data: `${dataID}`,
    });
    dropDownItemEdit.addEventListener("click", (e) => {
      e.stopPropagation();
      e.target.parentNode.classList.remove("show-flex");
      e.target.parentNode.classList.add("hide");
      const id = e.target.getAttribute("data");
      const itemToEdit = document.getElementById(`${id}`);
      const newNameForm = createElement("form", {
        class: "",
        autocomplete: "off",
      });
      let input = createElement("input", {
        class: "newNameInput ",
        name: "name",
      });
      if (id.length === 1) {
        const newItemToEdit = itemToEdit.previousSibling;
        const title = newItemToEdit.firstChild;
        input.classList.add("board-name-input");
        input.setAttribute("value", `${title.textContent}`);
        title.classList.add("hide");
        newNameForm.appendChild(input);
        newItemToEdit.insertBefore(newNameForm, newItemToEdit.lastChild);
      }
      if (id.length === 3) {
        const title = itemToEdit.firstChild.firstChild;
        input.classList.add("list-name-input");
        input.setAttribute("value", `${title.textContent}`);
        title.classList.add("hide");
        newNameForm.appendChild(input);
        itemToEdit.firstChild.insertBefore(
          newNameForm,
          itemToEdit.firstChild.lastChild
        );
      }
      if (id.length === 5) {
        const title = itemToEdit.lastChild.lastChild.previousSibling;
        console.log(title);
        input.classList.add("task-name-input");
        input.setAttribute("value", `${title.textContent}`);
        title.classList.add("hide");
        newNameForm.appendChild(input);
        itemToEdit.firstChild.insertBefore(
          newNameForm,
          itemToEdit.firstChild.lastChild
        );
      }
      input.setSelectionRange(0, input.value.length);
      input.focus();
      newNameForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        e.target.reset();
        e.target.previousSibling.textContent = data.get("name");
        e.target.previousSibling.classList.remove("hide");
        e.target.classList.add("hide");
        console.log(e.target);
      });
      newNameForm.addEventListener("focusout", (e) => {
        e.target.parentNode.previousSibling.classList.remove("hide");
        if (e.target.parentNode) {
          e.target.parentNode.remove();
        }
      });
    });
    dropDownItemEdit.textContent = "Edit";
    dropDown.appendChild(dropDownItemEdit);
    dropDown.appendChild(dropDownItemDelete);
    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.target.parentNode.classList.remove("hide");
        e.target.parentNode.classList.add("show");
        e.target.parentNode.lastChild.classList.remove("hide");
        e.target.parentNode.lastChild.classList.add("show-flex");
      });
    });
    Menu.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      e.target.classList.remove("hide");
      e.target.classList.add("show");
      e.target.lastChild.classList.remove("hide");
      e.target.lastChild.classList.add("show-flex");
    });
    window.onclick = (e) => {
      var dropDowns = document.getElementsByClassName("content-menu");
      for (let i = 0; i < dropDowns.length; i++) {
        dropDowns[i].classList.remove("show");
        dropDowns[i].classList.add("hide");
        dropDowns[i].lastChild.classList.remove("show-flex");
        dropDowns[i].lastChild.classList.add("hide");
      }
    };
    appendInOrder(Menu, dots[0], dots[1], dots[2], dropDown);
    return Menu;
  };

  const createListComponent = (boardID, list) => {
    const listTitle = createElement("div", { class: "list-title" });
    const listName = createElement("div", { class: "list-name" });
    listName.appendChild(document.createTextNode(list.getName()));
    appendInOrder(
      listTitle,
      listName,
      createMenuComponent(`${boardID}-${list.getID()}`)
    );

    const AddTaskBtn = createElement("div", {
      class: "list-item add-task-btn",
    });

    const taskBtnContent = createElement("form", {
      class: "list-item-content",
      data: `${list.getID()}`,
      autocomplete: "off",
    });
    taskBtnContent.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      const listID = e.target.parentNode.parentNode.getAttribute("id");
      list.addTask(data.get("task"), "", "");
      const listOfTasks = e.target.parentNode.parentNode.lastChild;
      listOfTasks.insertBefore(
        createListItemComponent(listID, list.getNewestTask()),
        listOfTasks.firstChild
      );
      e.target.reset();
    });
    appendInOrder(
      taskBtnContent,
      createElement("div", { class: "content-check-box" }).appendChild(
        document.createTextNode("+")
      ),
      createElement("input", {
        class: "content-text",
        placeholder: "add a task",
        type: "text",
        name: "task",
        autocomplete: "off",
      })
    );
    AddTaskBtn.appendChild(taskBtnContent);
    const listsContainer = createElement("div", {
      class: "lists",
      id: `${boardID}-${list.getID()}`,
    });
    appendInOrder(
      listsContainer,
      listTitle,
      AddTaskBtn,
      createElement("div", { class: "list", id: `list-${list.getID()}` })
    );

    const board = document.getElementById(`${boardID}`);
    board.insertBefore(listsContainer, board.lastChild);
  };

  const createListItemComponent = (listID, task) => {
    let text = task.getName();
    const listItemContainer = createElement("div", {
      class: "list-item",
      id: `${listID}-${task.getID()}`,
    });
    const listItemContent = createElement("div", {
      class: "list-item-content",
    });
    const contentText = createElement("div", {
      class: "content-text show-flex",
    });
    contentText.appendChild(document.createTextNode(text));
    const checkBox = createElement("div", { class: "content-check-box" });
    checkBox.appendChild(createElement("div", { class: "circle" })),
      appendInOrder(
        listItemContent,
        checkBox,
        contentText,
        createMenuComponent(`${listID}-${task.getID()}`)
      );
    listItemContainer.appendChild(listItemContent);
    return listItemContainer;
  };

  return {
    createListComponent,
    createMenuComponent,
    createAddListBtnComponent,
    createBoardComponent,
    toggleModal,
  };
};
export default renderer;
