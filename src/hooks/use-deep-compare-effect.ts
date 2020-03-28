import React from "react";
import { isEqual, isObject } from "lodash";

// https://github.com/kentcdodds/use-deep-compare-effect

function checkDeps(deps: any) {
  if (!deps || !deps.length) {
    throw new Error(
      "useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead."
    );
  }
  if (deps.every(isPrimitive)) {
    throw new Error(
      "useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead."
    );
  }
}

function isPrimitive(val: any) {
  return val === null || !isObject(val);
}

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffect(
  callback: React.EffectCallback,
  dependencies: React.DependencyList
) {
  if (process.env.NODE_ENV !== "production") {
    checkDeps(dependencies);
  }
  React.useEffect(callback, useDeepCompareMemoize(dependencies));
}

export function useDeepCompareEffectNoCheck(
  callback: React.EffectCallback,
  dependencies: React.DependencyList
) {
  React.useEffect(callback, useDeepCompareMemoize(dependencies));
}

export default useDeepCompareEffect;
