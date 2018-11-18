class FunctionalDependencySet {

    constructor(array = []){
        this.$items = new Set(array.map(item => {
            const [lhs, rhs] = item.split('->');
            return {lhs, rhs};
        }));
    }

    [Symbol.iterator](){
        return this.$items.values();
    } 

    add(lhs, rhs) {
        this.$items.add({lhs,rhs});
    }

    remove(itemLhs, itemRhs) {
        let item = Array.from(this.$items).find(({lhs, rhs}) => lhs == itemLhs && rhs == itemRhs);
        return this.$items.delete(item);
    }

    leftSideSet() {
        return Array.from(this.$items).map(({lhs}) => lhs);
    }

    rightSideSet() {
        return Array.from(this.$items).map(({rhs}) => rhs);
    }

    replaceItems(newItems) {
        this.$items = new Set(newItems);
    }

    closureSet(attributes) {
        let closure = new Set(attributes);

        this.$items.forEach(
            () => this.$items.forEach(({lhs, rhs}) => {
                if ( lhs.split('').every(item => closure.has(item)) ) {
                    rhs.split('').forEach(attr => closure.add(attr));
                }
            })
        );

        return closure;
    }

    toString(){
        return "FD = {\n\t" + 
            Array.from(this.$items).map(({lhs,rhs}) => [lhs, rhs].join('->')).join(",\n\t") + 
        "\n}";
    }
}

module.exports = FunctionalDependencySet;