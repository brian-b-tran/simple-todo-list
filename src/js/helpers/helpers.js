const createElement = (element, attributes) => {
  const div = document.createElement(element);
  setAttributes(div, attributes);
  return div;
};
const appendInOrder = (parent, ...children) => {
  for (let i = 0; i < children.length; i++) {
    parent.appendChild(children[i]);
  }
  return parent;
};
function setAttributes(element, attributes) {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
}

export { createElement, appendInOrder, setAttributes };
