console.log("script is running..");
import "../css/app.css";
import createList from "./list.js";

const board = (name) => {
  let boardName = name;
  let boardLists = [];

  const addList = (listName) => {
    boardLists.push(createList("list1"));
  };

  return { addList, boardLists };
};

const project1 = board("Project 1");
project1.addList("list1");
project1.boardLists[0].addTask(0, "task1", "first task", "some date");
project1.boardLists[0].addTask(1, "task2", "second task", "some date");
project1.boardLists[0].addTask(2, "task3", "third task", "some date");
console.log(project1.boardLists[0].getName());
