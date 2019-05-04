export const isBoxModelStyle = (key: string, value: any) =>
  key.match(/^(margin)|(padding)/) && typeof value === "string";

const matchBoxModel = (value: string) => value.match(/\d+(px|in|mm|cm|pt|%)?/g);

// Transforms shorthand margin and padding values
export const processBoxModel = (key: string, value: any) => {
  const match = matchBoxModel(value);

  if (match) {
    if (key.match(/.Top/)) {
      return match[0];
    } else if (key.match(/.Right/)) {
      return match[1] || match[0];
    } else if (key.match(/.Bottom/)) {
      return match[2] || match[0];
    } else if (key.match(/.Left/)) {
      return match[3] || match[1] || match[0];
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};
