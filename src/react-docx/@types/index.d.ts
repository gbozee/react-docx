type Type = any;
type Props = {};
type Instance = {
  appendChild: (node: any) => {};
  appendChildBefore: (child: any, beforeChild: any) => {};
  removeChild: (child: any) => {};
  update: (node: any) => {};
  getAbsoluteLayout?: () => { left: 0; top: 0 };
  page: any;
};
interface Container extends Instance {}
interface TextInstance extends Instance {}

type HydratableInstance = {};
type PublicInstance = {};
type HostContext = {};
type ChildSet = {};
type UpdatePayload = {};
type TimeoutHandle = {};
type NoTimeout = {};

