let count2=0;
let count="cross";
let array = [1,2,3,4,5,6,7,8,9];
let state;
let selectedValue;

const selectElement = document.getElementById('mode');

selectElement.addEventListener('change', (event) => {

    removeevent();
    resetGame();
    const mode = document.querySelector(".select");
    selectedValue = event.target.value;

    if( selectedValue === "playAgainstFriend") {

        count = "cross"
        mode.style.display = "none";
        document.querySelector(".whoseturn").innerHTML = `Its cross's turn`;
        for(let i = 1 ; i < 10 ; i++ ){
            document.querySelector(`.class${i}a`).addEventListener("click" , playWithFriend);
        }

    }else {
        location.reload();
    }

});

function startAgainAgainstFriend(){

    resetGame();

    count = "cross"
    document.querySelector(".whoseturn").innerHTML = `Its cross's turn`;
    for(let i = 1 ; i < 10 ; i++ ){
        document.querySelector(`.class${i}a`).addEventListener("click" , playWithFriend);
    }
}

function playWithFriend(){

    let result;
    count2++;
    if(count === "cross"){
        this.innerHTML = "X";
        count = "circle";
        this.removeEventListener("click" , playWithFriend);
        result = check("X");
    }else {
        this.innerHTML = "O";
        count = "cross";
        this.removeEventListener("click" , playWithFriend);
        result = check("O");

    }
    if(result){
        for(let i = 1 ; i < 10 ; i++ ){
            document.querySelector(`.class${i}a`).removeEventListener("click" , playWithFriend);
        }
        document.querySelector('.reset-div').innerHTML = `<button onclick="startAgainAgainstFriend();">Play again</button>`;
    }
}


function addEvent(){
    for ( let i of array ) {

        const element = document.querySelector(`.class${i}a`);
        element.addEventListener("click",handleUserClick);
    
    }
}

const Xbtn = document.querySelector(".x-btn");
const Ybtn = document.querySelector(".o-btn");

Xbtn.addEventListener("click" ,handTheClickOfx);

function handTheClickOfx(){
    state= "X";
    count = "cross";
    count2 = 0;
    resetGame();
    addEvent();
    Xbtn.classList.add("active");
    Ybtn.classList.remove("active");
}

handTheClickOfx()

Ybtn.addEventListener("click" , ()=>{

    state = "O";
    count = "cross";
    resetGame();
    computermove();
    Xbtn.classList.remove("active");
    Ybtn.classList.add("active");

});


function handleUserClick() {
    const element = this;
    let carry = placeMove(element);
    if( ! carry ) computermove();

  };

  function computermove(){
      shuffle();
      removeevent();
      setTimeout(() => {

         let comPic = document.querySelector(`.class${array[0]}a`);
         let carry = placeMove(comPic);
         if( ! carry ) addEvent();

     }, 700);
  }

  function shuffle() {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function placeMove( ele ){

    count2++;
    const className = ele.className;
    const i = +className[className.length-2];
    array.splice(array.indexOf(i),1);
    ele.removeEventListener("click" , handleUserClick);

    if( count === "cross" ){
        ele.textContent = "X";
        count="circle";
        document.querySelector(".whoseturn").innerHTML=`Its circle's turn`;
        return check("X");
    }else{
        ele.textContent = "O";
        count="cross";
        document.querySelector(".whoseturn").innerHTML=`Its cross's turn`;
        return check("O");
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
            if( selectedValue !== "playAgainstFriend" ){
                removeevent();
                playagian();
            }
            makered(i);
            return true;
        }
        if(count2===9 && i===7){
            document.querySelector(".whoseturn").innerHTML=`It's a tie`;
            playagian();
            return true;
        }
    }

    return false;
}

function makered(index){

    for(let i=0;i<win[index].length;i++){
        document.querySelector(`.class${win[index][i]}a`).classList.add("win");
    }

}

function removeevent(){

    for(let i = 1 ; i < 10 ; i++){

        const first=document.querySelector(`.class${i}a`);
        first.removeEventListener("click", handleUserClick);
    }

}

function playagian(){

    document.querySelector('.reset-div').innerHTML = `<button onclick="startAgain();">Play again</button>`;

}

function resetGame(){

    count2=0;
    array = [1,2,3,4,5,6,7,8,9];
    document.querySelector('.reset-div').innerHTML = "";
    if( state === "X") {
        document.querySelector(".whoseturn").innerHTML = `Its cross's turn`;
    }else {
        document.querySelector(".whoseturn").innerHTML = `Its circle's turn`;
    }

    for( let i = 1 ; i < 10 ; i++ ){
        const boxes = document.querySelector(`.class${i}a`);
        boxes.innerHTML = "";
        boxes.classList.remove("win");
    }

}

function startAgain(){

    resetGame();

    if ( state === "O"){
        count = "cross";
        computermove();
    }else {
        count = "cross"
        addEvent();
    }
}
