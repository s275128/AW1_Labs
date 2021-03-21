"use strict";

const dayjs = require('dayjs');
const sqlite= require('sqlite3');


function Task(id, description, urgent = false, priv = true, deadline){
     this.id=id;
     this.description=description;
     this.urgent=urgent;
     this.priv=priv;
 
     this.strDeadline= "";
     if(deadline==undefined || deadline.D == NaN )
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

    const db = new sqlite.Database('tasks.db', (err) => { if (err) throw err;} ); 

    const passData = (data ) => {
        if(data==null)
            return undefined;
        else 
            return dayjs(data);
    };

    this.getAll = () =>{
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM tasks';
            db.all(sql, [], (err, rows) => {
                if(err) reject(err);
                else {
                    const tasks = rows.map( record => new Task (record.id, record.description, record.urgent, record.private, passData(record.deadline)));
                    resolve(tasks);
                }
            });
        })


    };

     this.list = []; 
 
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

     this.printDb = () => {

        return new Promise( (resolve, reject) => {
            let sql = "SELECT * FROM tasks";
            db.all(  sql ,
            (err, rows) => {
                if(err) reject(err);
                for(let row of rows){
                    console.log(row);
                }
                }  )
        });
    };
    
    this.filterAfter = (data) => {
        this.filteredList = [];

        return new Promise( (resolve, reject) => {
            let sql = 'SELECT * FROM tasks WHERE deadline>? '  ;
            db.all(  sql , data, 
            (err, rows) => {
                if(err) reject(err);

                const filtTasks = rows.map( record => new Task (record.id, record.description, record.urgent, record.private, passData(record.deadline)));
                resolve(filtTasks);
                }  )
        });
    };

    this.filterWord = (word) => {
        this.filteredWordList = [];

        return new Promise( (resolve, reject) => {
            let sql = 'SELECT * FROM tasks WHERE description LIKE ?'  ;
            let str = "%"+word+"%";
            db.all(  sql , str, 
            (err, rows) => {
                if(err) reject(err);

                const filteredWordList = rows.map( record => new Task (record.id, record.description, record.urgent, record.private, passData(record.deadline)));
                resolve(filteredWordList);
                }  ) 
        });
    };
 }
 
async function main() {

    try{
        const taskList1 = new TaskList();
        console.log("Tasks in the db:");
        const tasks = await taskList1.getAll();
        tasks.forEach( (task)=> console.log( task.toString() ) );

        console.log("Tasks filtered by date: ");
        const filteredTasks = await taskList1.filterAfter("2021-03-03");
        filteredTasks.forEach( (task) => console.log(task.toString()) );
        let word = "Phon_";
        console.log("Tasks filtered by word: " + word);
        const wordTasks= await taskList1.filterWord(word);
        wordTasks.forEach( (task) => console.log( task.toString() ) );
        debugger;    

    } catch(error) {
        console.log(error);
        return;
    }

}

main();
