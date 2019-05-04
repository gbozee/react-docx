import React from "react";
import { document, Document, Page, Text } from "../../src/react-docx";

describe("document", () => {
  test("Should create empty pdf instance", () => {
    const instance = document();
    expect(instance).toBeTruthy();
  });

  test("Should create pdf instance with initial value", () => {
    const doc = (
      <Document>
        <Page />
      </Document>
    );
    const instance = document(doc);
    expect(instance).toBeTruthy();
  });

  test("Should get string from instance", async () => {
    const doc = (
      <Document>
        <Page />
      </Document>
    );
    const string = await document(doc).toString();

    expect(string).toEqual(expect.stringContaining("%PDF-1.3"));
  });

  test("Should get buffer from instance", () => {
    const doc = (
      <Document>
        <Page />
      </Document>
    );
    const buffer = document(doc).toBuffer();

    expect(buffer).toBeTruthy();
  });

  test("Should get blob from instance", async () => {
    const doc = (
      <Document>
        <Page />
      </Document>
    );
    const blob = await document(doc).toBlob();

    expect(blob).toBeTruthy();
  });

  test("Should call onRender when toBuffer called", done => {
    const onRender = ({ layoutData }: any) => {
      expect(layoutData).toBeTruthy();
      done();
    };

    const doc = (
      <Document onRender={onRender}>
        <Page>
          <Text>Hey</Text>
        </Page>
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
        <Page>
          <Text>Hey</Text>
        </Page>
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
        <Page>
          <Text>Hey</Text>
        </Page>
      </Document>
    );

    document(doc).toString();
  });
});
