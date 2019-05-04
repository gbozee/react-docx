import ReactReconciler from "react-reconciler";
const rootHostContext = {};
const childHostContext = {};
const hostConfig = {
  now: Date.now,
  getPublicInstance: (instance: any) => {
    return instance;
  },
  getRootHostContext: () => {
    return rootHostContext;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  resetTextContent(element: any) {
    // Noop
  },
  getChildHostContext: () => {
    return childHostContext;
  },
  shouldSetTextContent: (type: any, props: { children: any }) => {
    return (
      typeof props.children === "string" || typeof props.children === "number"
    );
  },
  shouldDeprioritizeSubtree: (type, props) => {
    return false;
  },
  createInstance: (
    type: any,
    newProps: { [x: string]: any },
    rootContainerInstance: any,
    _currentHostContext: any,
    workInProgress: any
  ) => {
    const domElement = document.createElement(type);
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName];
      if (propName === "children") {
        if (typeof propValue === "string" || typeof propValue === "number") {
          domElement.textContent = propValue;
        }
      } else if (propName === "onClick") {
        domElement.addEventListener("click", propValue);
      } else if (propName === "className") {
        domElement.setAttribute("class", propValue);
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }
    });
    return domElement;
  },
  createTextInstance: (text: string) => {
    return document.createTextNode(text);
  },
  scheduleDeferredCallback: (callback: any, options: any) => {},
  isPrimaryRenderer: true,
  supportsMutation: true,
  cancelDeferredCallback: (callbackID: any) => {},
  setTimeout: (handler: any, timeout: any) => {},
  clearTimeout: handle => {},
  noTimeout: -1,
  appendInitialChild: (
    parent: { appendChild: (arg0: any) => void },
    child: any
  ) => {
    //maps to document.appendChild
    parent.appendChild(child);
  },
  useSyncScheduling: true,
  appendChild: (parent: { appendChild: (arg0: any) => void }, child: any) => {
    //maps to document.appendChild
    parent.appendChild(child);
  },
  finalizeInitialChildren: (domElement: any, type: any, props: any) => {},
  appendChildToContainer: (
    parent: { appendChild: (arg0: any) => void },
    child: any
  ) => {
    //maps to document.appendChild
    parent.appendChild(child);
  },
  prepareUpdate(domElement: any, oldProps: any, newProps: any) {
    return true;
  },
  commitUpdate(
    domElement: {
      textContent: string | number;
      setAttribute: (arg0: string, arg1: any) => void;
    },
    updatePayload: any,
    type: any,
    oldProps: any,
    newProps: { [x: string]: any }
  ) {
    Object.keys(newProps).forEach(propName => {
      const propValue = newProps[propName];
      if (propName === "children") {
        if (typeof propValue === "string" || typeof propValue === "number") {
          domElement.textContent = propValue;
        }
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }
    });
  },
  commitTextUpdate(textInstance: { text: any }, oldText: any, newText: any) {
    textInstance.text = newText;
  },
  removeChild(
    parentInstance: { removeChild: (arg0: any) => void },
    child: any
  ) {
    //maps to document.removeChild
    parentInstance.removeChild(child);
  },
  removeChildFromContainer(
    parentInstance: { removeChild: (arg0: any) => void },
    child: any
  ) {
    parentInstance.removeChild(child);
  },
  insertBefore(parentInstance: { appendChildBefore: (arg0: any, arg1: any) => void; }, child: any, beforeChild: any) {
    parentInstance.appendChildBefore(child, beforeChild);
  }
};

const ReactReconcilerInst = ReactReconciler(hostConfig);
export default {
  render: (reactElement: React.ReactNode, domElement: any, callback: any) => {
    // Create a root Container if it doesnt exist
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(
        domElement,
        false
      );
    }

    // update the root Container
    return ReactReconcilerInst.updateContainer(
      reactElement,
      domElement._rootContainer,
      null,
      callback
    );
  }
};
