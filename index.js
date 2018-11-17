require('./assets/set_functions')
const dbms = require('./assets/dbms')
const FunctionalDependencySet = require('./assets/FunctionalDependencySet')
const Relation = require('./assets/Relation')
const Prompt = require('readline-sync')

let attributes = Prompt.question("Enter Relation Attributes: ")

let fdString = Prompt.question("Functional Dependencies (LHS and RHS seperated by '->' and each FD seperated by ','): ")
let fd = new FunctionalDependencySet(fdString.split(','))
let relation = new Relation(attributes, fd)
console.log("\n")
console.log(relation.toString())
console.log("\n")

console.log('Candidate Keys: ' +  relation.candidateKeys().map(item => item.join('')).toString() )

let closureAtrributes = Prompt.question("Attributes to find Closure: ")
let closure = relation.closureSet(closureAtrributes)
console.log("Closure of " + closureAtrributes + " : " + Array.from(closure).join(',') )

console.log("Relation is 1NF?  " + (dbms.isFirstNF(relation) ? 'Yes':'No'))
console.log("Relation is 2NF?  " +  (dbms.isSecondNF(relation) ? 'Yes' : 'No'))
console.log("Relation is 3NF?  " + (dbms.isThirdNF(relation) ? 'Yes' : 'No'))
console.log("Relation is BCNF?  " + (dbms.isBCNF(relation) ? 'Yes' : 'No'))