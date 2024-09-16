// Task 1
var dairy = ['cheese', 'sour cream', 'milk', 'yogurt', 'ice cream', 'milkshake'];

function logDairy() {
    for (var food of dairy) {
        console.log(food);
    }
}
logDairy();
// Task 2
const animal = {
    canJump: true
};

const bird = Object.create(animal);
bird.canFly = true;
bird.hasFeathers = true;

function birdCan() {
    for (const key of Object.keys(bird)) {
        console.log(key, ": ", bird[key]);
   } 
}
birdCan();
// Task 3

function animalCan() {
    for (const prop in bird) {
        console.log(prop, ": ", bird[prop]);
    }
}
animalCan()
