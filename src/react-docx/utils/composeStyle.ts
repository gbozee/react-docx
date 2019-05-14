export function composeStyle(styleObj: { [x: string]: any } = {}, node: any) {
  for (let key in styleObj) {
    let value = styleObj[key];
    if (typeof value === "boolean") {
      node[key]();
    } else if (typeof value === "string" || typeof value === "number") {
      if (key === "color") {
        let v = value as string;
        node[key](v.replace("#", ""));
      } else {
        node[key](value);
      }
    } else {
      if (Array.isArray(value)) {
        node[key](...value.map((o: any) => o.replace("#", "")));
      } else {
        node[key](value);
      }
    }
  }
  return node;
}
export default composeStyle;
