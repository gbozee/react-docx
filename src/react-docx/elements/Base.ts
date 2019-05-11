// import {  toPairsIn } from "ramda";
// import { pick, toPairsIn } from "ramda";

import Node from "./Node";
import warning from "../utils/warning";
// import matchPercent from "../utils/matchPercent";
// import isFunction from "../utils/isFunction";
import deepMerge from "../utils/deepMerge";
import Root from "./Root";
import getMethods from "../utils/getMethods";
// import getMethods from "../utils/getMethods";
// import { inheritedProperties } from "../stylesheet/inherit";
// import StyleSheet from "../stylesheet";
// import upperFirst from "../utils/upperFirst";
// import { instantiate } from "../utils/constructor";

class Base extends Node {
  root: Root;
  style: any;
  props: any;
  static defaultProps: any;
  name: any;
  constructor(root: Root, props: any) {
    super();

    this.root = root;
    this.style = {};
    let constructor = this.constructor as any;
    this.props = deepMerge([
      constructor.defaultProps,
      Base.defaultProps,
      props
    ]);

    warning(!this.props.styles, '"styles" prop passed instead of "style" prop');
  }
  get page() {
    return this.parent && this.parent.page;
  }

  get wrap() {
    return this.props.wrap;
  }

  get break() {
    return this.props.break;
  }

  get fixed() {
    return this.props.fixed;
  }

  get minPresenceAhead() {
    return this.props.minPresenceAhead;
  }
  // get absolute() {
  //   return this.props.style.position === "absolute";
  // }

  // get origin() {
  //   const { transformOriginX, transformOriginY } = this.style;
  //   const { left, top, width, height } = this.getAbsoluteLayout();

  //   const percentX = matchPercent(transformOriginX);
  //   const percentY = matchPercent(transformOriginY);

  //   const offsetX = percentX ? width * percentX.percent : transformOriginX;
  //   const offsetY = percentY ? height * percentY.percent : transformOriginY;

  //   return [left + offsetX, top + offsetY];
  // }

  // set break(value) {
  //   this.props.break = value;
  // }
  appendChild(child: any) {
    super.appendChild(child);
    // console.log(this.root)
    // this.root.markDirty();
  }

  // appendChildBefore(child: any, beforeChild: any) {
  //   super.appendChildBefore(child, beforeChild);
  //   this.root.markDirty();
  // }

  removeChild(child: any) {
    super.removeChild(child);
    this.root.markDirty();
  }
  update(newProps: any) {
    let constructor = this.constructor as any;
    this.props = deepMerge([
      constructor.defaultProps,
      Base.defaultProps,
      newProps
    ]);
    this.root.markDirty();
  }

  applyProps() {
    this.style = this.resolveStyles();

    // toPairsIn(this.style).map(([attribute, value]) => {
    //   this.applyStyle(attribute, value);
    // });

    this.children.forEach(child => {
      if (child.applyProps) child.applyProps();
    });
  }

  resolveStyles() {
    // const { size, orientation } = this.page;

    // const ownStyles = StyleSheet.resolve(this.props.style, {
    //   orientation,
    //   width: size.width,
    //   height: size.height
    // });

    // const inheritedStyles = this.parent
    //   ? pick(inheritedProperties, this.parent.style)
    //   : {};
    return {}
    // return { ...inheritedStyles, ...ownStyles };
  }
  // applyStyle(attribute: string, value: {} | undefined) {
  //   if (value === undefined) return;

  //   const setter = `set${upperFirst(attribute)}`;

  //   switch (attribute) {
  //     case "marginTop":
  //     case "marginRight":
  //     case "marginBottom":
  //     case "marginLeft":
  //     case "paddingTop":
  //     case "paddingRight":
  //     case "paddingBottom":
  //     case "paddingLeft":
  //     case "borderTopWidth":
  //     case "borderRightWidth":
  //     case "borderBottomWidth":
  //     case "borderLeftWidth":
  //     case "position":
  //     case "top":
  //     case "right":
  //     case "bottom":
  //     case "left":
  //     case "width":
  //     case "height":
  //     case "minHeight":
  //     case "maxHeight":
  //     case "minWidth":
  //     case "maxWidth":
  //       this[attribute] = value;
  //       break;
  //     default:
  //       if (isFunction(this.layout[setter])) {
  //         this.layout[setter](value);
  //       }
  //   }
  // }

  // getLayoutData() {
  //   const layout = this.getAbsoluteLayout();

  //   return {
  //     type: this.name,
  //     top: layout.top,
  //     left: layout.left,
  //     width: layout.width,
  //     style: this.style,
  //     height: layout.height,
  //     children: this.children.map(c => {
  //       return c.getLayoutData();
  //     })
  //   };
  // }
  // drawBackgroundColor() {
  //   const { backgroundColor, opacity = 1 } = this.style;
  //   const { left, top, width, height } = this.getAbsoluteLayout();

  //   if (backgroundColor) {
  //     this.root.instance.save();

  //     this.clip();

  //     this.root.instance
  //       .fillOpacity(opacity)
  //       .fillColor(backgroundColor)
  //       .rect(left, top, width, height)
  //       .fill()
  //       .restore();
  //   }
  // }
  // clip() {}

  // clone() {
  //   let node = this.constructor as any;
  //   const clone = instantiate<any>(node, this.root, this.props);

  //   clone.copyStyle(this);
  //   clone.style = this.style;

  //   return clone;
  // }

  // onNodeSplit(
  //   height: number,
  //   clone: {
  //     marginTop: number;
  //     paddingTop: number;
  //     style: { height: any };
  //     height: number;
  //   }
  // ) {
  //   this.calculateLayout();

  //   clone.marginTop = 0;
  //   clone.paddingTop = 0;

  //   // If a height was given to the element, we need to substract the remaining wrapping height
  //   // If not, we just let Yoga calculate the appropiate height when layout get's calculated.
  //   if (clone.style.height) {
  //     clone.height = this.height - height;
  //   }

  //   this.height = height;
  //   this.marginBottom = 0;
  //   this.paddingBottom = 0;
  // }

  async render() {
    console.log(this.root)
    for (let i = 0; i < this.children.length; i++) {
      getMethods(this.children[i])
      await this.children[i].render();
      // await this.children[i].render();
    }
  }
}
// Object.assign(Base.prototype, Debug);
// Object.assign(Base.prototype, Borders);
// Object.assign(Base.prototype, Clipping);
// Object.assign(Base.prototype, Transform);

export default Base;
