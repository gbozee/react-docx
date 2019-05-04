export const isBorderStyle = (key: string, value: any) =>
  key.match(/^border/) && typeof value === 'string';

const matchBorderShorthand = (value: string) =>
  value.match(/(\d+(px|in|mm|cm|pt)?)\s(\S+)\s(\S+)/);

// Transforms shorthand border values
export const processBorders = (key: string, value: any) => {
  const match = matchBorderShorthand(value);

  if (match) {
    if (key.match(/.Color/)) {
      return match[4];
    } else if (key.match(/.Style/)) {
      return match[3];
    } else if (key.match(/.Width/)) {
      return match[1];
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};
