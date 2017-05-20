import createEl from '../renderer'
import './app_entry.css'


// function AppEntry({ name, apdex }) {
//     return (
//         `<div class="app-entry">
//             <span class="app-entry-apdex">${apdex}</span>
//             ${name}
//         </div>`
//     )
// }

// export default AppEntry

function AppEntry({ name, apdex }) {
    return (
        createEl({ tagName: 'div', attrs: { class: 'app-entry' } },
            createEl({ tagName: 'span', attrs: { class: 'app-entry-apdex' } }, apdex),
            name
        )
    )
}

export default AppEntry
