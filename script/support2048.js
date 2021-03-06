function getPosLeft(x, y){
return (20 +120 * y) +"px";
}
function getPosTop(x, y){
return (20 + 120 * x) + "px";
}

function getBackgroundColor(num){
    switch(num){
        case 2: return "#eee4da";break;
        case 4: return "#ede0c8";break;
        case 8: return "#f2b179";break;
        case 16: return "#f59563";break;
        case 32: return "#f67c5f";break;
        case 64: return "#f65e3d";break;
        case 128: return "#edcf72";break;
        case 256: return "#edcc61";break;
        case 512: return "#9c0";break;
        case 1024: return "#33b5e5";break;
        case 2048: return "#09c";break;
        case 4096: return "#a6c";break;
        case 8192: return "#93c";break;
    }
    return "#000";
}
function getColor(num){
    if(num <= 4){
        return "#776e65";
    }else{
        return "#fff";
    }
}
function nospace(){
    for(let i = 0; i < 4; i ++){
        for(let j = 0; j < 4; j ++){
            if(board[i][j] == 0)return false;
        }
    }return true;
}
function canMoveLeft(board){
    for(let i = 0; i < 4; i ++){
        for(let j = 1; j < 4; j ++){
            if(board[i][j] != 0){
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveRight(board){
    for(let i = 0; i < 4; i ++){
        for(let j = 0; j < 3; j ++){
            if(board[i][j] != 0){
                if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for( let i = 1; i < 4; i ++ ){
        for( let j = 0; j < 4; j ++ ){
            if(board[i][j] != 0 ){
                if(board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for( let i = 2; i >= 0; i -- ){
        for( let j = 0; j < 4; j ++){
            if( board[i][j] != 0){
                if(board[i+1][j] == 0 || board[i+1][j] == board[i][j] ){
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal(row ,col1, col2, board){
  for(let i = col1+1; i < col2; i ++){
      if(board[row][i] != 0){
          return false;
      }
  }return true;
}

function noBlockVertical(col, row1, row2,  board ){
    for(let i = row1 + 1; i < row2; i ++){
        if(board[i][col] != 0){
            return false;
        }
    }
    return true;
}

function nomove(board){
    if(canMoveLeft(board) || 
        canMoveRight(board) ||
        canMoveUp(board) || 
        canMoveDown(board)){
            return false;
        }
        return true;
}