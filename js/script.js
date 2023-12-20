const taskManager = (() => {
  const state = {
    tasks: [],
  };

  const render = () => {
    const tasksContainer = document.querySelector(".js-tasks");
    tasksContainer.innerHTML = state.tasks
      .map(
        (task, index) => `
          <li class="list__item${task.done ? " list__item--done" : ""}">
            <button class="js-done task__button task__button--toggleDone">${
              task.done ? "✅" : ""
            }</button>
            ${task.content}
            <button class="js-remove task__button task__button--remove">🗑️</button>
          </li>
        `
      )
      .join("");

    bindEvents();
  };

  const removeTask = (index) => {
    state.tasks.splice(index, 1);
    render();
  };

  const toggleTaskDone = (index) => {
    state.tasks[index].done = !state.tasks[index].done;
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
    state.tasks.push({
      content: newTaskContent,
      done: false,
    });

    render();
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
