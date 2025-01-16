const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
  constructor(fieldArr){
        this.field = fieldArr;
        this.currentX = 0;
        this.currentY = 0;
        this.getCurrentIndex();
    }

   

    getCurrentIndex(){
      for (let y = 0; y < this.field.length; y++) {
        for (let x = 0; x < this.field.length; x++) {
         if(this.field[y][x] === '*'){
           this.currentX = x;
           this.currentY = y;
         }
      }
    }

  }

  wayChoice(){
   let way = prompt('Whitch way?: ')


  if(way === 'w'){
    this.currentY-=1;
  }else if(way === 's'){
    this.currentY += 1;
  }else if (way === 'a'){
    this.currentX -= 1;
  }else if(way === 'd'){
    this.currentX += 1;
  }else if(way === 'e'){
    process.exit();
  }else{
    console.log('Incorrect input');
  }

  }

movePlayer(){
  
  if(
    this.currentY < 0 ||
    this.currentY >= this.field.length ||
    this.currentX < 0 ||
    this.currentX >= this.field[0].length
  ){
    console.log('Out of bounds! Game over!');
      process.exit();
  }


if(this.field[this.currentY][this.currentX] === hole){
    console.log('You fell into a hole! Game over!');
      process.exit();
  }

  if (this.field[this.currentY][this.currentX] === hat) {
    console.log('Congratulations, you found your hat!');
    process.exit();

  }

  this.field.forEach(row => {
    row.forEach((char, index) => {
      if (char === pathCharacter) row[index] = fieldCharacter;
    });
  });


  this.field[this.currentY][this.currentX] = pathCharacter;
}





static generateField(height, width, holePercentage) {
  let field = [];
  for (let y = 0; y < height; y++) {  
    let row = [];
    for (let x = 0; x < width; x++) {  
      row.push(fieldCharacter);
    }
    field.push(row);
  }
  let playerX = Math.floor(Math.random() * width);
  let playerY = Math.floor(Math.random() * height);
  field[playerY][playerX] = pathCharacter;
  
  const hatX = Math.floor(Math.random() * width);
  const hatY = Math.floor(Math.random() * height);
  field[hatY][hatX] = hat;

  const totalCells = height * width;
  const holeCount = Math.floor((holePercentage / 100) * totalCells);
  let placedHoles = 0;

  while (placedHoles < holeCount) {
    const holeX = Math.floor(Math.random() * width);
    const holeY = Math.floor(Math.random() * height);

    if (field[holeY][holeX] !== hat && field[holeY][holeX] !== hole) {
      field[holeY][holeX] = hole;
      placedHoles++;
    }
  }

  return new Field(field);  
}


  print(){
    this.field.forEach(row => {
        console.log(row.join(''));
    });
    
}
}

let height = parseInt(prompt('Enter the field height: '));
let width = parseInt(prompt ('Enter the field width: '));
let holePercentage = parseInt(prompt('Enter the hole percentage (0-100): '));

let myField = Field.generateField(height,width,holePercentage);
/*
const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);
*/

  myField.print();

  while (true) {
    myField.wayChoice();
    myField.movePlayer();
    myField.print();
  }
 





