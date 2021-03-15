"use strict"

const sqlite = require('sqlite3');
const db = new sqlite.Database('tasks.db',
    (err) => { if (err) throw err; });

async function readAllfromDB() {
    return new Promise( (resolve, reject) => {
        db.all('select id, description, urgent, private, deadline from tasks',
            (err, rows) => {
                if(err)
                        reject(err);
                else {
                    for(const row of rows){                           
                        const task = new Task(row.id,row.description, row.urgent, row.private,row.deadline);
                        tasklist.add(task);
                        resolve(row.id);
                    }
                        
                }
            }) ;            
        }) ;
}

async function filterByWord(word) {
    return new Promise( (resolve, reject) => {
        db.all('select * from tasks',
            (err, rows) => {
                if(err)
                        reject(err);
                else {
                    rows = rows.filter( e => e.description.includes(word));
                    for(const row of rows)  {                   
                        const task = new Task(row.id,row.description, row.urgent, row.private,row.deadline);
                        taskListFilteredByWord.add(task);
                        resolve(row.id);
                    }    
                }
            }) ;            
        }) ;
}

async function filterAndPrintByDate(deadline) {
    return new Promise( (resolve, reject) => {
        console.log(deadline);
        db.all('select id, description, urgent, private, deadline from tasks where date(deadline) > ?', deadline,
            (err, rows) => {
                if(err)
                        reject(err);
                else {
                    for(const row of rows){   
                        const task = new Task(row.id,row.description, row.urgent, row.private,row.deadline);
                        taskListFilteredByDate.add(task);
                        resolve(row.id);
                    }       
                }
            }) ;            
        }) ;
}

function Task(id, description, urgent, privato, deadline="") {
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.privato = privato;
    this.deadline = deadline;
  }

  function TaskList() {
    this.list = [];
  
    this.add = (e) => {
      this.list.push(e);
    };
   this.printList= () => {
       console.log("Task List :\n");
       console.log(this.list);
   }
  }

  const tasklist = new TaskList();
  const taskListFilteredByDate = new TaskList();
  const taskListFilteredByWord = new TaskList();
  
async function readDate(){
    let date;
    date = window.prompt("Insert a Date in the format : YYYY-MM-DD ? ");
    date = new Date(date);
    console.log(date);
    return date;
}

async function main() {
    
    await readAllfromDB();
    console.log("All tasks from DB")
    tasklist.printList();

    await filterAndPrintByDate("2021-03-10");
    console.log("After filter by date")
    taskListFilteredByDate.printList();

    await filterByWord("call");
    console.log("After filter by word")
    taskListFilteredByWord.printList();


    db.close();
}

main();
  