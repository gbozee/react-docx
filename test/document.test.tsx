import React from "react";
import { document, Document, Text, Section } from "@gbozee/react-docx";
import { render } from "@gbozee/react-docx";

describe("document", () => {
  test("Should create empty pdf instance", () => {
    const instance = document();
    expect(instance).toBeTruthy();
  });

  test("Should create pdf instance with initial value", () => {
    const doc = <Document />;
    const instance = document(doc);
    expect(instance).toBeTruthy();
  });

  test("Should get string from instance", async () => {
    const doc = <Document />;
    const string = await document(doc).toString();
    expect(string).toBeTruthy();
    // expect(string).toEqual(expect.stringContaining("%PDF-1.3"));
  });

  test("Should get buffer from instance", () => {
    const doc = <Document>{/* <Page /> */}</Document>;
    const buffer = document(doc).toBuffer();

    expect(buffer).toBeTruthy();
  });

  test("Should get blob from instance", async () => {
    const doc = <Document>{/* <Page /> */}</Document>;
    const blob = await document(doc)
      .toBlob()
      .catch((e: any) => {
        console.log(e);
      });

    expect(blob).toBeTruthy();
  });

  test("Should call onRender when toBuffer called", done => {
    const onRender = (props: any) => {
      expect(props.layoutData).toBeTruthy();
      done();
    };

    const doc = (
      <Document onRender={onRender}>
        <Text>Hey</Text>
      </Document>
    );

    document(doc).toBuffer();
  });

  test("Should call onRender when toBlob called", done => {
    const onRender = ({ blob, layoutData }: any) => {
      expect(blob).toBeTruthy();
      expect(layoutData).toBeTruthy();
      done();
    };

    const doc = (
      <Document onRender={onRender}>
        <Section>
          <Text>Hey</Text>
        </Section>
      </Document>
    );

    document(doc).toBlob();
  });

  test("Should call onRender when toString called", done => {
    const onRender = ({ string, layoutData }: any) => {
      expect(string).toBeTruthy();
      expect(layoutData).toBeTruthy();
      done();
    };

    const doc = (
      <Document onRender={onRender}>
        <Section>
          <Text>Hey</Text>
        </Section>
      </Document>
    );

    document(doc).toString();
  });
  test("rendering of the component", done => {
    const doc = (
      <Document>
        <Section>
          <Text>Hey</Text>
        </Section>
      </Document>
    );
    render(doc, "sample.docx", undefined, (_instance: any) => {
      expect(_instance).toMatchSnapshot()
    })
      .then((_data: any) => {
        done();
      })
      .catch((e: any) => {
        console.log(e);
      });
  });
});
