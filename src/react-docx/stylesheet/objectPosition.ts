export const isObjectPositionStyle = (key: string, value: any) =>
  key.match(/^objectPosition/) && typeof value === "string";

const matchObjectPosition = (value: string) =>
  value.match(/\d+(px|in|mm|cm|pt|%)?/g);

// Transforms shorthand objectPosition values
export const processObjectPosition = (key: string, value: any) => {
  const match = matchObjectPosition(value);

  if (match) {
    if (key.match(/.X/)) {
      return match[0];
    } else if (key.match(/.Y/)) {
      return match[1];
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};
