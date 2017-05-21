import App from './app'
import Host from './host'

class Apdex {
    constructor(hostAppData) {
        this.appMap = this.buildAppMap(hostAppData)
        this.hostMap = this.buildHostMap(hostAppData)
        this.sortTop25HostApps()
    }

    // O(n)
    buildAppMap(hostAppData) {
        return hostAppData.reduce((acc, app) => {
            acc[app.name] = new App(app)

            return acc
        }, {})
    }

    // O(n)
    buildHostMap(hostAppData) {
        return hostAppData.reduce((acc, app) => {
            // create a bucket for each host, and add the app to the bucket
            app.host.forEach(hostName => {
                acc[hostName] = acc[hostName] || new Host({ name: hostName, getApp: this.getApp.bind(this) })
                acc[hostName].addApp(app)
            })

            return acc
        }, {})
    }

    // O(n) * see README
    sortTop25HostApps() {
        this.getHosts().forEach(host => host.sortTop25AppsByApdex())
    }

    getApp(appName) {
        return this.appMap[appName]
    }

    getHost(hostName) {
        return this.hostMap[hostName]
    }

    getHosts(hostName) {
        return Object.keys(this.hostMap).map(hostName => this.getHost(hostName))
    }

    // O(1)
    getTopAppsByHost(hostName) {
        const host = this.getHost(hostName)

        return host.getTopNApps(25)
    }

    getHostTiles() {
        return this.getHosts().map(host => ({
            name: host.name,
            top5: host.getTopNApps(5),
        }))
    }

    removeAppFromHosts(appName) {
        this.getHosts().forEach(host => host.removeAppByName(appName))
    }

    addApp(app) {
        if (this.appMap[app.name]) return

        this.appMap[app.name] = new App(app)
    }

    addAppToHosts(app) {
        // add to app map
        this.addApp(app)

        this.getHosts().forEach(host => host.insertApp(app))
    }
}

export default Apdex
