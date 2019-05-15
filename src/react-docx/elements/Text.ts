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
    this.root.markDirty();
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
    let paragraph = new Paragraph();
    if (this.parent.name !== "Document") {
      paragraph = this.parent.paragraph;
    }
    let nodes = [];
    for (let child of this.children) {
      if (typeof child === "string") {
        let oldChild = new TextRun(child);
        if (this.props.tab) {
          for (let _o of Array(this.props.tab).fill(0)) {
            oldChild.tab();
          }
        }
        oldChild = this.resolveStyles(oldChild);
        nodes.push(oldChild);
      } else {
        if (child.name === "br") {
          if (nodes.length > 0) {
            nodes[nodes.length - 1].break();
          }
        }
      }
      // console.log(child.name);
      // await child.render();
    }
    // console.log(nodes);
    for (let node of nodes) {
      paragraph.addRun(node);
    }
    if (this.parent.name === "Document") {
      console.log(this.parent.name);
      this.parent.root.instance.addParagraph(paragraph);
    }
  }
}

export default TextInstance;
