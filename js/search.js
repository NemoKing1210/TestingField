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

function randomString() {


    var words1 = ["Товарищи,", "С другой стороны", "..."];
    var words2 = ["реализация намеченных плановых заданий", "..."];
    var words3 = ["играет важную роль в формировании", "..."];
    var words4 = ["существенных финансовых ..."];

    var rand1 = Math.floor(Math.random() * words1.length);
    var rand2 = Math.floor(Math.random() * words2.length);
    var rand3 = Math.floor(Math.random() * words3.length);
    var rand4 = Math.floor(Math.random() * words4.length);
    var phrase = words1[rand1] + " " + words2[rand2] +
        " " + words3[rand3] + " " + words4[rand4] + "!";

    return phrase;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}