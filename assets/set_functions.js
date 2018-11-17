Set.prototype.issubset = function(otherSet) {
    return Array.from(this).every(item => otherSet.has(item))
}

Set.prototype.equals = function(otherSet) {
    return this.issubset(otherSet) && otherSet.issubset(this);
}

Set.prototype.union = function(otherSet) {
    return Array.from(this).reduce((set, item)=> {
        set.add(item)
        return set
    }, new Set(otherSet))
}

Set.prototype.intersection = function(otherSet) {
    return new Set(
        Array.from(this.union(otherSet)).filter(item => this.has(item) && otherSet.has(item))
    )
}