"use strict"

function Task(id, description, urgent, privato, deadline="") {
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.privato = privato;
    this.deadline = deadline;
  }
function compare(a, b) {
    const deadA = a.deadline;
    const deadB = b.deadline;

    if(deadA===""){
        return 1;
    } 
    else if( deadB ===""){
        return -1;
    } 
    
    let comparison = 0;
    if (deadA > deadB ) {
      comparison = 1;
    } else if (deadA < deadB ) {
      comparison = -1;
    }
    return comparison;
  }

  function TaskList() {
    this.list = [];
  
    this.add = (e) => {
      this.list.push(e);
    };
   this.sortAndPrint= () =>{
        this.list.sort(compare);
        console.log("dopo ordinamento");
        console.log(this.list);
   }
   this.filterUrgent = () => {
       this.list = this.list.filter(e => {
           if(e.urgent===true) {
               console.log("e' urgente\n");
               return true;}

           return false;
       } )
       console.log("dopo filtramentazione");
       console.log(this.list);
   }
  }

  const tasklist = new TaskList();
  const task3 = new Task(3,"phone call", true, false,"2021-03-08");
  const task2 = new Task(2,"monday lab",false,false, "2021-03-16");
  const task1 = new Task(1,"laundry",false, true);
  const task4 = new Task(4,"laundryssss",false, true);
  


  tasklist.add(task1);
  tasklist.add(task2);
  tasklist.add(task3);
  tasklist.add(task4);



  
  
  tasklist.sortAndPrint();
  tasklist.filterUrgent();
  