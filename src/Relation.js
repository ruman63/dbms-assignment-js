const combinations = require('combinations');
require('./set_functions');

class Relation {
    constructor(attributes, fdSet = FunctionalDependencySet()) {
        this.$attributes = new Set(attributes);
        this.fdSet = fdSet;
    }

    attributes() {
        return this.$attributes;
    }

    closureSet(attributes) {
        return this.fdSet.closureSet(attributes);
    }

    validKey(attribute) {
        return this.closureSet(attribute).equals(this.$attributes);
    }

    candidateKeys() {
        return combinations(Array.from(this.$attributes))
            .reduce((keys, possible) => {
                if( this.validKey(possible) && keys.every(key => !(new Set(key)).issubset(new Set(possible))) ){
                    keys.push(possible);
                }
                return keys;
            }, []);
    }

    toString() {
        return "R(" + Array.from(this.$attributes).join(", ") + "):\n" + this.fdSet.toString();
    }
}

module.exports = Relation;