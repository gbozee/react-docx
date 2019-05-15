import React from "react";
import { Document, Text, Section } from "../src/react-docx/node";
import { assertText, assertContainStyle, assertTextWithBreak, assertTextIn, assertValueForNodeWithStyle, renderToString } from "./utils";


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
