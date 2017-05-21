export function appendToRoot(...nodes) {
    let root = document.getElementById('root')

    nodes.forEach(node => root.appendChild(node))
}

function appendAsNode(node, child) {
    const toAppend = child instanceof HTMLElement
        ? child
        : document.createTextNode(`${child}`)

    return node.appendChild(toAppend)
}

export function createEl({ tagName, handlers={}, attrs={} }, ...children) {
    const el = document.createElement(tagName)

    Object.keys(handlers).forEach(eventName => el.addEventListener(eventName, handlers[eventName]))

    Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]))

    children.forEach(child => appendAsNode(el, child))

    return el
}
