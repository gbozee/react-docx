export function instantiate<T>(ctor: { new (...args: any[]): T }, ...args: any[]): T {
    // function instantiate<T>(ctor: FunctionWithTypedReturn<T>, ...args: any[]): T {
    return new ctor(...args);
  }
  