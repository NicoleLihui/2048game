function createNumberAnimation(x, y, num){
    let numCell = $("#number_cell_" + x + "_" + y);
    numCell.css("backgroundColor",getBackgroundColor(num));
    numCell.css("color",getColor(num));
    numCell.css("display","block");
    numCell.text(num);

    numCell.animate({
        width: "100px",
        height: "100px",
        left: getPosLeft(x, y),
        top: getPosTop(x, y)
    },50);
}
function showMoveAnimation(fromx, fromy, tox, toy){
    let numCell = $("#number_cell_"+ fromx+"_"+fromy);

    numCell.animate({
        left: getPosLeft(tox),
        top: getPosTop(toy)
    },200)
}
function updateScore(score){
    $("#score").text(score);
}