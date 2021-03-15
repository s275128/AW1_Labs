function Task(id, description, urgent = false, private = true, deadline) {
  this.id = id;
  this.description = description;
  this.urgent = urgent;
  this.private = private;
  this.deadline = deadline;
}

function TaskList(tasks) {
  this.tasks = [...tasks];

  this.sortAndPrint = () => {
    tasks = tasks.sort((a, b) => {
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
      return a.deadline < b.deadline;
    });
    console.log("*******SORTED TASKS*******");
    console.log(tasks);
  }

  this.filterAndPrint = () => {
    tasks = tasks.filter(el => el.urgent);
    console.log("*******FILTERED TASKS*******");
    console.log(tasks);
  };
}

const tasks = [
  new Task(0, "Task 0"),
  new Task(1, "Task 1", true, false, new Date("2021-03-20")),
  new Task(2, "Task 2", true, true, new Date("2021-03-18")),
  new Task(3, "Task 3", false, false, new Date("2021-03-19")),
  new Task(4, "Task 4", true, false, new Date("2021-02-24")),
]

const list = new TaskList(tasks);

list.sortAndPrint();

list.filterAndPrint();
