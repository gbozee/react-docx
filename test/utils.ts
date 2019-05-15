import { document } from "../src/react-docx/node";

function assertText(text: any, container: any) {
  expect(getTextInstance(container, "children").root[1].root[1]).toContain(
    text
  );
}
let options: { [key: string]: string } = {
  bold: "w:b",
  italics: "w:i",
  allCaps: "w:caps",
  smallCaps: "w:smallCaps",
  superScript: "superscript",
  subScript: "subscript",
  underline: "w:u",
  strike: "w:strike",
  doubleStrike: "w:dstrike",
  break: "w:br",
  color: "w:color",
  size: "w:sz",
  font: "w:rFonts",
  style: "w:rStyle",
  "style.p": "w:pStyle",
  align: "w:jc",
  border: "w:pBdr",
  bottom: "w:bottom",
  tab: "w:tab",
  tabs: "w:tabs"
};
function assertTextWithBreak(_text: string, container: any, _styleKey: string) {
  let textNodes = getParagraphChildren(container)
    .root.filter((x: any) => x.rootKey === "w:r")
    .filter((_x: any) => {
      let rootKey = _x.root.map((o: any) => o.rootKey);
      return rootKey.includes(options[_styleKey]);
    });
  expect(textNodes.length).toBeGreaterThan(0);
}

function assertBorder(
  text: string,
  container: any,
  _styleKey: string,
  key = "children"
) {
  let styleKeys = getTextInstance(container, key);
  if (key === "children") {
    styleKeys = styleKeys.root[0];
  }
  let nodes = styleKeys.root
    .filter((x: any) => x.rootKey === options[text])
    .map((x: any) => x.root[0]);
  expect(nodes.length).toBeGreaterThan(0);
  expect(nodes[0].rootKey).toEqual(options[_styleKey]);
}
function allStyleKeys(arr: Array<any>, subKey?: any) {
  return arr
    .map((x: any) => (subKey ? x.root[0].root.val : x.rootKey))
    .filter((x: string) => !x.endsWith("Cs"));
}
function assertTextIn(text: any, container: any) {
  let textNodes = getParagraphChildren(container)
    .root.filter((x: any) => x.rootKey === "w:r")
    .map((x: any) => x.root[x.root.length - 1].root[1].trim());
  expect(textNodes).toContain(text);
}
function assertValueForNodeWithStyle(
  style: string,
  container: any,
  _value: any,
  key = "children"
) {
  let styleKeys = getTextInstance(container, key);
  let specificNode = [];
  if (key === "children") {
    styleKeys = styleKeys.root[0];
  }
  specificNode = styleKeys.root
    .filter(
      (x: any) => !x.rootKey.endsWith("Cs") && x.rootKey === options[style]
    )
    .map((x: any) => x.root[0].root);
  expect(specificNode.length).toBeGreaterThan(0);
  expect(specificNode[0]).toEqual(_value);
}
function assertContainStyle(
  text: string,
  container: any,
  key?: any,
  subKey?: any
) {
  let styleKeys = getTextInstance(container, "children");
  if (key) {
    styleKeys = styleKeys[key];
  } else {
    styleKeys = styleKeys.root[0];
  }
  let result = allStyleKeys(styleKeys.root, subKey);
  expect(result).toContain(options[text]);
}
function getTextInstance(container: any, key?: string) {
  let paragraph = getParagraphChildren(container);
  let result: { [key: string]: any } = {
    children: paragraph.root[1],
    properties: paragraph.properties
  };
  if (key) {
    return result[key];
  }
  return result;
}
function getParagraphChildren(container: any) {
  return container.document.body.root[0];
}
async function renderToString(
  element: any,
  callback: { (container: any): void; (arg0: any): void }
) {
  let renderer = document(element);
  await renderer.toString();
  callback(renderer.container);
  return renderer;
}

export {
  assertBorder,
  getParagraphChildren,
  getTextInstance,
  assertContainStyle,
  assertValueForNodeWithStyle,
  assertText,
  assertTextWithBreak,
  assertTextIn,
  options,
  renderToString
};
