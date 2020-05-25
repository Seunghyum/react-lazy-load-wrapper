import React, { useState, useRef, useEffect } from 'react'
import LazyLoadObserver from './LazyLoadObserver'

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
const LazyLoadWrapper = props => {
  const ref = useRef(null)

  const [isVisible, setIsVisible] = useState(false)

  const onVisible = () => {
    setIsVisible(true)
  }

  useEffect(() => {
    const { target = ref.current, options, isTriggerOnce, label } = props

    if (!LazyLoadObserver.hasObserver(label)) {
      LazyLoadObserver.createObserver({ label, options, isTriggerOnce })
    }
    LazyLoadObserver.addObserveTarget({ label, target, callback: onVisible })
    return () => {
      LazyLoadObserver.disconnect(label)
    }
  }, [])

  const { children } = props

  return (
    <div ref={ref} className="lazy-load-wrapper">
      {isVisible && children}
    </div>
  )
}
export default LazyLoadWrapper
