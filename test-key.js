"use strict"

const node = {
	ranght: '12, 15',
	innerHTML: '// je suis un commentaire'
}

const dogs = new Map();

dogs.set('snickers', 3)
dogs.set('sunny', 3)
dogs.set('Hugo', 3)

const range = 3;
console.log(dogs.has(range));

dogs.forEach((val, key) => console.log(val, key));
