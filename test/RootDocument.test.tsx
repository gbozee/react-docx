import React from "react";
import { Document } from "../src/react-docx";
import { renderToString } from "./utils";

describe("Document", () => {
  const App = ({ children, styles = {}, ...rest }: any) => (
    <Document rootStyle={styles} {...rest}>
      {children}
    </Document>
  );
  test("support creating a root style", async () => {
    let doc = (
      <App
        styles={{
          headlineStyle: {
            name: "Headline Style",
            style: {
              basedOn: "Heading2",
              font: "Acme",
              allCaps: true
            }
          },
          textStyle: {
            name: "Text Style",
            kind: "text",
            style: {
              basedOn: "DefaultParagraphFont",
              color: "#abc"
            }
          }
        }}
      />
    );
    await renderToString(doc, (container: any) => {
      let styles0 = container.Styles.root[14];
      let styles = container.Styles.root[15];
      expect(styles0.runProperties.root[0].root[0].root.ascii).toEqual("Acme");
      expect(styles.runProperties.root[0].root[0].root).toEqual({ val: "abc" });
    });
  });
  test("supports adding new fonts", async () => {
    let doc = <App fonts={{ Acme: ["regular"] }} />;
    await renderToString(doc, (container: any) => {
      let font = container.Fonts.root[2];
      expect(font.name).toEqual("Acme");
      expect(font.root[1].root[0].root.id).toEqual("acmeRegular");
    });
  });
});
