"use strict"

let words = ["ciao","cane","patate","pomodoro"];

for(let i =0; i < words.length; i++){
    console.log(words[i]);
    let word = words[i];
    let len = word.length;
    if(len>=2){
        let res = word[0]+word[1]+word[len-2]+word[len-1];
        words[i]= res;
    }
    else{
        words[i]="";
    }
    
    //console.log(words[i]);
}

for(let word of words){
    console.log(word);
}

