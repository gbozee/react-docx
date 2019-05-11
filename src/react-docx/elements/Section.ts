// import { instantiate } from "../utils/constructor";
import Base from "./Base";
// import getMethods from "../utils/getMethods";
import { Paragraph } from "@gbozee/docx";

class Section extends Base {
  paragraph: Paragraph;
  // value: string;
  // root: any;
  // parent: any;
  // props: {};
  constructor(root: any, props: any) {
    super(root, props);
    // this.root = root;
    // this.value = value;
    this.parent = null;
    this.paragraph = new Paragraph();
  }

  get name() {
    return "Section";
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
    for (let child of this.children) {
      // console.log(child.name);
      await child.render();
    }
    this.root.instance.addParagraph(this.paragraph);
  }
}

export default Section;
