let count2=0;
let count="cross";
for (let i = 1; i < 10; i++) {

    const element = document.querySelector(`.class${i}a`);
    element.addEventListener("click", handleClick);

      
      
}


function handleClick() {
    count2++;
    const element =this;
    if(count==="cross"){
        element.textContent="X"
        count="circle";
        document.querySelector(".whoseturn").innerHTML=`Its circle's turn`;
        check("X");
    }else{
        element.textContent="O"
        count="cross";
        document.querySelector(".whoseturn").innerHTML=`Its cross's turn`;
        check("O");
    }
    element.removeEventListener("click", handleClick);
  };



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
            break;
        }
        if(count2===9 && i===7){
            document.querySelector(".whoseturn").innerHTML=`It's a tie`;
            resetgame();
        }
    }
}

function makered(index){
    for(let i=0;i<win[index].length;i++){
        document.querySelector(`.class${win[index][i]}a`).style.backgroundColor="red";
    }

}

function removeevent(){


    for(let i=0;i<8;i++){

        for(let j=0;j<win[i].length;j++){
            index=win[i][j];
            const first=document.querySelector(`.class${index}a`);
            first.removeEventListener("click", handleClick);

            
        }
    }

}

function resetgame(){
    document.querySelector('.reset-div').innerHTML = `<button onclick="location.reload()">Play again</button>`;
}
