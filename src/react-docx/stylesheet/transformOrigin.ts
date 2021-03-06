export const isTransformOriginStyle = (key: string, value: any) =>
  key.match(/^transformOrigin/) && typeof value === "string";

const matchTransformOrigin = (value: string) =>
  value.match(/(-?\d+(px|in|mm|cm|pt|%)?)|top|right|bottom|left|center/g);

const transformOffsetKeywords = (value: any) => {
  switch (value) {
    case "top":
    case "left":
      return "0%";
    case "right":
    case "bottom":
      return "100%";
    case "center":
      return "50%";
    default:
      return value;
  }
};

// Transforms shorthand transformOrigin values
export const processTransformOrigin = (key: string, value: any) => {
  const match = matchTransformOrigin(value);

  if (match) {
    let result;

    if (key.match(/.X/)) {
      result = match[0];
    } else if (key.match(/.Y/)) {
      result = match[1] || match[0];
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }

    return transformOffsetKeywords(result);
  }

  return value;
};
