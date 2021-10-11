function init() {

  var diceRolls = diceSpin();
  console.log(diceRolls);
  for (var i=0; i < diceRolls.length; i++){
    var dice = document.createElement("img");
    dice.src = 'images/dice'+diceRolls[i]+'.jpg';
    dice.setAttribute("height", "200");
    dice.setAttribute("width", "200");

    document.getElementById("dice"+(i+1)).innerHTML = "";
    document.getElementById("dice"+(i+1)).appendChild(dice);
    document.getElementById("sdice"+(i+1)).value = diceRolls[i];
  }
}

function diceSpin() {
  var diceRolls = [];
  for (var i = 0; i < 6; i++){
    let roll = Math.floor(Math.random() * 6) + 1;
    diceRolls.push(roll);
  }
  return diceRolls;
}