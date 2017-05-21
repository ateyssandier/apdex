function genTaker(n) {
    return arr => arr.slice(0, n)
}

export const take25 = genTaker(25)

export const take5 = genTaker(5)