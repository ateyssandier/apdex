import createEl from '../renderer'
import './title_bar.css'

function TitleBar() {
    const title = 'Apps By Host'
    const username = 'a verylongemailaddress@companyname.com'
    const onClick = () => {
        const container = document.getElementById('host-tile-container')

        container.classList.toggle('list-layout')
    }

    return (
        createEl({ tagName: 'div', attrs: { class: 'title-bar' } },
            createEl({ tagName: 'span', attrs: { class: 'title-bar-title' } }, title),
            createEl({ tagName: 'span', attrs: { class: 'title-bar-user' } }, `for user ${username}`),
            createEl({ tagName: 'input', attrs: { class: 'show-as-list', type: 'checkbox', name: 'show-as-list' }, handlers: { click: onClick } }),
            createEl({ tagName: 'label', attrs: { class: 'show-as-list-label', for: 'show-as-list' } }, 'Show as list')

        )
    )
}

export default TitleBar