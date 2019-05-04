import wrapPages from "page-wrapping";
class Document {
  root: any;
  style: {};
  props: any;
  children: any[];
  subpages: any[];
  constructor(root: any, props: any) {
    this.root = root;
    this.style = {};
    this.props = props;
    this.children = [];
    this.subpages = [];
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
  async renderPages() {
    this.subpages = await this.wrapPages();

    for (let j = 0; j < this.subpages.length; j++) {
      // Update dynamic text nodes with total pages info
      this.subpages[j].renderDynamicNodes(
        {
          pageNumber: j + 1,
          totalPages: this.subpages.length
        },
        (node: { name: string }) => node.name === "Text"
      );
      await this.subpages[j].render();
    }

    return this.subpages;
  }
  async render() {
    try {
      this.addMetaData();
      this.applyProps();
      await this.loadAssets();
      await this.renderPages();
      this.root.instance.end();
      // Font.reset();
    } catch (e) {
      throw e;
    }
  }
  loadAssets() {}
  addMetaData() {}
}

export default Document;
