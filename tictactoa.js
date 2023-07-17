let count2=0;
let count="cross";
let array = [1,2,3,4,5,6,7,8,9];

function addEventListener(){
    for (let i of array ) {

        const element = document.querySelector(`.class${i}a`);
        element.addEventListener("click",handleClick);
    
    }
}

addEventListener();

function handleClick() {
    count2++;
    const element =this;
    const className = this.className;
    const i = +className[className.length-2];
    array.splice(array.indexOf(i),1);

    if(count==="cross"){
        element.textContent="X"
        count="circle";
        document.querySelector(".whoseturn").innerHTML=`Its circle's turn`;
        const result = check("X");
        removeevent();
        if(!result){
            computermove();
        }
    }else{
        element.textContent="O"
        count="cross";
        document.querySelector(".whoseturn").innerHTML=`Its cross's turn`;
        const result = check("O");
       /*  removeevent();
        if(!result){
            computermove();
        } */
    }
  };

function computermove(){
    shuffle();

    setTimeout(() => {
       let comPic = document.querySelector(`.class${array[0]}a`);
       handleClick.call(comPic);
       addEventListener();
   }, 500);
}

function shuffle() {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

const win=[
    [1,2,3],[4,5,6],[7,8,9],
    [1,4,7],[2,5,8],[3,6,9],
    [1,5,9],[3,5,7]
];

function check(move){
    
    for(let i=0;i<8;i++){
        
        let checker=true;

        for(let j=0;j<win[i].length;j++){
            index=win[i][j];
            const first=document.querySelector(`.class${index}a`);

            if(first.textContent!==move){
                checker=false;
                break;
            }

        }

        if(checker){
            document.querySelector(".whoseturn").innerHTML=`${move} wins`;
            makered(i);
            removeevent();
            resetgame();
            return true;
        }
        if(count2===9 && i===7){
            document.querySelector(".whoseturn").innerHTML=`It's a tie`;
            resetgame();
            return true;
        }
    }
    return false;
}

function makered(index){
    for(let i=0;i<win[index].length;i++){
        document.querySelector(`.class${win[index][i]}a`).style.backgroundImage= "radial-gradient(#fdfcfb , #e2d1c3)";
    }

}

function removeevent(){


    for(let i = 1 ; i < 10 ; i++){

        const first=document.querySelector(`.class${i}a`);
        first.removeEventListener("click", handleClick);
    }

}

function resetgame(){
    document.querySelector('.reset-div').innerHTML = `<button onclick="location.reload()">Play again</button>`;
}
