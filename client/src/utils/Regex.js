const Regex = {
    ageRegex: /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/,
    zipRegex: /^[0-9]{5}$/,
    checkphone: /^[0-9]{10}$/,
    checkAge: /^[0-9]*$/,
    checkWeight: /^[0-9]*$/
}
export { Regex };