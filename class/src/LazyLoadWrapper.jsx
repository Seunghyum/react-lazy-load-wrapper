import React, { Component } from 'react'
import LazyLoadObserver from './LazyLoadObserver'

/**
 * https://github.com/thebuilder/react-intersection-observer#readme 참고
 * @param {Boolean} isTriggerOnce
 * @param {DOMNode} target
 * @param {Object} options {
 *     @param {DOMNode} root
 *     @param {Boolean} threshold
 *     @param {String} rootMargin
 * }
 * @param {Callback} onTrigger
 * @param {String} label // 적용할 IntersectionObserver 객체 구분자
 */

class LazyLoadWrapper extends Component {
  ref = React.createRef()

  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
    }
  }

  componentDidMount() {
    const { target = this.ref.current, options, isTriggerOnce, label } = this.props
    if (!LazyLoadObserver.hasObserver(label)) {
      LazyLoadObserver.createObserver({ label, options, isTriggerOnce })
    }
    LazyLoadObserver.addObserveTarget({ label, target, callback: this.onVisible })
  }

  componentWillUnmount() {
    const { label } = this.props
    LazyLoadObserver.disconnect(label)
  }

  onVisible = () => {
    this.setState({ isVisible: true })
  }

  render() {
    const { isVisible } = this.state
    const { children } = this.props
    return (
      <div ref={this.ref} className="lazy-load-wrapper">
        {isVisible && children}
      </div>
    )
  }
}
export default LazyLoadWrapper
