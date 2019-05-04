import { Document } from "@gbozee/docx";

class Root {
  document: any;
  isDirty: boolean;
  instance: any;
  constructor() {
    this.isDirty = false;
    this.document = null;
    this.instance = null;
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
    this.instance = new Document();
    await this.document.render();
    this.isDirty = false;
  }
}

export default Root;
