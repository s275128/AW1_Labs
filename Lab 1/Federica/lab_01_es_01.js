"use strict";

const cutStr = (vett) => {

    for( const  el of vett ){
        if(el.length < 2){
            vett [ vett.indexOf(el) ] = "";
        } else {
            let str = el.slice(0,2) + el.slice(el.length -2, el.length );
            console.log(str);
            vett [ vett.indexOf(el) ] = str;
             }
    }
};


let vettore = ["spring", "ciaaaao", "","t","testo", "abc", "ab", "federica"];
cutStr(vettore);

console.log(vettore);

debugger;
