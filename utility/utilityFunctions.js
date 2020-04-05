export const isInputEmpty = input => {
    return input === null
}

export const isNameValid = name => {
    const fullNameRegex = /(?=^.{0,40}$)^[α-ωΑ-Ω-a-zA-Z]+\s[α-ωΑ-Ω-a-zA-Z]+$/;
    return fullNameRegex.test(name);
}

export const isAddressValid = address => {
    const addressRegex = /(?=^.{0,100}$)^[^*@#$%^&*()!<>|\\\/!]+$/;
    return addressRegex.test(address);
}