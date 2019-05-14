import React from "react";
import { document, Document, Text, Section } from "../src/react-docx/node";

function assertText(text: any, container: any) {
  expect(getTextInstance(container).root[1].root[1]).toContain(text);
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
  style: "w:rStyle"
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
  _value: any
) {
  let styleKeys = getTextInstance(container).root[0];
  let specificNode = styleKeys.root
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
  let styleKeys = getTextInstance(container);
  if (key) {
    styleKeys = styleKeys[key];
  } else {
    styleKeys = styleKeys.root[0];
  }
  let result = allStyleKeys(styleKeys.root, subKey);
  expect(result).toContain(options[text]);
}
function getTextInstance(container: any) {
  return getParagraphChildren(container).root[1];
}
function getParagraphChildren(container: any) {
  return container.document.body.root[0];
}
describe("Text", () => {
  test("sanity check with Document", async () => {
    const doc = (
      <Document>
        <Text>Hey</Text>
      </Document>
    );
    await renderToString(doc, (container: any) => {
      assertText("Hey", container);
    });
  });
  test("sanity check with Section", async () => {
    const doc = (
      <Section>
        <Text>Hey</Text>
      </Section>
    );
    await renderToString(doc, (container: any) => {
      assertText("Hey", container);
    });
  });
  describe("Text Properties", () => {
    const App = ({ styles = {}, children, ...rest }: any) => (
      <Section>
        <Text {...rest} style={styles}>
          Hey{children}
        </Text>
      </Section>
    );
    test("Bold and Italics", async () => {
      const doc = <App styles={{ italics: true, bold: true }} />;
      await renderToString(doc, (container: any) => {
        assertText("Hey", container);
        assertContainStyle("italics", container);
        assertContainStyle("bold", container);
      });
    });
    test("All Caps and small Caps", async () => {
      const doc = <App styles={{ allCaps: true, smallCaps: true }} />;
      await renderToString(doc, (container: any) => {
        assertText("Hey", container);
        assertContainStyle("smallCaps", container, "properties");
        assertContainStyle("allCaps", container, "properties");
      });
    });
    test("Superscript and Subscript", async () => {
      const doc = <App styles={{ subScript: true, superScript: true }} />;
      await renderToString(doc, (container: any) => {
        assertText("Hey", container);
        assertContainStyle("superScript", container, "properties", true);
        assertContainStyle("subScript", container, "properties", true);
      });
    });
    test("Underline, strike through and Double strike", async () => {
      const doc = <App styles={{ strike: true, doubleStrike: true }} />;
      await renderToString(doc, (container: any) => {
        assertText("Hey", container);
        assertContainStyle("strike", container);
        assertContainStyle("doubleStrike", container);
      });
    });
    test("Break/New line", async () => {
      const doc = (
        <App>
          James <br /> Shola
        </App>
      );

      await renderToString(doc, (container: any) => {
        assertTextIn("Hey", container);
        assertTextIn("James", container);
        assertTextIn("Shola", container);
        assertTextWithBreak("James", container, "break");
      });
    });
    test("underline,color,size,font", async () => {
      const doc = (
        <App
          styles={{
            underline: ["single", "#23d"],
            color: "#abc",
            size: 15,
            font: "Times"
            // characterSpacing: 24
          }}
        />
      );
      await renderToString(doc, (container: any) => {
        assertValueForNodeWithStyle("underline", container, {
          val: "single",
          color: "23d"
        });
        assertValueForNodeWithStyle("color", container, { val: "abc" });
        assertValueForNodeWithStyle("size", container, { val: 15 });
        assertValueForNodeWithStyle("font", container, {
          ascii: "Times",
          cs: "Times",
          eastAsia: "Times",
          hAnsi: "Times",
          hint: undefined
        });
        // assertValueForNodeWithStyle("characterSpacing", container, 24);
      });
    });
    test("style as className", async () => {
      const doc = <App className="headingStyle" />;
      await renderToString(doc, (container: any) => {
        assertValueForNodeWithStyle("style", container, {
          val: "headingStyle"
        });
      });
    });
    test("undefined style does not throw any error", async () => {
      const doc = <App style={null} />;
      await renderToString(doc, (container: any) => {
        assertTextIn("Hey", container);
      });
    });
  });
});
async function renderToString(
  element: any,
  callback: { (container: any): void; (arg0: any): void }
) {
  let renderer = document(element);
  await renderer.toString();
  callback(renderer.container);
  return renderer;
}
