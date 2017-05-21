class Host {
    constructor(data = {}) {
        this.name = data.name || ''
        this.order = data.order || []
        this.apps = data.apps || []
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
        app.addHostName(this.name)
    }

    removeApp(appName) {
        // return early if app not present
        if (!this.apps[appName]) return

        delete this.apps[appName]
        this.order = this.order.filter(name => name !== appName)
    }

    sortAppsByApdex() {
        this.order.sort((a, b) => this.getApp(b).apdex - this.getApp(a).apdex)
    }
}

export default Host
