// import { instantiate } from "../utils/constructor";
import Base from "./Base";
// import getMethods from "../utils/getMethods";
import { Paragraph, TextRun } from "@gbozee/docx";
import warning from "../utils/warning";

class TableComponents extends Base {
  constructor(root: any, props: any) {
    super(root, props);
    this.parent = null;
    this.props = props;
  }
  appendChild(child: any) {
    this.children.push(child);
    this.root.markDirty();
  }

  remove() {
    this.parent.removeChild(this);
  }
}

class TableRow extends TableComponents {
  get name() {
    return "Row";
  }
  async render(){

  }
}

class TableColumn extends TableComponents {
  get name() {
    return "Column";
  }
  async render(){

  }
}

class TableCell extends TableComponents {
  get name() {
    return "Cell";
  }
  async render(){
      let table = this.parent
  }
}

class Table extends Base {
  paragraph: Paragraph;
  // value: string;
  // root: any;
  // parent: any;
  // props: {};
  static Row = TableRow;
  static Column = TableColumn;
  static Cell = TableCell;
  constructor(root: any, props: any) {
    super(root, props);
    // this.root = root;
    // this.value = value;
    this.parent = null;
    this.paragraph = new Paragraph();
  }

  get name() {
    return "Table";
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
    let nodes = [];
    let hasTabs = (this.props.style || {}).justifyContent;
    if (hasTabs === "space-between") {
      delete this.props.style["justifyContent"];
      nodes = this.children.filter((x: any) => x.name === "Text");
      warning(
        nodes.length !== 2,
        "Currently, space between only works with two Text nodes in a paragraph"
      );
      if (nodes.length === 2) {
        this.paragraph.maxRightTabStop();
      }
    }
    this.paragraph = this.resolveStyles(this.paragraph);
    // console.log(Paragraph)
    for (let child of this.children) {
      // console.log(child.name);
      if (typeof child === "string") {
        this.paragraph.addRun(new TextRun(child));
      } else {
        if (child.name === "hr") {
          this.paragraph.thematicBreak();
        } else {
          child.parent = this;
          if (nodes.length > 0) {
            // when adding tabs to the last text item.
            if (child === nodes[nodes.length - 1]) {
              child.props = { ...child.props, tab: 1 };
            }
            await child.render();
          } else {
            await child.render();
          }
        }
      }
    }
    this.root.instance.addParagraph(this.paragraph);
  }
}

export default Table;
