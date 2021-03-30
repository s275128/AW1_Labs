
function Task(id, description, urgent, privato, deadline = "") {
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.privato = privato;
    this.deadline = deadline;
}
function TaskList() {
    
    this.list = [];
    this.add = (task) => {
        this.list.push(task);
    }
    this.filterByTitle = (title) => {
        let data = dayjs().format('YYYY-MM-DD');
        console.log("ecco il titolo");
        console.log(title);
        switch (title) {
            case "All":
                return this.list;
                break;
            case "Today":
                console.log(data);
                return this.list.filter((l)=>l.deadline===data ?  true: false);
                break;
            case "Important":
                return  this.list.filter((l)=>l.urgent ?  true: false);
                break;
            case "Next 7 days":
                console.log(data)
                let n7days=dayjs(data).add(7,'days').format("YYYY-MM-DD");
                console.log(n7days);
                return this.list.filter((l)=>l.deadline>=data && l.deadline<=n7days ?  true: false);                
                break;
            case "Private":
                console.log("PRIVATEEEEE");
                return  this.list.filter((l)=>l.privato ?  true: false);
                break;
        }

    }

}

const t1 = new Task(1, "Read a Book", true, true, "2021-04-02");
const t2 = new Task(2, "Study more", false, false);
const t3 = new Task(3, "Sleep 8 hours", true, true, "2021-03-28");
const t4 = new Task(4, "Do some esercizio fisico workout", false, true, "2021-04-08");
const list = new TaskList();
list.add(t1);
list.add(t2);
list.add(t3);
list.add(t4);

