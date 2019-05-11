const getMethods = (obj: { [x: string]: any }) => {
  let properties = new Set();
  let currentObj = obj;
  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item));
  } while ((currentObj = Object.getPrototypeOf(currentObj)));
  return Array.from(properties.keys()).filter(
    item => typeof obj[item] === "function"
  );
};

export default getMethods;
