/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
   ];
   
   
   
   /*---------------------------- Variables (state) ----------------------------*/
   let board=['','','','','','','','',''];
   let turn = 'X';
   let winner=false;
   let tie=false ;
   
   
   /*------------------------ Cached Element References ------------------------*/
   const squareEles = document.querySelectorAll('.sqr');
   const messageEl  = document.querySelector('#message');
   const resetButton = document.querySelector('#reset');
   /*-------------------------------- Functions --------------------------------*/
   
   const updateBoard =()=>{
       board.forEach((value ,index)=>{
          const square = squareEles[index];
          square.textContent=value;   
          if(value==='X'){
              square.style.color='blue';
          }
          else if(value==='O'){
              square.style.color='red';
          }
          else {
              square.style.color='none';
          }
      
      
       })
       
      
      }
      
      const updateMessage =()=>{
      if(winner===false && tie===false){
          messageEl.textContent= `it's ${turn}'s turn`;
      }
      else if (winner===false && tie===true){
       messageEl.textContent=`It's a tie!`;
      
      }
      else{
      
          messageEl.textContent= `Player ${turn} wins!`;
      }
      
      
       
      
      }
   
   
   
   
   
   
   const render =()=>{
   
   updateBoard();
   updateMessage();
   
   }
   
   
   const init = () => {
       board = ['', '', '', '', '', '', '', '', ''];
       turn = 'X';
       winner = false;
       tie = false;
    
       render();
   
       
   }
   
   
   
   
   
   
   
   const placePiece=(index)=>{
   
   board[index]=turn;
   }
   
   
   const checkForWinner=()=>{
       for(let win of winningCombos){
           const first = win[0];
           const second = win[1];
           const third = win[2];
   
           if(board[first]===turn && board[second]===turn && board[third]===turn &&board[first]!==''&& board[second]!=='' && board[third]!==''){
               winner=true;
               return;
           }
   
       }
      
   
   }
   
   
   const checkForTie=()=>{
       for(let tied of winningCombos){
           const first = tied[0];
           const second = tied[1];
           const third = tied[2];
   
           if(board[first]===turn && board[second]===turn && board[third]===turn &&board[first]!==''&& board[second]!=='' && board[third]!==''){
               winner=true;
               return;   
           }
           if(board.some((value)=>value==='')){
               tie=false;
           }
           else{
               tie=true;
           }
   
       }
      
   
   }
   
   
   const switchPlayerTurn=()=>{
   
       if(winner===true){
           return;
       }
       else if(turn==='X'){
   
           turn="O";
       }
       else{
           turn="X";
       }
   
   
   }
   
   const reset =()=>{
     
     resetButton.addEventListener('click',init);
   }
   
   const handleClick=(event)=>{
       const squareIndex=event.target.id;
       if(board[squareIndex]==="X"||board[squareIndex]==="O"||winner===true){
   
           return;
       }
        
       placePiece(squareIndex);
   
       checkForWinner();
   
       checkForTie();
   
       switchPlayerTurn();
   
       render();
   
       reset();
   
   }
   
   
   
   /*----------------------------- Event Listeners -----------------------------*/
   squareEles.forEach((sqElement)=>{
   sqElement.addEventListener('click',handleClick)
   
   })
   