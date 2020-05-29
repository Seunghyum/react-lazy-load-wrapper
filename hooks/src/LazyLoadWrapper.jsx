import React, { useState, useRef, useEffect } from 'react'
import LazyLoadObserver from './LazyLoadObserver'

/** @type {Map<string, LazyLoadObserver>} */
const observerMap = new Map()

/**
 * https://github.com/thebuilder/react-intersection-observer#readme 참고
 * @param {object} props
 * @param {boolean} [props.isTriggerOnce]
 * @param {Node} [props.target]
 * @param {object} [props.options]
 * @param {Node} [props.options.root]
 * @param {boolean} [props.options.threshold]
 * @param {string} [props.options.rootMargin]
 * @param {Function} [props.onTrigger]
 * @param {string} [props.label] - 적용할 IntersectionObserver 객체 구분자
 * @param {import('react').ReactNode} [props.children]
 */
const LazyLoadWrapper = ({ target, options, isTriggerOnce, label, children }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!observerMap.has(label)) observerMap.set(label, new LazyLoadObserver(options))
    return observerMap.get(label).add(target ?? ref.current, () => setIsVisible(true), { isTriggerOnce })
  }, [target || ref.current, options, isTriggerOnce, label])

  return (
    <div ref={ref} className="lazy-load-wrapper">
      {isVisible && children}
    </div>
  )
}
export default LazyLoadWrapper
