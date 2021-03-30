//window.addEventListener('load',event =>{

    let rows = document.querySelectorAll('tbody tr td div label'); //left-sidebar
    console.log(rows)
    
    for (let row of rows) {
        row.addEventListener('click', event => {
            let titolo = event.path[0].innerText;
            console.log(titolo);
        
            let title = document.getElementById('title');
            title.innerText = titolo;
    
            let lista = list.filterByTitle(titolo);
            console.log(lista);
            console.log("CRETINO");
            let newtable = document.getElementById('main-table');
            newtable.innerText = "";  //pulisco la vecchia lista
            let i=0;
            for (let l of lista) {   // aggiugere id id="check-t${i}"
                console.log(l);
                console.log(l.urgent);
                let htmlString = `
                <tr>
                <td class="col-3">
                    <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">
                  </td>
                  <td class="col-3 ${l.urgent?"text-danger":""} ">${l.description}</td>
                  <td class="col-3">
                  ${l.privato? `<svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                    </svg>` : "" }
                  </td>
                  <td class="col-3">${l.deadline}</td>
                
              </tr>


                    
                  `
                let htmlObject = document.createElement('tbody');
               // htmlObject.className="list-group-item";
                htmlObject.innerHTML = htmlString;
                newtable = document.getElementById('main-table');
                newtable.insertAdjacentElement('beforeend', htmlObject);
    
            }
            
        })
    
    }
    
    
    
    
    
    
    //})