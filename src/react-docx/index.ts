import * as React from "react";
import { createInstance } from "./elements";
import DocRenderer from "./renderer";
import { Packer } from "@gbozee/docx";
import { version } from "../../package.json";

const View = "VIEW";
const TextString = "TEXT";
const Link = "LINK";
const PageString = "PAGE";
const Note = "NOTE";
const Image = "IMAGE";
const DocumentString = "DOCUMENT";
const Canvas = "CANVAS";

const document = (input?: any) => {
  const container = createInstance({ type: "ROOT" });
  const mountNode = DocRenderer.createContainer(container, false, false);

  if (input) updateContainer(input);

  function callOnRender(params = {}) {
    if (container.document.props.onRender) {
      const layoutData = container.document.getLayoutData();
      container.document.props.onRender({ ...params, layoutData });
    }
  }

  function isDirty() {
    return container.isDirty;
  }
  function updateContainer(doc: any) {
    DocRenderer.updateContainer(doc, mountNode, null, () => {});
  }
  async function toBlob() {
    const packer = new Packer();
    await container.render();

    return new Promise((resolve, reject) => {
      packer
        .toBlob(container.instance)
        .then(blob => {
          // saveAs from FileSaver will download the file
          resolve(blob);
        })
        .catch(reject);
    });
  }
  async function toBuffer() {
    callOnRender();
    const packer = new Packer();

    await container.render();
    return new Promise((resolve, reject) => {
      packer
        .toBuffer(container.instance)
        .then(buffer => {
          resolve(buffer);
        })
        .catch(reject);
    });
  }
  async function toString() {
    const packer = new Packer();
    await container.render();

    return new Promise((resolve, reject) => {
      packer
        .toBase64String(container.instance)
        .then(result => {
          callOnRender({ string: result });
          resolve(result);
        })
        .catch(reject);
    });
  }
  return {
    isDirty,
    updateContainer,
    toBuffer,
    toBlob,
    toString
  };
};
const Document = ({ children, ...props }: any) => {
  return React.createElement(DocumentString, props, children);
};
const Page = ({ children, ...props }: any) => {
  return React.createElement(PageString, props, children);
};
const Text = ({ children, ...props }: any) => {
  return React.createElement(TextString, props, children);
};
export {
  version,
  DocRenderer,
  View,
  Text,
  Link,
  Page,
  //   Font,
  Note,
  Image,
  Document,
  Canvas,
  // StyleSheet,
  createInstance,
  document
};