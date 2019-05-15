import warning from "./warning";

export enum DefaultStyle {
  HEADING1 = "heading1",
  HEADING2 = "heading2",
  HEADING3 = "heading3",
  HEADING4 = "heading4",
  HEADING5 = "heading5",
  TITLE = "title"
}

export enum AlignmentTypes {
  Left = "left",
  Right = "right",
  Center = "center",
  Justified = "justified"
}

export function composeStyle(styleObj: { [x: string]: any } = {}, node: any) {
  for (let key in styleObj) {
    let value = styleObj[key];
    if (typeof value === "boolean") {
      node[key]();
    } else if (typeof value === "string" || typeof value === "number") {
      if (key === "color") {
        let v = value as string;
        node[key](v.replace("#", ""));
      } else if (key === "heading") {
        if (Object.values(DefaultStyle).includes(value)) {
          node[value]();
        } else {
          warning(
            !Object.values(DefaultStyle),
            `The heading attributes should consist of either ${Object.values(
              DefaultStyle
            )}`
          );
        }
      } else if (key === "align") {
        if (Object.values(AlignmentTypes).includes(value)) {
          node[value]();
        } else {
          warning(
            !Object.values(AlignmentTypes),
            `The align attributes should consist of either ${Object.values(
              AlignmentTypes
            )}`
          );
        }
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
