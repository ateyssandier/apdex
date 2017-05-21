import HostTile from './host_tile'
import createEl from '../renderer'
import './host_tile_container.css'

function genTaker(n) {
    return arr => arr.slice(0, n)
}

const take5 = genTaker(5)

function HostTileRow(appMap, bucketedByHost, children) {
    const tiles = children.map(hostName => {
        const host = bucketedByHost[hostName]
        const hydratedApps = take5(host.order).map(name => appMap[name])

        return HostTile(hostName, hydratedApps)
    })

    return createEl({ tagName: 'div', attrs: { class: 'host-tile-row' } }, ...tiles)
}

function HostTileContainer(bucketedByHost, appMap) {
    const rows = Object.keys(bucketedByHost).reduce((acc, hostName, i) => {
        i % 2 === 0
            ? acc.push([hostName])
            : acc[acc.length-1].push(hostName)

        return acc
    }, [])

    return createEl({ tagName: 'div', 'attrs': { id: 'host-tile-container' } },
        ...rows.map(row => HostTileRow(appMap, bucketedByHost, row))
    )
}

export default HostTileContainer
