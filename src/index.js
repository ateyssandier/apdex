import './index.css'
import hostAppData from '../host_app_data'

const appMap = hostAppData.reduce((acc, app) => {
    acc[app.name] = app

    return acc
}, {})

const bucketedByHost = hostAppData.reduce((acc, app) => {
    // create a bucket for each host, and add the app to the bucket
    app.hosts.forEach(host => {
        acc[host] = acc[host] || { sort: [], apps: {} }
        acc[host].apps[app.name] = app.name
    })

    return acc
}, {})