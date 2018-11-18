require('./assets/set_functions'); // Set prototype functions
const dbms = require('./assets/dbms'); // dbms Functions modules
const FunctionalDependencySet = require('./assets/FunctionalDependencySet'); //FunctionalDependencySet class
const Relation = require('./assets/Relation'); //Realtion Class
const Prompt = require('readline-sync'); // for easy prompts

// prompt User for Relation Atributes
let attributes = Prompt.question("Enter Relation Attributes: ");
// expecting user to give input like "ABCDEF"

//prompt User for set of FDs
let fdString = Prompt.question("Functional Dependencies (LHS and RHS seperated by '->' and each FD seperated by ','): ");
// expecting user to give something like "A->BC,AB->DE,C->A,E->B"

let fd = new FunctionalDependencySet(fdString.split(',')); //construct Fd by splitting the input into a list
let relation = new Relation(attributes, fd);

// Print Relation
console.log("\n");
console.log(relation.toString());
console.log("\n");

// Print minimal Cover
let minimalCover = dbms.minimalCover(fd);
console.log('Minimal Cover:');
console.log(minimalCover.toString());

// print candidate Keys in string form
console.log('Candidate Keys: ' +  relation.candidateKeys().map(item => item.join('')).toString() );

// Prompt attributes to calculate Closure for
let closureAtrributes = Prompt.question("Attributes to find Closure: ");
let closure = relation.closureSet(closureAtrributes);
console.log("Closure of " + closureAtrributes + " : " + Array.from(closure).join(',') );

// Print Normal Form checks
console.log("Relation is 2NF?  " +  (dbms.isSecondNF(relation) ? 'Yes' : 'No'));
console.log("Relation is 3NF?  " + (dbms.isThirdNF(relation) ? 'Yes' : 'No'));
console.log("Relation is 1NF?  " + (dbms.isFirstNF(relation) ? 'Yes':'No'));
console.log("Relation is BCNF?  " + (dbms.isBCNF(relation) ? 'Yes' : 'No'));