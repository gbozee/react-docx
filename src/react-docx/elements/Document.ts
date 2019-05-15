import wrapPages from "page-wrapping";
// import getMethods from "../utils/getMethods";
import Root from "./Root";
import {
  Paragraph,
  CustomFont,
  ParagraphStyle,
  CharacterStyle
} from "@gbozee/docx";
import composeStyle from "../utils/composeStyle";
function createFontObject(fonts: any = {}) {
  let result = [];
  for (let font in fonts) {
    let f = new CustomFont(font);
    for (let o of fonts[font]) {
      f.addStyle(o);
    }
    result.push(f);
  }
  return result;
}
function createStyleObject(styles: any = {}) {
  let result = [];
  for (let style in styles) {
    let node = styles[style];
    let type = node.kind || "paragraph";
    let klass = type === "text" ? CharacterStyle : ParagraphStyle;
    let f = new klass(style, node.name);
    f = composeStyle(node.style, f);
    result.push(f);
  }
  return result;
}
class Document {
  root: Root;
  style: {};
  props: any;
  children: any[];
  subpages: any[];
  rootStyle: (CharacterStyle | ParagraphStyle)[];
  fonts: CustomFont[];
  constructor(root: Root, props: any) {
    this.root = root;
    this.style = {};
    this.props = props;
    this.children = [];
    this.subpages = [];
    this.rootStyle = createStyleObject(props.rootStyle);
    this.fonts = createFontObject(props.fonts);
  }
  get name() {
    return "Document";
  }
  appendChild(child: any) {
    child.parent = this;
    this.children.push(child);
  }

  removeChild(child: any) {
    const i = this.children.indexOf(child);
    child.parent = null;
    this.children.slice(i, 1);
  }
  applyProps() {
    this.children.forEach(child => child.applyProps());
  }
  update(newProps: any) {
    this.props = newProps;
  }
  getLayoutData() {
    return {
      type: this.name,
      children: this.subpages.map(c => c.getLayoutData())
    };
  }
  async wrapPages() {
    let pageCount = 1;
    const pages = [];
    for (const page of this.children) {
      // console.log(Object.keys(page));
      // console.log(page.children[0]);
      const wrapArea = page.size.height - (page.style.paddingBottom || 0);
      if (page.wrap) {
        const subpages = await wrapPages(page, wrapArea, pageCount);

        pageCount += subpages.length;

        pages.push(...subpages);
      } else {
        page.height = page.size.height;
        pages.push(page);
      }
    }

    return pages;
  }
  // async renderPages() {
  //   this.subpages = await this.wrapPages();

  //   for (let j = 0; j < this.subpages.length; j++) {
  //     // Update dynamic text nodes with total pages info
  //     this.subpages[j].renderDynamicNodes(
  //       {
  //         pageNumber: j + 1,
  //         totalPages: this.subpages.length
  //       },
  //       (node: { name: string }) => node.name === "Text"
  //     );
  //     await this.subpages[j].render();
  //   }

  //   return this.subpages;
  // }
  async renderPages() {
    // console.log(this.children.length)
    for (let page of this.children) {
      // console.log(Object.keys(this.root));
      // console.log(getMethods(this.root));
      // console.log(this.props)

      if (typeof page === "string") {
        console.log(page);
        this.root.instance.addParagraph(new Paragraph(page));
        // If not a component, render it as a paragraph
        // await this.adder.addText(
        //   page,
        //   this.props.style ? applyStyles(this.props.style) : {}
        // );
      } else if (typeof page === "object") {
        // Call render() for each component
        // console.log(page.children)
        await page.render(
          this.props.align,
          this.props.style ? this.props.style : {}
        );
      }
    }
    // for (let i = 0; i < this.children.length; i += 1) {}
  }
  async render() {
    try {
      this.addMetaData();
      this.applyProps();
      await this.loadAssets();
      await this.renderPages();
      for (let style of this.rootStyle) {
        this.root.instance.Styles.push(style);
      }
      for (let font of this.fonts) {
        this.root.instance.Fonts.push(font);
      }
      // this.root.instance.end();
      // Font.reset();
    } catch (e) {
      throw e;
    }
  }
  loadAssets() {}
  addMetaData() {}
}

export default Document;
