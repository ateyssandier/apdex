import createEl from '../renderer'
import './host_tile.css'

function toggleClass(el, className) {
    el.classList.toggle(className)
}

function TitleBar() {
    const title = 'Apps By Host'
    const username = 'a verylongemailaddress@companyname.com'
    const onClick = () => {
        const container = document.getElementById('host-tile-container')

        toggleClass(container, 'list-layout')
    }

    return (
        createEl({ tagName: 'div', attrs: { class: 'title-bar' } },
            createEl({ tagName: 'span', attrs: { class: 'title-bar-title' } }, title),
            createEl({ tagName: 'span', attrs: { class: 'title-bar-user' } }, `for user ${username}`),
            createEl({ tagName: 'input', attrs: { type: 'checkbox', name: 'show-as-list' }, handlers: { click: onClick } }),
            createEl({ tagName: 'label', attrs: { for: 'show-as-list' } }, 'Show as List')

        )
    )
}

export default TitleBar