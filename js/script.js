{
  let tasks = [];

  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const removeTask = (index) => {
    tasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    render();
  };

  const toggleTaskDone = (index) => {
    tasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, done: !task.done } : task
    );
    render();
  };

  const markAllDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-removeTask");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
          <li class="${
            hideDoneTasks && task.done ? "tasks__hidden" : "tasks__item"
          }">
              <button class="tasks__button tasks__button--toggleDone js-toggleDone"> 
              ${task.done ? "✅" : ""}
              </button>
              <span class="tasks__content${
                task.done ? " tasks__content--done" : ""
              }"> ${task.content} </span>
              <button class="tasks__button tasks__button--remove js-removeTask">🗑</button>
          </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
          <button class="buttons__button js-toggleHideDoneTasks">
              ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
          </button>
          <button class="buttons__button js-markAllDone" 
          ${tasks.every(({ done }) => done) ? " disabled" : ""}
          >
              Ukończ wszystkie
          </button>
      `;
  };

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllDone);
    }

    const toggleHideDoneButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );

    if (toggleHideDoneButton) {
      toggleHideDoneButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }
    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
