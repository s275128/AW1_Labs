"use strict";

const sqlite = require("sqlite3");

function Task(id, description, urgent = false, isPrivate = true, deadline) {
  this.id = id;
  this.description = description;
  this.urgent = urgent;
  this.private = isPrivate;
  this.deadline = deadline;
}

function TaskList(tasks) {
  this.tasks = [...tasks];
}

const db = new sqlite.Database("tasks.db", (err) => {
  if (err) throw err;
});

const getAllTasks = (filter) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM tasks";
    if (filter.afterDateString) sql += " WHERE date(deadline) > date(?)";
    sql += ";";

    db.all(sql, [filter.afterDateString], (err, rows) => {
      if (err) return reject(err);
      if (filter.containingWord) rows = rows.filter(row => row.description.includes(filter.containingWord));
      rows = rows.map(row => new Task(row.id, row.description, row.urgent, row.private, row.deadline));
      return resolve(rows);
    });
  });
}

getAllTasks({}).then((tasks) => {
  const list = new TaskList(tasks);
  console.log("*******ALL TASKS*******");
  console.log(list);
});

getAllTasks({ afterDateString: "2021-03-10" }).then((tasks) => {
  const list = new TaskList(tasks);
  console.log("*******ALL TASKS AFTER DATE*******");
  console.log(list);
});

getAllTasks({ containingWord: "call" }).then((tasks) => {
  const list = new TaskList(tasks);
  console.log("*******ALL TASKS AFTER CONTAINING WORD*******");
  console.log(list);
});

getAllTasks({ afterDateString: "2021-03-10", containingWord: "call" }).then((tasks) => {
  const list = new TaskList(tasks);
  console.log("*******ALL TASKS AFTER CONTAINING WORD*******");
  console.log(list);
});