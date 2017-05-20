function appendToNode(node, child) {
    const toAppend = child instanceof HTMLElement
        ? child
        : document.createTextNode(`${child}`)

    return node.appendChild(toAppend)
}

function createEl({ tagName, handlers={}, attrs={} }, ...children) {
    const el = document.createElement(tagName)

    Object.keys(handlers).forEach(eventName => el.addEventListener(eventName, handlers[eventName]))

    Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]))

    children.forEach(child => appendToNode(el, child))

    return el
}

export default createEl