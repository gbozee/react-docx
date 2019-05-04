////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      let ownProperty = Object.getOwnPropertyDescriptor(
        baseCtor.prototype,
        name
      ) as any;
      Object.defineProperty(derivedCtor.prototype, name, ownProperty);
    });
  });
}
