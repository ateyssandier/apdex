class Host {
    constructor(data = {}) {
        this.name = data.name || ''
        this.order = data.order || []
        this.apps = data.apps || {}
        this.getApp = data.getApp || null
    }

    addApp(app) {
        // return early if app already present
        if (this.apps[app.name]) return

        this.order.push(app.name)
        this.apps[app.name] = app.name
    }

    insertApp(app) {
        // return early if app already present
        if (this.apps[app.name]) return

        // insert at appropriate index
        const appIndex = this.order.findIndex(name => this.getApp(name).apdex < app.apdex)
        this.order.splice(appIndex, 0, app.name)

        // add the host to the app host list
        this.getApp(app.name).addHostName(this.name)
    }

    removeApp(appName) {
        // return early if app not present
        if (!this.apps[appName]) return

        delete this.apps[appName]
        this.order = this.order.filter(name => name !== appName)
    }

    // Assumption: the host's entire application list has to be ordered by apdex* (see README)
    //
    // `sortAppsByApdex` runs in O(n log n) (generally)
    // The ECMAScript standard does not specify which algorithm a `Array.sort` must use.

    // Chrome and Webkit implement quicksort for numerical comparisons, which is generally O(n log n)
    // and faster than stable sorts though its worst case scenario is 0(n^2)
    // Firefox uses mergesort exclusively so it will be O(n log n)
    // IE is closed source, but I have read it is 'stable' and therefore likely mergesort and likely 0(n log n)

    // *IF the host's entire application list did not have to be ordered by apdex, we could achieve O(n),
    // by only selecting the top 25 rated apps
    sortAppsByApdex() {
        this.order.sort((a, b) => this.getApp(b).apdex - this.getApp(a).apdex)
    }

    getTopNApps(n) {
        const topNApps = this.order.slice(0, n)

        return topNApps.map(appName => this.getApp(appName))
    }
}

export default Host
