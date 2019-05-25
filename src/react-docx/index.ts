import * as React from "react";
import { createInstance } from "./elements";
import DocRenderer from "./renderer";
import { Packer } from "@gbozee/docx";
import { version } from "../../package.json";

const View = "VIEW";
const TextString = "TEXT";
const Link = "LINK";
const ListString = "List";
const Note = "NOTE";
const Image = "IMAGE";
const DocumentString = "DOCUMENT";
const Canvas = "CANVAS";
const SectionString = "SECTION";
const TableString = "TABLE";
const CellString = "TABLE_CELL";
const RowString = "TABLE_ROW";
const ColumnString = "TABLE_COLUMN";

const document = (input?: any) => {
  const container = createInstance({ type: "ROOT" });
  const mountNode = DocRenderer.createContainer(container, false, false);

  if (input) updateContainer(input);

  function callOnRender(params = {}) {
    // console.log(container.document.props)

    if (container.document.props.onRender) {
      const layoutData = container.document.getLayoutData();
      container.document.props.onRender(
        { ...params, layoutData },
        container.document
      );
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
          callOnRender({ blob, instance: container.instance });

          resolve(blob);
        })
        .catch(reject);
    });
  }
  async function toBuffer(callback?: any) {
    callOnRender();
    const packer = new Packer();

    await container.render();
    return new Promise((resolve, reject) => {
      packer
        .toBuffer(container.instance)
        .then(buffer => {
          if (callback) {
            callback(container.instance);
          }
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
          callOnRender({ string: result, instance: container.instance });
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
    toString,
    container: container.instance
  };
};
const Document = ({ children, ...props }: any) => {
  return React.createElement(DocumentString, props, children);
};
const Section = ({ children, ...props }: any) => {
  return React.createElement(SectionString, props, children);
};
const Text = ({ children, ...props }: any) => {
  // console.log(props)
  return React.createElement(TextString, props, children);
};
const List = ({ children, ...props }: any) => {
  return React.createElement(ListString, props, children);
};
const Table = ({ children, ...props }: any) => {
  return React.createElement(TableString, props, children);
};
const Row = ({ children, ...props }: any) => {
  return React.createElement(RowString, props, children);
};
const Column = ({ children, ...props }: any) => {
  return React.createElement(ColumnString, props, children);
};
const Cell = ({ children, ...props }: any) => {
  return React.createElement(CellString, props, children);
};
Table.Row = Row;
Table.Column = Column;
Table.Cell = Cell;
export {
  version,
  DocRenderer,
  View,
  Text,
  Link,
  Section,
  List,
  //   Font,
  Note,
  Image,
  Document,
  Canvas,
  Table,
  // StyleSheet,
  createInstance,
  document
};
