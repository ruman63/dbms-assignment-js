class FunctionalDependencySet {

    constructor(array = []){
        this.__items__ = new Set(array.map(item => item.split('->')))
    }

    *[Symbol.iterator](){
        return () => {
            let items = this.__items__
            return {
                next:() => items.pop(),
                done: items.length,
            }
        }
    } 

    add(lhs, rhs) {
        this.__items__.add([lhs,rhs])
    }

    remove(lhs, rhs) {
        this.__items__.remove([lhs, rhs])
    }

    leftSideSet() {
        return Array.from(this.__items__).map(([lhs,rhs]) => lhs)
    }

    rightSideSet() {
        return Array.from(this.__items__).map(([lhs, rhs]) => rhs)
    }

    closureSet(attributes) {
        let closure = new Set(attributes)

        this.__items__.forEach(
            () => this.__items__.forEach(([lhs, rhs]) => {
                if ( lhs.split('').every(item => closure.has(item)) ) {
                    rhs.split('').forEach(attr => closure.add(attr))
                }
            })
        )

        return closure
    }

    toString(){
        return "FD = {\n\t" + 
            Array.from(this.__items__).map(item => item.join('->')).join(",\n\t") + 
        "\n}"
    }
}

module.exports = FunctionalDependencySet