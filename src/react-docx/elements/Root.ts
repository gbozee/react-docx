import { Document, Numbering, Indent } from "@gbozee/docx";
import { ListIndex, ListType } from "./numbering";

function initializeNumbering() {
  const numbering = new Numbering();

  const abstractNum = numbering.createAbstractNumbering();
  abstractNum
    .createLevel(ListIndex.LowerRoman, ListType.LowerRoman, "%1", "start")
    .addParagraphProperty(new Indent({ left: 720, hanging: 260 }));
  abstractNum
    .createLevel(ListIndex.UpperRoman, ListType.UpperRoman, "%2", "start")
    .addParagraphProperty(new Indent({ left: 720, hanging: 260 }));
  abstractNum
    .createLevel(ListIndex.Decimal, ListType.Decimal, "%3", "start")
    .addParagraphProperty(new Indent({ left: 720, hanging: 260 }));
  abstractNum
    .createLevel(ListIndex.LowerLetter, ListType.LowerLetter, "%4", "start")
    .addParagraphProperty(new Indent({ left: 720, hanging: 260 }));
  abstractNum
    .createLevel(ListIndex.UpperLetter, ListType.UpperLetter, "%5", "start")
    .addParagraphProperty(new Indent({ left: 720, hanging: 260 }));

  return abstractNum;
}

class Root {
  document: any;
  isDirty: boolean;
  instance: Document;
  concreteNumbering: any;
  constructor() {
    this.isDirty = false;
    this.instance = new Document();
    this.document = null;
    this.concreteNumbering = this.instance.Numbering.createConcreteNumbering(
      initializeNumbering()
    );
  }

  get name() {
    return "Root";
  }

  appendChild(child: any) {
    this.document = child;
  }
  removeChild() {
    this.document = null;
  }

  markDirty() {
    this.isDirty = true;
  }
  async render() {
    await this.document.render();
    this.isDirty = false;
  }
  async renderChildren() {}
}

export default Root;
