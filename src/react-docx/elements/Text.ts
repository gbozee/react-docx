// import { instantiate } from "../utils/constructor";
import Base from "./Base";
// import getMethods from "../utils/getMethods";
import { Paragraph, TextRun } from "@gbozee/docx";

class TextInstance extends Base {
  // value: string;
  // root: any;
  // parent: any;
  // props: {};
  constructor(root: any, props: any) {
    super(root, props);
    // this.root = root;
    // this.value = value;
    this.parent = null;
    this.props = props;
  }

  get name() {
    return "Text";
  }
  appendChild(child: any) {
    this.children.push(child);
    // if (child) {
    //   child.parent = this;
    //   this.children.push(child);
    //   this.computed = false;
    //   // this.attributedString = null;
    //   // this.markDirty();
    // }
  }
  // getLayoutData() {
  //   return this.value;
  // }

  remove() {
    this.parent.removeChild(this);
  }

  // clone() {
  //   let ctor = this.constructor as any;
  //   return instantiate<any>(ctor, this.root, this.value);
  //   //   return new this.constructor(this.root, this.value);
  // }

  // update(value: any) {
  //   this.value = value;
  //   this.parent.computed = false;
  //   this.parent.container = null;
  //   this.root.markDirty();
  // }

  async render() {
    // console.log(Paragraph)
    let paragraph = new Paragraph();
    if (this.parent.name !== "Document") {
      paragraph = this.parent.paragraph;
    }
    for (let child of this.children) {
      paragraph.addRun(new TextRun(child));
      // console.log(child.name);
      // await child.render();
    }
    if (this.parent.name === "Document") {
      console.log(this.parent.name);
      this.parent.root.instance.addParagraph(paragraph);
    }
  }
}

export default TextInstance;
