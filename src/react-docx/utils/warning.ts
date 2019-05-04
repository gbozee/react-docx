type MessageFormat = { replace: (arg0: RegExp, arg1: () => any) => string };

function printWarning(format: MessageFormat, ...args: any[]) {
  let argIndex = 0;
  const message = "Warning: " + format.replace(/%s/g, () => args[argIndex++]);

  if (typeof console !== "undefined") {
    console.error(message);
  }

  try {
    throw new Error(message);
  } catch (x) {}
}

const __DEV__ = process.env.NODE_ENV !== "production";

const warning = __DEV__
  ? (condition: any, format: MessageFormat | undefined, ...args: any) => {
      if (format === undefined) {
        throw new Error(
          "`warning(condition, format, ...args)` requires a warning " +
            "message argument"
        );
      }
      if (!condition) {
        printWarning(format, ...args);
      }
    }
  : () => {};

export default warning;
