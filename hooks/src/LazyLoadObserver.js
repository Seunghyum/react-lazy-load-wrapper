const defaultOptions = { root: null, rootMargin: '0px 0px 0px 0px', threshold: 0 }

class LazyLoadObserver {
  constructor(options = defaultOptions) {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const callbacks = this.obCallbacks.get(entry.target)
          callbacks.forEach(cb => cb())
        }
      })
    }, options)

    /** @type {Map<Node, Function[]>} */
    this.obCallbacks = new Map()
  }

  addObserveTarget({ target, callback, isTriggerOnce }) {
    if (!this.obCallbacks.has(target)) this.obCallbacks.set(target, [])

    const callbacks = this.obCallbacks.get(target)
    const unsubscribe = () => {
      callbacks.splice(callbacks.indexOf(callback), 1)
      if (callbacks.length === 0) this.removeObserveTarget(target)
    }

    callbacks.push(
      isTriggerOnce
        ? () => {
            unsubscribe()
            callback()
          }
        : callback,
    )
    this.observer.observe(target)

    return unsubscribe
  }

  removeObserveTarget(target) {
    this.observer.unobserve(target)
    this.obCallbacks.delete(target)
  }
}

export default LazyLoadObserver
