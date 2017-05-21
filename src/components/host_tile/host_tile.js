import { createEl } from '../../renderer'
import './host_tile.css'

import { AppEntry } from '../index'

function HostTile(hostName, apps) {
    return (
        createEl({ tagName: 'div', attrs: { class: 'host-tile' } },
            createEl({ tagName: 'div', attrs: { class: 'host-tile-name' } },
                hostName
            ),
            ...apps.map(app => AppEntry(app))
        )
    )
}

export default HostTile
