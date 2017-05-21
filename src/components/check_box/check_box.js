import { createEl } from '../../renderer'

function CheckBox(onClick, className, name) {
    return createEl({
        tagName: 'input',
        attrs: { class: className, type: 'checkbox', name: name },
        handlers: { click: onClick },
    })
}

export default CheckBox
