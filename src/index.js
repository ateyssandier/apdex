import './index.css'
import hostAppData from './host_app_data'
import HostTile from './components/host_tile'

const appMap = hostAppData.reduce((acc, app) => {
    acc[app.name] = app

    return acc
}, {})

let bucketedByHost = hostAppData.reduce((acc, app) => {
    // create a bucket for each host, and add the app to the bucket
    app.host.forEach(host => {
        acc[host] = acc[host] || { order: [], apps: {} }
        acc[host].order.push(app.name)
        acc[host].apps[app.name] = app.name
    })

    return acc
}, {})

// sort each list of app names by corresponding apdex
Object.keys(bucketedByHost).forEach(host => {
    bucketedByHost[host].order.sort((a, b) => appMap[b].apdex - appMap[a].apdex)
})

function genTaker(n) {
    return arr => arr.slice(0, n)
}

const take25 = genTaker(25)
const take5 = genTaker(5)

// return top 25 apps for a given host
function getTopAppsByHost(hostName) {
    return take25(bucketedByHost[hostName].order).map(name => appMap[name])
}

// for a given app name removes corresponding app from all hosts
function removeAppFromHosts(appName) {
    Object.keys(bucketedByHost).forEach(host => {
        // return early if a given host does not have an app with given name
        if (!bucketedByHost[host].apps[appName]) return

        delete bucketedByHost[host].apps[appName]
        bucketedByHost[host].order = bucketedByHost[host].order.filter(name => name !== appName)
    })
}

function validateApp(obj) {
    const isStr = str => typeof str === 'string'
    const isNum = str => typeof str === 'number'
    const isArray = Array.isArray

    const fieldValidators = {
        name: isStr,
        contributors: isArray,
        version: isNum,
        apdex: isNum,
        host: isArray,
    }

    return Object.keys(fieldValidators).every(key => obj[key] && fieldValidators[key](obj[key]))
}

// for a new given app adds app to all hosts
function addAppToHosts(app) {
    // if app invalid, do nothing
    if (!validateApp(app)) return

    // add to app map
    appMap[app.name] = app

    Object.keys(bucketedByHost).forEach(host => {
        bucketedByHost[host].apps[app.name] = app.name

        // insert at appropriate index
        const appIndex = bucketedByHost[host].order.findIndex(name => appMap[name].apdex < app.apdex)
        bucketedByHost[host].order.splice(appIndex, 0, app.name)

        // add the host to the app host list
        appMap[app.name].host.push(host)
    })
}

function appendToRoot(node) {
    let root = document.getElementById('root')

    root.appendChild(node)
}

function render() {
    Object.keys(bucketedByHost).forEach(hostName => {
        const host = bucketedByHost[hostName]
        const hydratedApps = take5(host.order).map(name => appMap[name])
        const node = HostTile(hostName, hydratedApps)

        appendToRoot(node)
    })
}

render()