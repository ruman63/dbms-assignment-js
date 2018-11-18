require('./set_functions');

const cover =  (fd1, fd2) => fd1.leftSideSet().every(item => fd1.closureSet(item).issubset(fd2.closureSet(item)));

const equivalence =  (fd1,fd2) => cover(fd1,fd2) && cover(fd2,fd1);

function minimalCover(fdSet) {
    // Split the dependencies
    fdSet.replaceItems(
        Array.from(fdSet).reduce(
            (set, {lhs, rhs}) => set.concat(Array.from(rhs).map(attr => ({lhs, rhs:attr}))),
            [] 
        )
    );
    
    // Reduce Right side
    Array.from(fdSet).forEach( ({lhs, rhs}) =>  {
        fdSet.remove(lhs,rhs);
        if ( ! (new Set(rhs)).issubset(fdSet.closureSet(lhs)) ) {
            fdSet.add(lhs, rhs);
        }
    });
    
    // Reduce Left side
    let compositeLhsFds = Array.from(fdSet).filter(({lhs}) => lhs.length > 1)
    compositeLhsFds.forEach( ({lhs, rhs}) => {
        lhsClosure = fdSet.closureSet(lhs);
        fdSet.remove(lhs,rhs);
        reducedLhs = Array.from(lhs).find(attr => lhsClosure.equals(fdSet.closureSet(attr)));
        fdSet.add(reducedLhs || lhs,rhs);
    });

    return fdSet;
}

function isPartialDependency(fdItem, candidates, nonPrimes) {
    const {lhs, rhs} = fdItem;

    if( ! (new Set(rhs)).intersection(new Set(nonPrimes)) ) {
        return false;
    }

    return candidates.some(
        key => !(new Set(key).equals(new Set(lhs))) && new Set(lhs).intersection(new Set(key)) 
    );
}

function hasPartialDependency(relation) {
    candidates = relation.candidateKeys();
    primes = candidates.map(keys => keys.join('')).join('').split('');
    nonPrimes = Array.from(relation.attributes()).filter(attr => primes.includes(attr));

    return Array.from(relation.fdSet).some( fdItem => isPartialDependency(fdItem, candidates, nonPrimes)) ;
}

const isFirstNF = () => true;

const isSecondNF = (relation) => isFirstNF(relation) && !hasPartialDependency(relation);

function isThirdNF(relation) {
    primes = relation.candidateKeys().map(keys => keys.join('')).join('').split('');

    if(! isSecondNF(relation)) {
        return false;
    }

    return Array(relation.fdSet).every(({lhs, rhs}) => {
        return (new Set(rhs)).issubset(new Set(lhs)) 
            || relation.validKey(lhs) 
            || (new Set(rhs)).issubset(new Set(primes));
    });
}

function isBCNF(relation) {

    if(! isThirdNF(relation)) {
        return false;
    }

    return relation.fdSet.leftSideSet().every(lhs => relation.validKey(lhs));
}


module.exports = {
    cover,
    equivalence,
    minimalCover,
    isPartialDependency,
    hasPartialDependency,
    isFirstNF,
    isSecondNF,
    isThirdNF,
    isBCNF
};