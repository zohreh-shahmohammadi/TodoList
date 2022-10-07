const themeSwitcherBtn = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("addt");
const ul = document.querySelector(".todos");
function main() {
  // Theme-Switcher
  themeSwitcherBtn.addEventListener("click", () => {
    bodyTag.classList.toggle("light");
    const themeImg = themeSwitcherBtn.children[0];
    themeImg.setAttribute(
      "src",
      themeImg.getAttribute("src") === "./assets/images/icon-sun.svg"
        ? "./assets/images/icon-moon.svg"
        : "./assets/images/icon-sun.svg"
    );
  });


  makeTodoElement(JSON.parse(localStorage.getItem("todos")));
  //dragover 
  ul.addEventListener('dragover',(e) =>{
    e.preventDefault();
   if(e.target.classList.contains("card") && !e.target.classList.contains("dragging")){
const draggingCard = document.querySelector(".dragging");
const cards = [...ul.querySelectorAll(".card")];
const currentPosition = cards.indexOf(draggingCard);
const newPosition = cards.indexOf(e.target);
if(currentPosition > newPosition){
  ul.insertBefore(draggingCard,e.target);
}else{
  //we don't have insertAftar we used this method ,this method instead of insertAftar
  ul.insertBefore(draggingCard,e.target.nextSibling);
}
const todos=JSON.parse(localStorage.getItem("todos"));
const remove = todos.splice(currentPosition,1);
todos.splice(newPosition,0,remove[0]);
localStorage.setItem("todos",JSON.stringify(todos));
   }
  });


  //Add Todo In LocalStorage
  addBtn.addEventListener("click", () => {
    const item = todoInput.value.trim();
    if (item) {
      todoInput.value = "";
      const todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));

      const currentTodo = {
        item: item,
        isCompleted: false,
      };

      todos.push(currentTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
}

function makeTodoElement(todoArray) {
  if (!todoArray) {
    return null;
  }

  todoArray.forEach((todoObject) => {
    //Create Html Elements Of Todo
    const card = document.createElement("li");
    const cbContainer = document.createElement("div");
    const cbInput = document.createElement("input");
    const checkSpan = document.createElement("span");
    const item = document.createElement("p");
    const clearBtn = document.createElement("button");
    const img = document.createElement("img");

    //Add Classes
    card.classList.add("card");
    cbContainer.classList.add("cb-container");
    cbInput.classList.add("cb-input");
    checkSpan.classList.add("check");
    item.classList.add("item");
    clearBtn.classList.add("clear");
    //Add Attributes
    card.setAttribute("draggable", true);
    cbInput.setAttribute("type", "checkbox");
    img.setAttribute("src", "./assets/images/icon-cross.svg");
    img.setAttribute("alt", "Clear It");
    item.textContent = todoObject.item;
    //Add EventListener
card.addEventListener('dragstart',() => {
card.classList.add("dragging");
});
card.addEventListener('dragend',() => {
card.classList.remove("dragging");

});
    //Set Element by Parent Child
    clearBtn.appendChild(img);
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(checkSpan);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(clearBtn);
    document.querySelector(".todos").appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", main);


