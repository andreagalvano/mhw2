/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function check_item(event){

    const element = event.currentTarget;
    const boxes = element.parentNode.querySelectorAll('div');

    element.classList.add('checked');
    element.classList.remove('unchecked');
    const image = element.querySelector('.checkbox');
    image.src ="images/checked.png";
    
    for(let item of boxes){
        if(item != element){
            item.classList.remove('checked');

            item.classList.add('unchecked');
            const image = item.querySelector('.checkbox');
            image.src ="images/unchecked.png";
        }
    }
    Map_risposte[element.dataset.questionId]=element.dataset.choiceId;
    Controlla();
}
function Reset(event){
    const answer =document.querySelector('#answer');
    answer.classList.add('hidden');

    let lista = document.querySelectorAll('.choice-grid div');
    for(let item of lista){
      item.addEventListener("click",check_item);
      item.classList.remove('checked');
      item.classList.remove('unchecked');
      const image =item.querySelector('.checkbox');
      image.src ="images/unchecked.png";
    }
    Map_risposte={};
    risultato=null;
}
function Controlla(){
    let num=0;
    for(let key in Map_risposte){
        num++;
    }
    if(num===3){
        const sezioni = document.querySelectorAll('section');
        for(let i of sezioni){
            let divs =i.querySelectorAll('div');
            for(d of divs){
                d.removeEventListener('click',check_item);
            }
        }
        Genera_risposta();
    }
}

function Genera_risposta(){
    let risposte=[];
    for(let key in Map_risposte){
        risposte.push(Map_risposte[key]);
    }
    let aux=[];
    for(let i=0;i<risposte.length;i++){
        for(let j=i+1;j<risposte.length;j++){
            if(risposte[i]===risposte[j]){
                aux.push(risposte[i]);
            }
        }
    }
    if(aux.length===0){
        risultato=risposte[0];
    }else{
        risultato=aux[0];
    }
    const answer =document.querySelector('#answer');
    answer.classList.remove('hidden');
    const bottone =answer.querySelector('.button');
    bottone.addEventListener("click",Reset);
   const titolo= answer.querySelector('h1');
   titolo.textContent=RESULTS_MAP[risultato].title;
   const paragrafo=answer.querySelector('p');
   paragrafo.textContent=RESULTS_MAP[risultato].contents;
}

let lista = document.querySelectorAll('.choice-grid div');
for(let item of lista){
    item.addEventListener("click",check_item);
}

let Map_risposte ={};
let risultato=null;