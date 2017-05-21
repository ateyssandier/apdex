import { createEl } from '../../renderer'
import './title_bar.css'

import { CheckBox } from '../index'

function TitleBar() {
    const title = 'Apps By Host'
    const username = 'a verylongemailaddress@companyname.com'
    const toggleLayout = () => {
        const container = document.getElementById('host-tile-container')

        container.classList.toggle('list-layout')
    }

    return (
        createEl({ tagName: 'div', attrs: { class: 'title-bar' } },
            createEl({ tagName: 'span', attrs: { class: 'title-bar-title' } }, title),
            createEl({ tagName: 'span', attrs: { class: 'title-bar-user' } }, `for user ${username}`),
            CheckBox(toggleLayout, 'show-as-list__input', 'show-as-list'),
            createEl({ tagName: 'label', attrs: { class: 'show-as-list__label', for: 'show-as-list' } }, 'Show as list')

        )
    )
}

export default TitleBar
