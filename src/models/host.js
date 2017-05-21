class Host {
    constructor(data = {}) {
        this.name = data.name || ''
        this.top25 = data.top25 || []
        this.unsortedApps = data.unsortedApps || []
        this.getApp = data.getApp || null
    }

    addApp(app) {
        if(!app) return

        this.unsortedApps.push(app.name)
    }

    appendTopAppName(appName) {
        if(!appName) return

        this.top25.push(appName)
    }

    insertApp(app) {
        if(!app) return

        // insert at appropriate index if top 25
        const appIndex = this.top25.findIndex(name => this.getApp(name).apdex < app.apdex)
        appIndex !== -1
            ? this.top25.splice(appIndex, 0, app.name)
            : this.unsortedApps.push(app.name)

        // add the host to the app host list
        this.getApp(app.name).addHostName(this.name)
    }

    selectTopUnsortedAppName() {
        if (this.unsortedApps.length < 1) return

        const getHigherApdex = (a, b) => this.getApp(a).apdex > this.getApp(b).apdex ? a : b

        return this.unsortedApps.reduce(getHigherApdex)
    }

    removeAppByName(appName) {
        if (!this.top25.includes(appName)) {
            this.unsortedApps = this.unsortedApps.filter(name => name !== appName)
        } else {
            this.top25 = this.top25.filter(name => name !== appName)
            const nextTopApp = this.selectTopUnsortedAppName()

            this.removeAppByName(nextTopApp)

            this.appendTopAppName(nextTopApp)
        }

        const app = this.getApp(appName)
        app && app.removeHostName(this.name)
    }

    // Assumption: the host's entire application list does not have to be ordered by apdex* (see README)
    //
    // `sortTop25AppsByApdex` runs in O(n)

    // *IF the host's entire application list had to be ordered by apdex, we would have to sort
    // the whole list and thus arrive at O(n log n)
    sortTop25AppsByApdex() {
        for (let i = 0; i < 25; i++) {
            const topApp = this.selectTopUnsortedAppName()
            if (!topApp) return

            this.removeAppByName(topApp)
            this.appendTopAppName(topApp)
        }
    }

    getTopNApps(n) {
        const topNApps = this.top25.slice(0, n)

        return topNApps.map(appName => this.getApp(appName))
    }
}

export default Host
