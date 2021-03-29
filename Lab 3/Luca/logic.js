"use strict";

function Task(id, description, urgent = false, isPrivate = true, deadline) {
  this.id = id;
  this.description = description;
  this.urgent = urgent;
  this.private = isPrivate;
  this.deadline = deadline;
}

const tasks = [
  new Task(1, "Sell book", false, false),
  new Task(2, "Buy groceries", false, false, "2021-03-29T08:00:00.000Z"),
  new Task(3, "Renew contract", true, true, "2021-04-07T16:00:00.000Z"),
  new Task(4, "Fix bug", true, false),
  new Task(5, "Finish presentation", false, true, "2021-04-12T11:30:00.000Z"),
];

const drawTasks = (tasks) => {
  let html = "";

  for (const task of tasks) {
    html += `
    <tr class="align-middle">
      <td>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="checkbox1" />
          <label class="form-check-label" for="checkbox1">
            ${task.description}
          </label>
        </div>
      </td>

      <td class="text-center">
        ${task.private ? '' : '<i class="bi bi-eye" style="font-size: 1.5rem;"></i>'}
      </td>

      <td class="text-end">
        ${task.deadline ? dayjs(task.deadline).format('dddd DD MMMM YYYY, hh:mm a') : ''}
      </td>
    </tr>
    `;
  }

  const tbody = document.getElementById("table-body");
  tbody.innerHTML = html;
}

drawTasks(tasks);

const buttonAll = document.getElementById("btn-all");
buttonAll.addEventListener('click', (event) => {
  drawTasks(tasks);
});

const buttonImportant = document.getElementById("btn-important");
buttonImportant.addEventListener('click', (event) => {
  drawTasks(tasks.filter(task => task.urgent));
});

const buttonToday = document.getElementById("btn-today");
buttonToday.addEventListener('click', (event) => {
  drawTasks(tasks.filter(task =>
    task.deadline
      ? dayjs(task.deadline).diff(dayjs(), 'day') === 0
      : false));
});

const buttonNextDays = document.getElementById("btn-next-days");
buttonNextDays.addEventListener('click', (event) => {
  drawTasks(tasks.filter(task =>
    task.deadline
      ? dayjs(task.deadline).diff(dayjs().add(1, 'day'), 'day') <= 7
      : false));
});

const buttonPrivate = document.getElementById("btn-private");
buttonPrivate.addEventListener('click', (event) => {
  drawTasks(tasks.filter(task => task.private));
});