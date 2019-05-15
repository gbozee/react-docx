// import { instantiate } from "../utils/constructor";
// import getMethods from "../utils/getMethods";
import { Paragraph } from "@gbozee/docx";
import warning from "../utils/warning";
import Section from "./Section";
import { ListType, ListIndex } from "./numbering";
class List extends Section {
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
  appendChild(child: any) {
    if (child) {
      this.children.push(child);
      // if (child) {
      //   child.parent = this;
      //   this.children.push(child);
      //   this.computed = false;
      //   // this.attributedString = null;
      this.root.markDirty();
    }
    // }
  }
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
    let nodes = this.children.filter((x: any) => x.name === "Text");
    let options: { [key: string]: any } = {
      [ListType.UpperRoman]: ListIndex.UpperRoman,
      [ListType.LowerRoman]: ListIndex.LowerRoman,
      [ListType.Decimal]: ListIndex.Decimal,
      [ListType.LowerLetter]: ListIndex.LowerLetter,
      [ListType.UpperLetter]: ListIndex.UpperLetter
    };
    warning(
      nodes.length === this.children.length,
      "Only node of type Text is allowed"
    );
    let listType = undefined;
    if (this.props.listType) {
      listType = options[this.props.listType];
      warning(listType, `listType must be one of ${Object.keys(options)}`);
    }
    // console.log(Paragraph)
    for (let child of this.children) {
      let paragraph = new Paragraph();
      paragraph = this.resolveStyles(paragraph);
      // console.log(child.name);
      child.parent = { name: "Section", paragraph };
      // when adding tabs to the last text item.
      await child.render();
      if (listType > -1) {
        paragraph.setNumbering(this.root.concreteNumbering, listType);
      } else {
        paragraph.bullet();
      }
      this.root.instance.addParagraph(paragraph);
    }
  }
}

export default List;
