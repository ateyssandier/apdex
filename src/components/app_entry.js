import './app_entry.css'

function AppEntry({ name, apdex }) {
    return (
        `<div class="app-entry">
            <span class="app-entry-apdex">${apdex}</span>
            ${name}
        </div>`
    )
}

export default AppEntry
