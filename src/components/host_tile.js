import createEl from '../renderer'
import AppEntry from './app_entry'
import './host_tile.css'

// function HostTile(hostName, apps) {
//     return (
//         `<div class="host-tile">
//             <div class="host-tile-name">${hostName}</div>
//             ${apps.map(app => AppEntry(app)).join('')}
//         </div>`
//     )
// }

// export default HostTile

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

