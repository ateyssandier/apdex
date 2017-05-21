import createEl from '../renderer'
import './app_entry.css'

function AppEntry({ name, apdex, version }) {
    const onClick = () => alert(`${name}\n\nVersion: ${version}`)

    return (
        createEl({ tagName: 'div', attrs: { class: 'app-entry' } },
            createEl({ tagName: 'span', attrs: { class: 'app-entry-apdex' } }, apdex),
            createEl({ tagName: 'span', attrs: { class: 'app-entry-name' }, handlers: { click: onClick } }, name),
        )
    )
}

export default AppEntry
