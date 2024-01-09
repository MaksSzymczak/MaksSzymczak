const taskManager = (() => {
  const state = {
    tasks: [],
  };

  const render = () => {
    const tasksContainer = document.querySelector(".js-tasks");
    tasksContainer.innerHTML = state.tasks
      .map(
        (task, index) => `
        <li class="list__item
           ${task.done ? " list__item--done" : ""}">
        <button class="js-done task__button task__button--toggleDone">
           ${task.done ? "✅" : ""}</button>
        <span class="js-task-content 
           ${task.done ? "task-content--done" : ""}">
           ${task.content}</span>
        <button class="js-remove task__button task__button--remove">🗑️</button>
      </li>
        `
      )
      .join("");

    bindEvents();
  };

  const removeTask = (index) => {
    const updatedTasks = [
      ...state.tasks.slice(0, index),
      ...state.tasks.slice(index + 1),
    ];
    state.tasks = updatedTasks;
    render();
  };

  const toggleTaskDone = (index) => {
    const updatedTasks = [...state.tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      done: !updatedTasks[index].done,
    };
    state.tasks = updatedTasks;
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const addNewTask = (newTaskContent) => {
    const newTask = {
      content: newTaskContent,
      done: false,
    };
    const updatedTasks = [...state.tasks, newTask];
    state.tasks = updatedTasks;

    render();

    const newTaskInput = document.querySelector(".js-newTask");
    newTaskInput.value = "";
    newTaskInput.focus();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskInput = document.querySelector(".js-newTask");
    const newTaskContent = newTaskInput.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskInput.value = "";
    }
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  return { init };
})();

taskManager.init();
