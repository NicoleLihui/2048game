let score = 0;
let board = new Array();
let conflicted = new Array();
// 应该是一个二维数组，数组下标与棋盘格编号一一对应
$(document).ready(function(){
    prepareForMobile();
    newGame();
});

function newGame(){
    // 1 初始化棋盘格；
    // 2 第一次初始化数组 添加棋盘格中；3 每次重新给棋盘格填数字（数组有变化），样式的变化
    init();
    generateOneNum();
    generateOneNum()
    // 4 随机数生成两个
}

function prepareForMobile(){
    if (documentWidth > 500) {
        gridContainerWidth = "460px",
        cellSideLength = "100px",
        cellSpace = "20px";
    }
    $("#grid-container").css("width",gridContainerWidth-2*cellSpace);
    $("#grid-container").css("height",gridContainerWidth-2*cellSpace);
    $("#grid-container").css("padding",cellSpace);
    $("#grid-container").css("border-radius",0.02*gridContainerWidth);
    
    $(".grid-cell").css("width",cellSideLength);
    $(".grid-cell").css("height",cellSideLength);
    $(".grid-cell").css("border-radius",0.02*cellSideLength);
}

function init(){
    for(let i = 0; i < 4; i ++){
        for(let j = 0; j < 4; j ++){
            let gridCell = document.getElementById(`grid_cell_${i}_${j}`);
            gridCell.style.left = getPosLeft(i, j);
            gridCell.style.top = getPosTop(i, j) ;
        }
    }
    for(let i = 0; i < 4; i ++){
        board[i] = new Array();
        conflicted[i] = new Array();
        for(let j = 0; j < 4; j++){
            board[i][j] = 0;
            conflicted[i][j] = false;
        }
    }
    
    score = 0;
    updateScore(score);
    updateBoardView();
    
}
function updateBoardView(){
    // 删除原来在页面中的number-cell，重新添加
    if(document.getElementsByClassName("number-cell")){
                let numCell = document.getElementsByClassName("number-cell");
                for(let i = 0; i < numCell.length; i ++){
                    numCell[i].parentNode.removeChild(numCell[i]);
                    i--;
                }
            }
    for(let i = 0; i < 4; i ++){
        for(let j = 0; j < 4; j ++){
            
            // 根据新的board数组重新添加创造number-cell元素
            let container = document.getElementById("grid-container");
            let numCell = document.createElement('div');
            numCell.setAttribute("id", `number_cell_${i}_${j}`);
            numCell.setAttribute("class","number-cell");
            let num = document.createTextNode(board[i][j]);
            numCell.appendChild(num);
            container.appendChild(numCell);
            // 给number-cell添加位置，根据board值添加样式
            if(board[i][j] == 0){
                numCell.style.width = "0";
                numCell.style.height = "0";
                numCell.style.display = "none";
                numCell.style.left = getPosLeft(i, j)+cellSideLength/2;
                numCell.style.top = getPosTop(i, j)+cellSideLength/2;
            }
            if(board[i][j] != 0){
                numCell.style.width = cellSideLength ;
                numCell.style.height = cellSideLength ;
                numCell.style.left = getPosLeft(i, j) ;
                numCell.style.top = getPosTop(i, j) ;
                numCell.style.backgroundColor = getBackgroundColor(board[i][j]);
                numCell.style.color = getColor(board[i][j]);
                // numCell.style.fontSize = 0.6*cellSideLength;
            }
            conflicted[i][j] = false;
        }
    }
    $(".number-cell").css( 'line-height',cellSideLength + "px" );
    $(".number-cell").css( 'font-size',0.6*cellSideLength + "px" );

}

function generateOneNum(){
    if(nospace())return false;
    
    let randx = Math.floor(Math.random()*4);
    let randy = Math.floor(Math.random()*4);

    let times = 0;
    while(times < 50){
        if(board[randx][randy] == 0)break;

        randx = Math.floor(Math.random()*4);
        randy = Math.floor(Math.random()*4);
        times ++;
    }

    for( let i = 0 ; i < 4 ; i ++ ){
        for( let j = 0 ; j < 4 ; j ++ ){
            if(board[i][j] == 0 ){
                randx = i;
                randy = j;
            }
        }
    }

    let randNumber = Math.random()>0.5 ? 4 : 2 ;

    board[randx][randy] = randNumber;
    createNumberAnimation(randx, randy, randNumber);
}

document.onkeydown = function(ev){
    switch (ev.keyCode) {
        case 37:
            if (moveLeft()) {
                setTimeout(generateOneNum, 210);
                setTimeout( isGameOver, 300 );
            }
            break;
        case 38:
            if (moveUp()) {
                setTimeout(generateOneNum, 210);
                setTimeout( isGameOver, 300 );
            }
            break;
        case 39:
            if (moveRight()) {
                setTimeout(generateOneNum, 210);
                setTimeout( isGameOver, 300 );
            }
            break;
        case 40:
            if (moveDown()) {
                setTimeout(generateOneNum, 210);
                setTimeout( isGameOver, 300 );
            }
            break;
        default:
            break;
    }
}
function isGameOver() {
    if(nospace(board) && nomove(board)){
        gameover();
        return true;
    }
    return false;
}
function gameover(){
    alert(`Game Over！你的最终得分：${score}`);
}
function moveLeft() {
    if (!canMoveLeft(board))return false;
     
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                
                for (let k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        // Move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        
                        continue;
                    }else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !conflicted[i][k] ) {
                        // move
                        showMoveAnimation(i,j,i,k);
                        // add
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore( score );
                        conflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}
function moveRight() {
    if (!canMoveRight(board)) return false;

    for (let i = 0; i < 4; i++) {
        for (let j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {

                for (let k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !conflicted[i][k]) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore( score );
                        conflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board))return false;

    for( let j = 0; j < 4; j ++){
        for( let i = 1; i < 4; i ++ ){
            if( board[i][j] != 0 ){

                for( let k = 0; k < i; k ++ ){
                    if( board[k][j] == 0 && noBlockVertical(j, k, i, board) ){
                        showMoveAnimation(i, j, k, j);

                        board[k][j] = board[i][j];
                        board[i][j] = 0; 
                        continue;
                    }else if( board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !conflicted[k][j] ){
                        showMoveAnimation(i, j, k, j);

                        board[k][j] *= 2;
                        board[i][j] = 0; 
                        score += board[k][j];
                        updateScore( score );
                        conflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
setTimeout( "updateBoardView()" , 200 )
    return true;
}

function moveDown(){
    if(!canMoveDown(board))return false;
    
        for( let j = 0; j < 4; j ++ ){
            for( let i = 2; i >= 0; i -- ){
                if(board[i][j] != 0){

                    for( let k = 3; k > i; k -- ){
                        if( board[k][j] == 0 && noBlockVertical(  j, i, k,board) ){
                            showMoveAnimation(i, j, k, j);

                            board[k][j] = board[i][j];
                            board[i][j] = 0; 
                            continue;
                        } else if (board[k][j] == board[i][j] && noBlockVertical( j , i , k , board) && !conflicted[k][j]) {
                            showMoveAnimation(i, j, k, j);

                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            score += board[k][j];
                            updateScore( score );
                            conflicted[k][j] = true;
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout( updateBoardView , 200 )
        return true;
}

//出现了连环加法的情况 
// 出现了上下分数累加不响应，左右正常累加的情况
// 出现了数组没有清除干净导致出现多于16个number-cell情况（i--）