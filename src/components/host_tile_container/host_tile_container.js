import { createEl } from '../../renderer'
import './host_tile_container.css'

import { HostTile } from '../index'

function HostTileRow(tiles) {
    const hostTiles = tiles.map(tile => HostTile(tile.name, tile.top5))

    return createEl({ tagName: 'div', attrs: { class: 'host-tile-row' } }, ...hostTiles)
}

function HostTileContainer(hostTiles) {
    const tileRows = hostTiles.reduce((acc, tile, i) => {
        i % 2 === 0
            ? acc.push([tile])
            : acc[acc.length-1].push(tile)

        return acc
    }, [])

    return createEl({ tagName: 'div', 'attrs': { id: 'host-tile-container' } },
        ...tileRows.map(row => HostTileRow(row))
    )
}

export default HostTileContainer
