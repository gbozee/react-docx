import { Document } from "@gbozee/docx";


class Root {
  document: any;
  isDirty: boolean;
  instance: Document;
  constructor() {
    this.isDirty = false;
    this.instance = new Document();
    this.document = null;
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
  async renderChildren(){

  }
}

export default Root;
