import clsx from 'clsx'
import { chain, mergeIds } from '@react-aria/utils'
import { Props } from 'tastycss-react'

/**
 * Merges multiple props objects together. Event handlers are chained,
 * classNames are combined, and ids are deduplicated - different ids
 * will trigger a side-effect and re-render components hooked up with `useId`.
 * For all other props, the last prop object overrides all previous ones.
 * @param args - Multiple sets of props to merge together.
 */
export function mergeProps(...args: (Props | undefined)[]) {
  const result: Props = {}

  for (const props of args) {
    for (const key in result) {
      // Chain events
      if (
        /^on[A-Z]/.test(key) &&
        typeof result[key] === 'function' &&
        props &&
        typeof props[key] === 'function'
      ) {
        result[key] = chain(result[key], props[key])

        // Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
      } else if (
        key === 'className' &&
        typeof result.className === 'string' &&
        props &&
        typeof props.className === 'string'
      ) {
        result[key] = clsx(result.className, props.className)
      } else if (
        key === 'styles' &&
        typeof result.styles === 'object' &&
        props &&
        typeof props.styles === 'object'
      ) {
        result[key] = { ...result.styles, ...props.styles }
      } else if (key === 'id' && result.id && props?.id) {
        result.id = mergeIds(result.id, props?.id)
        // Override others
      } else {
        result[key] =
          props && props[key] !== undefined ? props[key] : result[key]
      }
    }

    // Add props from b that are not in a
    for (const key in props) {
      if (result[key] === undefined) {
        result[key] = props[key]
      }
    }
  }

  return result
}
