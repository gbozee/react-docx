import React from "react";
import { Document, Section, Text, render } from "@gbozee/react-docx";
// import { render } from "./react-docx/node";

const doc = (
  <Document>
    <Section>
      <Text>Hey</Text>
    </Section>
  </Document>
);

render(doc, "sample.docx", (output: any, filepath: any) => {
  console.log(output);
  console.log(filepath);
});
