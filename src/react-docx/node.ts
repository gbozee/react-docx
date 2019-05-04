import * as fs from "fs";
import { document } from "./index";
export const renderToStream = function(element: any) {
  return document(element).toBuffer();
};

export const renderToFile = async function(
  element: any,
  filePath: string | number | Buffer | import("url").URL,
  callback: (arg0: {}, arg1: any) => void
) {
  try {
    const output = await renderToStream(element);
    fs.writeFileSync(filePath, null);
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

export * from "./index";
