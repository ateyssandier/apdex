import AppEntry from './app_entry'
import './host_tile.css'

function HostTile(hostName, apps) {
    return (
        `<div class="host-tile">
            <div class="host-tile-name">${hostName}</div>
            ${apps.map(app => AppEntry(app)).join('')}
        </div>`
    )
}

export default HostTile