function uniqueId(length = 32, checkNode = false) {
    let idString;

    length = length < 0 ? 32 : length;

    const createId = function() {
        let idString = "";
        do {
            let ascicode = Math.floor((Math.random() * 42) + 48);
            if (ascicode < 58 || ascicode > 64) {
                let randomChar = String.fromCharCode(ascicode);
                randomChar = Math.random() < 0.5 ? randomChar.toLowerCase() : randomChar;
                idString += randomChar;
            }
        } while (idString.length + 1 <= length);
        return idString;
    }

    let att = 1,
        maxAtt = 100;
    do {
        idString = createId();
        att++;
    }
    while (document.getElementById(idString) && checkNode && att <= maxAtt)

    return (idString);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}