export function composeStyle(styleObj: { [x: string]: any } = {}, node: any) {
  for (let key in styleObj) {
    let value = styleObj[key];
    if (typeof value === "boolean") {
      node[key]();
    } else if (typeof value === "string") {
      node[key](value);
    } else {
      node[key](value);
    }
  }
  return node;
}
export default composeStyle;
