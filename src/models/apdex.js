import App from './app'
import Host from './host'

import { take25 } from '../utils'

class Apdex {
    constructor(hostAppData) {
        this.appMap = this.buildAppMap(hostAppData)
        this.hostMap = this.buildHostMap(hostAppData)
        this.sortHostApps()
    }

    buildAppMap(hostAppData) {
        return hostAppData.reduce((acc, app) => {
            acc[app.name] = new App(app)

            return acc
        }, {})
    }

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

    sortHostApps() {
        this.getHosts().forEach(host => host.sortAppsByApdex())
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

    getTopAppsByHost(hostName) {
        const host = this.getHost(hostName)

        return take25(host.order).map(appName => this.getApp(appName))
    }

    removeAppFromHosts(appName) {
        this.getHosts().forEach(host => host.removeApp(appName))
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
