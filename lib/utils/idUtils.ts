const generateUniqueShortId = () => {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 10); // 8 characters
    return timestamp + randomString;
}

function generateUniqueNumericId() {
    const min = Math.pow(10, 7); // 10 million
    const max = Math.pow(10, 8) - 1; // 99 million (8-digit number)
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber.toString();
}


export { generateUniqueShortId, generateUniqueNumericId }