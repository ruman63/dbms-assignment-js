# DBMS Relation & Functional Dependencies
This is simulation of various Relation and functional dependencies, written in JavaScript. I have also written another version in [python](https://github.com/ruman63/dbms-assignment.git).

> **Note:** It requires `node` (v10.13) & `npm`/`yarn`

## How to Run?
To run the code just follow the steps below:

```bash
# clone this repository
git clone https://github.com/ruman63/dbms-assignment-js.git
cd dbms-assignment-js

# Download dependencies
npm install

# Execute Program
npm run start
```

## File Structure
```
├── src
│   ├── FunctionalDependencySet.js
│   ├── Relation.js
│   ├── dbms.js
│   └── set_functions.js
├── index.js
├── package.json
└── Readme.md (this file)
```
## Classes
We have two classes:
- `FunctionalDependencySet`
- `Relation`

each class is discussed in detail below.

### FunctionalDependencySet 
>**Path:**  *`src/FunctionalDependencySet.js`*

`FunctionalDependencySet` class contains following methods and properties:
 - **`$items`** *(property)* - is a `Set` of functional dependencies, where each functional dependency is an `object` with `lhs` & `rhs` properies. 
 Example: `Set{ {lhs: 'A', 'rhs':'BCD'}, {lhs: ''} }`

 - **`constructor()`** - initialises the `$items` property accepts an `Array` of `String` which representing a functional dependencies. Default is an empty array.

 - **`add(lhs, rhs)`** - accepts `lhs` and `rhs` strings, and adds functional dependency to the set.

 - **`remove(lhs, rhs)`** - accepts `lhs` and `rhs` strings, and removes functional dependency from the set.

 - **`leftSideSet()`** - returns an `Array` of only `lhs` in functional dependency `Set`.

 - **`rightSideSet()`** - returns `Array` of only `rhs` in functional dependency `Set`.
 
 - **`replaceItems(newItems)`** - accepts `newItems` an `Array` of `object` and replaces items in `$items` Set.
 
 - **`closureSet(attributes)`** - accepts `attribute` as `String` and return closure of `attribute` as `Set`
 
 - **`toString()`** - return string reperesentation of functional dependency.

### Relation 
>**Path:**  *`src/Relation.js`*

`Relation` class contains following methods and properties:
 - **`$attributes`** *(property)* - is a `String` representing th attributes in relation.

 - **`fdSet`** *(property)* - is a `FunctionalDependencySet` object representing the set of functional dependencies in `Relation`.

 - **`attributes()`** - is a getter method that returns `$attributes` property.

 - **`closureSet(attributes)`** - accepts `attributes` as `String`, delegates to `closureSet()` method on its `fdSet` object, and returns the `Set` of closure.

 - **`validKey(attributes)`** - accepts `attributes` and returns `true` if given `attributes` is a valid key, (i.e it can derive the relation).

 - **`candidateKeys()`** - returns a `Set` of valid candidate keys in relation.

 - **`toString()`** - returns `String` reperesentation of Relation.


## DBMS Functions 

>**Path:**  *`src/dbms.js`*

`dbms` module contains following functions:

- **`subset(fdSet1, fdSet2)`** - accepts two `FunctionalDependencySet` objects, `fdSet1` and `fdSet2`, returns `true` if `fdSet1` is a subset of `fdSet2`, else returns `false`.

- **`equivalent(fdSet1, fdSet2)`** - accepts two `FunctionalDependencySet` objects, `fdSet1` and `fdSet2`, returns `true` if `fdSet1` and `fdSet2` are equivalent (i.e `fdSet1` is a subset of `fdSet2` & `fdSet2` is a subset of `fdSet1`), else returns `false`.

- **`minimalCover(fdSet)`** - accepts a `FunctionalDependencySet` object `fdSet`, and returns a `FunctionalDependencySet`, which is a minimal cover of given `fdSet`.

- **`isPartialDependency(fdItem, candidates, nonPrimes)`** - accepts `fdItem` a single object in `FunctionalDependencySet`, a `Set` of candidate keys - `candidates`, and a `Set` of non-prime attributes -  `nonPrimes`. Returns `true` if `fdItem` is a partial dependency (i.e. non-prime attributes depend on a part of a candidate key), else returns `false`. 

- **`hasPartialDependency(fdSet)`** - accepts `FunctionalDependencySet` object `fdSet`. Returns `true` if any one functional dependency is a partial dependency, else returns `false`.

- **`isFirstNF(relation)`** - accepts a `Relation` object - `relation`. Returns `true` always. (as all relations are assumed to be in First Normal Form). 

- **`isSecondNF(relation)`** - accepts a `Relation` object - `relation`. Returns `true` if the `relation` is in Second Normal Form (i.e. it is in First Normal Form and doesn't contain any partial dependency), else returns `false`.

- **`isThirdNF(relation)`** - accepts a `Relation` object - `relation`. Returns `true` if the `relation` is in Third Normal Form (*i.e. every functional dependency `X->Y` in `relation` is either 'trivial' or X is a 'superkey', or Y is a 'prime attribute'*), else returns `false`.

- **`isBCNF(realtion)`** - accepts a `Relation` object - `relation`. Returns `true` if the `relation` is in Boyce-Codd Normal Form (*i.e. for every functional dependency `X->Y` in `relation` X is a superkey*), else returns `false`.

## Main
>**Path:** *`index.js`*

- takes input `attributes` & `fdString` from user.
- constructs `Relation` & `FunctionalDependencySet` objects from inputs.
- prints the `relation`.
- finds and prints the *Minimal Cover*.
- finds and prints the *Candidate Keys*.
- prompts user for `attributes`, finds and prints *Closure Set* of `attributes`.
- prints wether the relation is in First, Second, Third, and Boyce-Codd Normal Form or not.