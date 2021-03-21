"use strict";

const dayjs = require('dayjs');

function Task(id, description, urgent = false, priv = true, deadline){
    this.id=id;
    this.description=description;
    this.urgent=urgent;
    this.priv=priv;
    this.strDeadline= "";

    if(deadline==undefined)
        this.strDeadline = "<not defined>";
    else{
        this.deadline=deadline;
        this.strDeadline = this.deadline.format('YYYY-MM-DD HH:MM')
    }

    this.toString = () => (
        `\nId: ${this.id}, Description: ${this.description}, Urgent: ${this.urgent}, Private: ${this.priv}, Deadline: ${this.strDeadline}`
    ); 
}

function TaskList(){
    this.list = []; //store an array internally

    this.add = (t) => {
        this.list.push(t);
    } 

    /*
    Sort by deadline, Ascending - from smallest to largest
    Tasks with no deadline at the end
    */
    this.sortAndPrint = () => {
        console.log(this.list.sort( (a, b) => {
            if(a.deadline==undefined) return 1;
            if(b.deadline==undefined) return -1;
            if(a.deadline.isAfter(b.deadline)) return 1; else return -1;

        } ).toString()); // (a.deadline.isAfter(b.deadline) ? 1 : -1  ) ).toString());}      
    };

    this.filterAndPrint = () => {
        console.log(this.list.filter( x => x.urgent === true ).toString());      
    }; 
}

const task1 = new Task(1, "Descrizione1", true, true, dayjs('2021-12-06'));
const task2 = new Task(2, "Descrizione2", true, false, dayjs('2021-02-05'));
const task3 = new Task(3, "Descrizione3", true, false);
const task4 = new Task(4, "Descrizione4", false, false, dayjs('2021-08-05T16:00'));
const task5 = new Task(5, "Descrizione5", false, false, dayjs('2021-07-05'));
const task6 = new Task(6, "Descrizione3", false, false);
const task7 = new Task(7, "Descrizione3", true, true);

const taskList1 = new TaskList(); 
taskList1.add(task1);
taskList1.add(task2);
taskList1.add(task3);
taskList1.add(task4);
taskList1.add(task5);
taskList1.add(task6);
taskList1.add(task7);

taskList1.toString();

console.log("SortAndPrint: ");
taskList1.sortAndPrint();
console.log("FilterAndPrint: ");
taskList1.filterAndPrint();
console.log("fine");
debugger;