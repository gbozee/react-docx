import Root from "./Root";
import Page from "./Page";
// import View from './View';
import Text from "./Text";
// import Link from './Link';
// import Note from './Note';
// import Image from './Image';
import LineBreak from "./LineBreak";
import Document from "./Document";
import Section from "./Section";
// import Canvas from './Canvas';
// import TextInstance from './TextInstance';

const constructors: { [key: string]: any } = {
  ROOT: Root,
  PAGE: Page,
  TEXT: Text,
  SECTION: Section,
  br: LineBreak,
  //   LINK: Link,
  //   VIEW: View,
  //   NOTE: Note,
  //   IMAGE: Image,
  //   CANVAS: Canvas,
  DOCUMENT: Document
  //   TEXT_INSTANCE: TextInstance,
};


function createInstance(element: { type: any; props?: any }, root?: any) {
  const { type, props = {} } = element;

  if (constructors[type]) {
    return new constructors[type](root, props);
  }

  throw new Error(`Invalid element of type ${type} passed to Docx renderer`);
}

export { createInstance };
