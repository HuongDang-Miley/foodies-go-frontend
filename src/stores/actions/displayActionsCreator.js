export const converRatingToStar = (num) => {
    if (num === 1) {
        return 'stars/1-star.svg'
    }
    if (num > 1 && num < 2) {
        return 'stars/1.5-stars.svg'
    }
    if (num === 2) {
        return 'stars/2-stars.svg'
    }
    if (num > 2 && num < 3) {
        return 'stars/2.5-stars.svg'
    }
    if (num === 3) {
        return 'stars/3-stars.svg'
    }
    if (num > 3 && num < 4) {
        return 'stars/3.5-stars.svg'
    }
    if (num === 4) {
        return 'stars/4-stars.svg'
    }
    if (num > 4 && num < 5) {
        return 'stars/4.5-stars.svg'
    }
    if (num === 5) {
        return 'stars/5-stars.svg'
    }
    return 'stars/0-star.svg'
}

export const convertPriceLevel = (num) => {
    if (num === undefined) { return '$' }
    if (Number(num) === 1) { return '$' }
    if (Number(num) === 2) { return '$$' }
    if (Number(num) === 3) { return '$$$' }
    if (Number(num) === 4) { return '$$$$' }
}


export const upperCaseFirstChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}