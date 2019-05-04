import { compose, equals, type } from "ramda";
type Func = (x: {}) => any;
const isFunction = compose(
  equals("Function") as Func | any,
  type as Func | any
) as any;

export default isFunction;
