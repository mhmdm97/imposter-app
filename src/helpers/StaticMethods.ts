function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function getRandomFromList<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

export { getRandomInt, getRandomFromList };
