import { instantiate } from "../utils/constructor";
class TextInstance {
  value: string;
  root: any;
  parent: any;
  props: {};
  constructor(root: any, value: string) {
    this.root = root;
    this.value = value;
    this.parent = null;
    this.props = {};
  }

  get name() {
    return "TextInstance";
  }

  getLayoutData() {
    return this.value;
  }

  remove() {
    this.parent.removeChild(this);
  }

  clone() {
    let ctor = this.constructor as any;
    return instantiate<any>(ctor, this.root, this.value);
    //   return new this.constructor(this.root, this.value);
  }

  update(value: any) {
    this.value = value;
    this.parent.computed = false;
    this.parent.container = null;
    this.root.markDirty();
  }
}

export default TextInstance;
