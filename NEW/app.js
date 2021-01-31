import {ScrollSequence} from './ScrollSequence.js'

// 1. Define your preferred debug settings
let debug = {
    primary: {r: 155, g: 0, b: 155, a: 0.1},
    secondary: {r: 0, g: 155, b: 155, a: 0.2},
    position: "top left"
}

const sequence = new ScrollSequence("#sequence", {
    panels: "[data-panel]",
    settings: {
        features: {
            snap: true
        },
    },
    debug: debug
})

sequence.panels.forEach(panel => {
    switch(panel.name) {

        case "features":

            (() => {

                // Do something

            })()

            break

        default: console.log("panel not found")
    }
})