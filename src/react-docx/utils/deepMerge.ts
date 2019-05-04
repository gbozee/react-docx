import { isNil, mergeDeepWith } from "ramda";

const merge = (a: any, b: any) => {
  return isNil(b) ? a : b;
};

const deepMerge = (objectItem: any[]) =>
  objectItem.reduce((acc, obj) => {
    return mergeDeepWith(merge, acc, obj);
  }, {});

export default deepMerge;
