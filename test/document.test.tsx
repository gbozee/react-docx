import fs from "fs";
import React from "react";
// import { mount, configure } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// import mock from "mock-fs";
// import { document, Document, Text, Section, render } from "@gbozee/react-docx";
import {
  document,
  Document,
  Text,
  Section,
  render
} from "../src/react-docx/node";
// import {
//   DOCXDownloadLink,
//   DOCXViewer
//   // BlobProvider
// } from "../src/react-docx/dom";
// configure({ adapter: new Adapter() });
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
  describe("Rendering of the component", () => {
    // mock({
    //   testDir: {}
    // });
    // afterAll(() => {
    //   mock.restore();
    // });
    global.URL.createObjectURL = jest.fn();
    global.URL.revokeObjectURL = jest.fn();
    const doc = (
      <Document>
        <Section>
          <Text>Hello world</Text>
        </Section>
      </Document>
    );
    test("in Node", async () => {
      await render(doc, "example.docx");
      expect(fs.existsSync("example.docx")).toBeTruthy();
    });
    // test("in the browser using a link", async () => {
    //   const wrapper = mount(
    //     <DOCXDownloadLink document={doc}>Download</DOCXDownloadLink>
    //   );
    //   expect(wrapper.find("a")).toHaveLength(1);
    //   expect(wrapper.text()).toBe("Download");
    //   const wrapper2 = mount(
    //     <DOCXViewer name="DOCXViewer-test-name">{doc}</DOCXViewer>
    //   );
    //   expect(wrapper2.find("iframe").prop("name")).toEqual(
    //     "DOCXViewer-test-name"
    //   );
    // });
    // test("BlobProvider returns document url", done => {
    //   let updates = 2;
    //   const instance = (
    //     <BlobProvider document={doc}>
    //       {(props: any) => {
    //         if (updates === 2) expect(props.url).toBeFalsy();
    //         if (updates === 1) expect(props.url).toBeTruthy();
    //         done();
    //         return updates--;
    //       }}
    //     </BlobProvider>
    //   );
    //   mount(instance);
    //   // expect.assertions(2);
    // });
  });
});
