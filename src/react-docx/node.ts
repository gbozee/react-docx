import * as fs from "fs";
import {
  document
  // version,
  // DocRenderer,
  // View,
  // Text,
  // Link,
  // Section,
  // //   Font,
  // Note,
  // Image,
  // Document,
  // Canvas,
  // // StyleSheet,
  // createInstance
} from "./index";

export const renderToStream = function(
  element: any,
  callbackWithInstance: any
) {
  return document(element).toBuffer(callbackWithInstance);
};

export const renderToFile = async function(
  element: any,
  filePath: string | number | Buffer | import("url").URL,
  callback?: any,
  containerCallback?: any
) {
  try {
    const output = await renderToStream(element, containerCallback);
    fs.writeFileSync(filePath, output);
    if (callback) {
      callback(output, filePath);
    }
    return output;
  } catch (error) {
    throw error;
  }
};

const throwEnvironmentError = (name: string) => {
  throw new Error(
    `${name} is a web specific API. Or you're either using this component on Node, or your bundler is not loading react-docx from the appropiate web build.`
  );
};

export const DOCXViewer = () => {
  throwEnvironmentError("DOCXViewer");
};

export const DOCXDownloadLink = () => {
  throwEnvironmentError("DOCXDownloadLink");
};

export const BlobProvider = () => {
  throwEnvironmentError("BlobProvider");
};

export const render = renderToFile;

export {
  version,
  DocRenderer,
  View,
  Text,
  Link,
  Section,
  //   Font,
  Note,
  Image,
  Document,
  Canvas,
  // StyleSheet,
  createInstance,
  document
} from "./index";
