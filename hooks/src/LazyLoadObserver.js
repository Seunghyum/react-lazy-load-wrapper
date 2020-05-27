const defaultOptions = { root: null, rootMargin: '0px 0px 0px 0px', threshold: 0 }

class LazyLoadObserver {
  constructor() {
    this.observerInstances = new Map()
    /** @type {Map<Node, Function[]>} */
    this.obCallbacks = new Map()
  }

  removeObserver(label) {
    this.observerInstances.delete(label)
  }

  createObserver({ label, options = defaultOptions }) {
    const callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const callbacks = this.obCallbacks.get(entry.target)
          callbacks.forEach(cb => cb())
        }
      })
    }
    const instance = new IntersectionObserver(callback, options)
    this.observerInstances.set(label, instance)
  }

  hasObserver(label) {
    return this.observerInstances.has(label)
  }

  addObserveTarget({ label, target, callback, isTriggerOnce }) {
    const observerInstance = this.getObserver(label)
    if (!observerInstance) return console.error(`observerInstance not exist by label : ${label}`)

    if (!this.obCallbacks.has(target)) this.obCallbacks.set(target, [])

    const callbacks = this.obCallbacks.get(target)
    const unsubscribe = () => {
      if (callbacks.splice(callbacks.indexOf(callback), 1).length === 0) {
        this.removeObserveTarget(label, target)
      }
    }

    callbacks.push(
      isTriggerOnce
        ? () => {
            unsubscribe()
            callback()
          }
        : callback,
    )
    observerInstance.observe(target)

    return unsubscribe
  }

  removeObserveTarget(label, target) {
    const observerInstance = this.getObserver(label)
    if (!observerInstance) return console.error(`observerInstance not exist by label : ${label}`)
    observerInstance.unobserve(target)
    this.obCallbacks.delete(target)
  }

  disconnect(label) {
    this.getObserver(label).disconnect()
  }

  getObserver(label) {
    return this.observerInstances.get(label)
  }
}

export default new LazyLoadObserver()
