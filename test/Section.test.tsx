import React from "react";
import { Section, Text } from "../src/react-docx";

import {
  renderToString,
  assertValueForNodeWithStyle,
  assertTextIn,
  assertBorder,
  getParagraphChildren,
  options
} from "./utils";

describe("Section/Paragraph", () => {
  const App = ({ children, styles = {}, ...rest }: any) => (
    <Section style={styles} {...rest}>
      {children}
    </Section>
  );
  test("style as className", async () => {
    const doc = <App className="headingStyle" />;
    await renderToString(doc, (container: any) => {
      assertValueForNodeWithStyle(
        "style.p",
        container,
        {
          val: "headingStyle"
        },
        "properties"
      );
    });
  });

  test("Heading 1 - 5 or title", async () => {
    async function headings(kind: string, value: string) {
      const doc = <App styles={{ heading: kind }} />;

      await renderToString(doc, (container: any) => {
        assertValueForNodeWithStyle(
          "style.p",
          container,
          {
            val: value
          },
          "properties"
        );
      });
    }
    headings("heading1", "Heading1");
    headings("heading2", "Heading2");
    headings("heading3", "Heading3");
    headings("heading4", "Heading4");
    headings("heading5", "Heading5");
    headings("title", "Title");
  });
  test("Alignment left|right|center|justified", async () => {
    async function alignment(kind: string, value?: string) {
      const doc = <App style={{ align: kind }} />;
      await renderToString(doc, (container: any) => {
        assertValueForNodeWithStyle(
          "align",
          container,
          {
            val: value || kind
          },
          "properties"
        );
      });
    }
    alignment("left");
    alignment("right");
    alignment("center");
    alignment("justified", "both");
  });

  test("Thematicbreak or regular break", async () => {
    const doc = (
      <App>
        Hello world <hr />
      </App>
    );
    await renderToString(doc, (container: any) => {
      // debugger;
      assertTextIn("Hello world", container);
      assertBorder("border", container, "bottom", "properties");
    });
  });
  test("justifyContent", async () => {
    const doc = (
      <App styles={{ justifyContent: "space-between" }}>
        <Text>Hello</Text>
        <Text>Biola</Text>
      </App>
    );
    try {
      await renderToString(doc, (container: any) => {
        let nodes = getParagraphChildren(container).root;
        expect(nodes[0].root[0].rootKey).toEqual(options.tabs);
        expect(nodes[1].root.map((a: any) => a.rootKey)).not.toContain(
          options.tab
        );
        expect(nodes[1].root[1].root[1]).toEqual("Hello");

        expect(nodes[2].root.map((a: any) => a.rootKey)).toContain(
          options["tab"]
        );
        expect(nodes[2].root[2].root[1]).toEqual("Biola");
      });
    } catch (error) {
      console.log(error);
    }
  });
});
