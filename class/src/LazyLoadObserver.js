const defaultOptions = { root: null, rootMargin: '0px 0px 0px 0px', threshold: 0 }

class LazyLoadObserver {
  constructor() {
    this.observerInstances = new Map() // IntersectionObserver instances
    this.obCallbacks = new Map() // hashtable for callback(onVisible)
  }

  removeObserver(label) {
    this.observerInstances.delete(label)
  }

  createObserver({ label, options = defaultOptions, isTriggerOnce }) {
    const callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const getCallback = this.obCallbacks.get(entry.target)
          getCallback()
          if (isTriggerOnce) this.removeObserveTarget(label, entry.target)
        }
      })
    }
    const instance = new IntersectionObserver(callback, options)
    this.observerInstances.set(label, instance)
  }

  hasObserver(label) {
    return this.observerInstances.has(label)
  }

  addObserveTarget({ label, target, callback }) {
    const observerInstance = this.getObserver(label)
    if (!observerInstance) return console.error(`observerInstance not exist by label : ${label}`)
    this.obCallbacks.set(target, callback)
    observerInstance.observe(target)
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
