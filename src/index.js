import './index.css'
import hostAppData from './host_app_data'

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

function take25(arr) {
    return arr.slice(0, 25)
}

// return top 25 apps for a given host
function getTopAppsByHost(hostName) {
    return take25(bucketedByHost[hostName].order).map(name => appMap[name])
}

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

debugger