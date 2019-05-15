import React from "react";
import { Text, List } from "../src/react-docx";
import { renderToString } from "./utils";

describe("Bullet/List", () => {
  const App = ({ children, styles = {}, ...rest }: any) => (
    <List style={styles} {...rest}>
      <Text>First Item</Text>
      <Text>Second Item</Text>
    </List>
  );
  test("sanity check for regular list item/bullet style", async () => {
    let doc = <App />;
    await renderToString(doc, (container: any) => {
      let nodes = container.document.body.root;
      expect(nodes[0].properties.root[1].root[1].root[0].root).toEqual({
        val: 1
      });
      expect(nodes[1].properties.root[1].root[1].root[0].root).toEqual({
        val: 1
      });
    });
  });
  test("changing bullet style to either roman numeral, number or letters", async () => {
    async function bulletTypes(kind: string) {
      let doc = <App listType={kind} />;
      await renderToString(doc, (container: any) => {
        let nodes = container.document.body.root;
        // debugger;
        expect(nodes[0].properties.root[1].root[1].root[0].root).toEqual({
          val: 2
        });
        expect(nodes[1].properties.root[1].root[1].root[0].root).toEqual({
          val: 2
        });
      });
    }
    bulletTypes("lowerRoman");
    bulletTypes("upperRoman");
    bulletTypes("decimal");
    bulletTypes("lowerLetter");
    bulletTypes("upperLetter");
  });
});
