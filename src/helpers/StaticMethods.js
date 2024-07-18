function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function getRandomFromList(list) {
    return list[Math.floor((Math.random() * list.length))];
}

export {
    getRandomInt,
    getRandomFromList
}