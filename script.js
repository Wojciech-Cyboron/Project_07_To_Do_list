let todoInput, errorInfo, addBtn, ulList, newTodo
let popup, popupInfo, todoToEdit, popupInput, popupAddBtn, popupCloseBtn

const main = () => {
  prepareDomElements()
  prepareDomEvents()
}

const prepareDomElements = () => {
  todoInput = document.querySelector(".todo-input")
  errorInfo = document.querySelector(".error-info")
  addBtn = document.querySelector(".btn-add")
  ulList = document.querySelector(".todolist ul")

  popup = document.querySelector(".popup")
  popupInfo = document.querySelector(".popup-info")
  popupInput = document.querySelector(".popup-input")
  popupAddBtn = document.querySelector(".accept")
  popupCloseBtn = document.querySelector(".cancel")
}

const prepareDomEvents = () => {
  addBtn.addEventListener("click", addNewTask)
  ulList.addEventListener("click", checkClick)
  popupCloseBtn.addEventListener("click", closeEditTodo)
  popupAddBtn.addEventListener("click", changeTodoText)
  todoInput.addEventListener("keyup", checkEnter)
}

const addNewTask = () => {
  if (todoInput.value !== "") {
    newTodo = document.createElement("li")
    newTodo.textContent = todoInput.value
    createToolsArea()
    ulList.append(newTodo)
    todoInput.value = ""
    errorInfo.textContent = ""
  } else {
    errorInfo.textContent = "Wpisz treść zadania!"
  }
}

const createToolsArea = () => {
  const divTool = document.createElement("div")
  divTool.classList.add("tools")

  const checkBtnTool = document.createElement("button")
  checkBtnTool.classList.add("complete")
  checkBtnTool.innerHTML = '<i class="fas fa-check"></i>'

  const editBtnTool = document.createElement("button")
  editBtnTool.classList.add("edit")
  editBtnTool.textContent = "EDIT"

  const delBtnTool = document.createElement("button")
  delBtnTool.classList.add("delete")
  delBtnTool.innerHTML = '<i class="fas fa-times"></i>'

  divTool.append(checkBtnTool, editBtnTool, delBtnTool)
  newTodo.append(divTool)
}

const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed")
    e.target.classList.toggle("completed")
  } else if (e.target.matches(".edit")) {
    editTodo(e)
  } else if (e.target.matches(".delete")) {
    deleteTodo(e)
  }
}

const editTodo = (e) => {
  todoToEdit = e.target.closest("li")
  popupInput.value = todoToEdit.firstChild.textContent
  popup.style.display = "flex"
}

const closeEditTodo = () => {
  popup.style.display = "none"
  popupInfo.textContent = ""
}

const changeTodoText = () => {
  if (popupInput.value !== "") {
    todoToEdit.firstChild.textContent = popupInput.value
    popup.style.display = "none"
    popupInfo.textContent = ""
  } else {
    popupInfo.textContent = "Musisz podać jakąś treść zadania"
  }
}

const deleteTodo = (e) => {
  todoToDelete = e.target.closest("li")
  todoToDelete.remove()

  const allTodo = ulList.querySelectorAll("li")
  if (allTodo.length === 0) {
    errorInfo.textContent = "Brak zadań na liście"
  }
}

const checkEnter = (e) => {
  if (e.key === "Enter") {
    addNewTask()
  }
}

document.addEventListener("DOMContentLoaded", main)
