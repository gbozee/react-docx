import Base from "./Base";

class LineBreak extends Base {
  constructor(root: any, props: any) {
    super(root, props);
    this.parent = null;
    this.props = props;
  }

  get name() {
    return "br";
  }
  appendChild(_child: any) {
    // this.children.push(child);
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
    // this.parent.removeChild(this);
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
    debugger;
    if (this.parent.name !== "Text") {
    }
  }
}

export default LineBreak;
