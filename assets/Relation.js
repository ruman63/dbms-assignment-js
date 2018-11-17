const combinations = require('combinations')
require('./set_functions')

class Relation {
    constructor(attributes, fdSet = FunctionalDependencySet() ){
        this.__attributes__ = new Set(attributes)
        this.fdSet = fdSet
    }

    attributes(){
        return this.__attributes__
    }

    closureSet(attributes){
        return this.fdSet.closureSet(attributes)
    }

    validKey(attribute){
        return this.closureSet(attribute).equals(this.__attributes__)
    }

    candidateKeys(){
        return combinations(Array.from(this.__attributes__))
            .reduce((keys, possible) => {
                if( this.validKey(possible) && keys.every(key => !(new Set(key)).issubset(new Set(possible))) ){
                    keys.push(possible);
                }
                return keys;
            }, [])
    }

    toString() {
        return "R(" + Array.from(this.__attributes__).join(", ") + "):\n" + this.fdSet.toString()
    }
}

module.exports = Relation