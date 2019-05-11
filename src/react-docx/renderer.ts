import ReactFiberReconciler from "react-reconciler";

import { createInstance } from "./elements";
import propsEqual from "./utils/propsEqual";

const emptyObject = {};
const shouldReplaceLink = (
  type: string,
  props: { children?: any; render?: any }
) =>
  type === "LINK" &&
  (typeof props.children === "string" ||
    typeof props.children === "number" ||
    Array.isArray(props.children) ||
    props.render);

interface HostConfig
  extends ReactFiberReconciler.HostConfig<
    Type,
    Props,
    Container,
    Instance,
    TextInstance,
    HydratableInstance,
    PublicInstance,
    HostContext,
    UpdatePayload,
    ChildSet,
    TimeoutHandle,
    NoTimeout
  > {
  useSyncScheduling?: boolean;
}
let hostConfig: HostConfig = {
  getPublicInstance(instance: Instance) {
    return instance;
  },
  getRootHostContext(_rootContainerInstance: Container) {
    return emptyObject;
  },
  getChildHostContext(
    _parentHostContext: HostContext,
    _type: Type,
    _rootContainerInstance: Container
  ) {
    let u = {} as HostContext;
    return u;
  },
  prepareForCommit(_containerInfo: Container) {
    //noop
  },
  resetAfterCommit(_containerInfo: Container) {
    //noop
  },
  resetTextContent(_instance: Instance) {
    //noop
  },
  createInstance(
    type: Type,
    props: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext,
    _internalInstanceHandle: ReactFiberReconciler.OpaqueHandle
  ) {
    const instanceType = shouldReplaceLink(type, props) ? "TEXT" : type;
    return createInstance(
      { type: instanceType, props },
      _rootContainerInstance
    );
  },
  supportsMutation: true,
  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance) {
    // console.log(parentInstance)
    // console.log(child)
    parentInstance.appendChild(child);
  },
  finalizeInitialChildren(
    _parentInstance: Instance,
    _type: Type,
    _props: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ) {
    return false;
  },
  prepareUpdate(
    _instance: Instance,
    _type: Type,
    oldProps: Props,
    newProps: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ) {
    return !propsEqual(oldProps, newProps);
  },
  shouldSetTextContent(_type: Type, _props: Props) {
    return false;
  },
  shouldDeprioritizeSubtree(_type: Type, _props: Props) {
    return false;
  },
  createTextInstance(
    text: string,
    _rootContainerInstance: Container,
    _hostContext: HostContext,
    _internalInstanceHandle: ReactFiberReconciler.OpaqueHandle
  ) {
    let result = text as any
    return result
    // console.log(text)
    // return createInstance({ type: "TEXT", props: text }, _rootContainerInstance);
  },

  scheduleDeferredCallback(
    _callback: () => any,
    _options?: { timeout: number }
  ) {},
  cancelDeferredCallback(_callbackID: any) {},
  setTimeout(_handler: (...args: any[]) => void, _timeout: number) {
    let u = {} as TimeoutHandle;
    return u;
  },
  clearTimeout(_handle: TimeoutHandle | NoTimeout) {},
  noTimeout: {},
  now: Date.now,

  // Temporary workaround for scenario where multiple renderers concurrently
  // render using the same context objects. E.g. React DOM and React ART on the
  // same page. DOM is the primary renderer; ART is the secondary renderer.
  isPrimaryRenderer: true,

  supportsPersistence: true,
  supportsHydration: true,
  appendChild: (parentInstance: Instance, child: Instance | TextInstance) => {
    parentInstance.appendChild(child);
  },
  appendChildToContainer(container: Container, child: Instance | TextInstance) {
    container.appendChild(child);
  },
  useSyncScheduling: true,
  insertBefore(
    parentInstance: Instance,
    child: Instance | TextInstance,
    beforeChild: Instance | TextInstance
  ) {
    parentInstance.appendChildBefore(child, beforeChild);
  },
  removeChild(parentInstance: Instance, child: Instance | TextInstance) {
    parentInstance.removeChild(child);
  },
  removeChildFromContainer(
    container: Container,
    child: Instance | TextInstance
  ) {
    container.removeChild(child);
  },
  commitTextUpdate(
    textInstance: TextInstance,
    _oldText: string,
    newText: string
  ) {
    textInstance.update(newText);
  },
  commitUpdate(
    instance: Instance,
    _updatePayload: UpdatePayload,
    _type: Type,
    _oldProps: Props,
    newProps: Props,
    _internalInstanceHandle: ReactFiberReconciler.OpaqueHandle
  ) {
    instance.update(newProps);
  }
};
// tslint:disable-next-line:no-unnecessary-generics
const DocRenderer = ReactFiberReconciler(hostConfig);

export default DocRenderer;
