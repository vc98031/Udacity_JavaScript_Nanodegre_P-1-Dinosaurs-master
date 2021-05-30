// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
	this.species = species;
	this.image = `images/${species.toLowerCase()}.png`;
	this.weight = weight;
	this.height = height;
	this.diet = diet;
	this.where = where;
	this.when = when;
	this.fact = fact;

	this.sayHello = function () {
		// console.log("Hello");
	};
}

// Create Dino Compare Method 1: Comparing weight
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareWeight = function (yourWeight) {
	const diff = Math.trunc(this.weight - yourWeight);
	// console.log("weight Diff", diff)
	return diff > 0
		? `${this.species} was ${diff} lbs heavier than you !!`
		: `${this.species} was ${-diff} lbs lighter than you !!`;
};

// Create Dino Compare Method 2:  Comparing height
Dino.prototype.compareHeight = function (yourHeight) {
	const diff = Math.trunc(this.height - yourHeight);
	// console.log("height Diff", diff)

	return diff > 0
		? `${this.species} was ${diff} lbs longer than you !!`
		: `${this.species} was ${-diff} lbs shorter than you !!`;
};

// Create Dino Compare Method 3 : Comparing diet
Dino.prototype.compareDiet = function (yourDiet) {
	if (yourDiet === this.diet) {
		return `${this.species} is a ${this.diet}. You two can share your meal.`;
	} else if (this.diet === "carnivor") {
		return `${this.species} is a ${this.diet}. You can become its meal.`;
	} else if (this.diet === "herbavor") {
		return `${this.species} is a ${this.diet}. Find it some extra salad for dinner.`;
	} else {
		return `${this.species} is a ${this.diet}. Time to suggest a potluck.`;
	}
};

// Dino data (from dino.json provided in the starter code)
const dinoData = [
	{
		species: "Triceratops",
		weight: 13000,
		height: 114,
		diet: "herbavor",
		where: "North America",
		when: "Late Cretaceous",
		fact: "First discovered in 1889 by Othniel Charles Marsh",
	},
	{
		species: "Tyrannosaurus Rex",
		weight: 11905,
		height: 144,
		diet: "carnivor",
		where: "North America",
		when: "Late Cretaceous",
		fact: "The largest known skull measures in at 5 feet long.",
	},
	{
		species: "Anklyosaurus",
		weight: 10500,
		height: 55,
		diet: "herbavor",
		where: "North America",
		when: "Late Cretaceous",
		fact: "Anklyosaurus survived for approximately 135 million years.",
	},
	{
		species: "Brachiosaurus",
		weight: 70000,
		height: "372",
		diet: "herbavor",
		where: "North America",
		when: "Late Jurasic",
		fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
	},
	{
		species: "Stegosaurus",
		weight: 11600,
		height: 79,
		diet: "herbavor",
		where: "North America, Europe, Asia",
		when: "Late Jurasic to Early Cretaceous",
		fact:
			"The Stegosaurus had between 17 and 22 seperate places and flat spines.",
	},
	{
		species: "Elasmosaurus",
		weight: 16000,
		height: 59,
		diet: "carnivor",
		where: "North America",
		when: "Late Cretaceous",
		fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
	},
	{
		species: "Pteranodon",
		weight: 44,
		height: 20,
		diet: "carnivor",
		where: "North America",
		when: "Late Cretaceous",
		fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
	},
	{
		species: "Pigeon",
		weight: 0.5,
		height: 9,
		diet: "herbavor",
		where: "World Wide",
		when: "Holocene",
		fact: "All birds are living dinosaurs.",
	},
];

// console.log("dinoData", dinoData);

function init() {
	// Create Dino Objects
	const dinoObjects = dinoData.map(
		(dino) =>
			new Dino(
				dino.species,
				dino.weight,
				dino.height,
				dino.diet,
				dino.where,
				dino.when,
				dino.fact
			)
	);

	// console.log("dinoObjects ", dinoObjects);

	// Create Human Object
	const human = new Dino(
		"human",
		60,
		5.5,
		"omnivore",
		"worldwide",
		"now",
		"Humans are the most inteligent species on the planet"
	);

	// Use IIFE to get human data from form
	(function getHumanData() {
		const name = document.getElementById("name").value;
		const weight = document.getElementById("weight").value;
		const height = document.getElementById("feet").value +
		document.getElementById("inches").value / 12;
		const diet = document.getElementById("diet").value.toLowerCase();
		human.name = name;
		human.weight = weight;
		human.height = height
		human.diet = diet;
	})();

	// console.log("human", human);

	if(!validateInput(human.name,human.height,human.weight)){
		alert("All fields mandetory")
		return
	}

	// Add human object at 4th index in dinoObjects array
	dinoObjects.splice(4,0,human);

	// Generate Tiles for each Dino in Array
	const tiles = dinoObjects.map((dino) => {
		const documentFragment = document.createDocumentFragment();
		const containerDiv = document.createElement("div");
		containerDiv.className = "grid-item";

		const img = document.createElement("img");
		img.src = dino.image;

		const title = document.createElement("h3");
		const fact = document.createElement("p");

		if (dino.species === "human") {
			title.innerHTML = human.name;
		} else if (dino.species === "Pigeon") {
			title.innerHTML = dino.species;
			fact.innerHTML = dino.fact;
		} else {
			title.innerHTML = dino.species;
			fact.innerHTML = (_=> {
				let result = "";
				// Generate random number to choose fact from switch
				const randomise = getRandomInt(8);

				switch (randomise) {
					case 1:
						result = dino.compareHeight(human.height);
						break;
					case 2:
						result = dino.compareWeight(human.weight);
						break;
					case 3:
						result = dino.compareDiet(human.diet);
						break;
					case 4:
						result = `The ${dino.species} lived in what is now ${dino.where}.`;
						break;
					case 5:
						result = `The ${dino.species} was found in the ${dino.when}.`;
						break;
					default:
						result = dino.fact;
						break;
				}
				return result;
			})();
		}
		containerDiv.appendChild(title);
		containerDiv.appendChild(img);
		containerDiv.appendChild(fact);
		documentFragment.appendChild(containerDiv);

		return documentFragment;
	});

	// console.log("tiles", tiles)

	// Add tiles to DOM
	const grid = document.getElementById("grid");
	tiles.forEach(tile=>grid.appendChild(tile))
	
	// Remove form from screen
	document.getElementById('dino-compare').innerHTML = "";
}

// Input validator
const validateInput=(name, height, weight)=>{
	return name.length && height.length && weight.length
}

// Get random number from 1 to max
function getRandomInt(max) {
  return 1 + Math.floor(Math.random() * Math.floor(max));
}

// On button click, prepare and display infographic
const submitBtn = document.querySelector("#btn");

submitBtn.addEventListener("click", init);
