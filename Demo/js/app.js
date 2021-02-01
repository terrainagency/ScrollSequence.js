import {ScrollSequence} from './ghost/components/ScrollSequence.js'

// 1. Define your preferred debug settings
let debug = {
    // primary: {r: 155, g: 0, b: 155},
    // secondary: {r: 0, g: 155, b: 155},
    position: "top left"
}

document.addEventListener("DOMContentLoaded", function() {

    // 2. Create a new ScrollSequence instance
    const sequence = new ScrollSequence("#sequence", {
        panelSelector: "[data-panel]",
        // onUpdate: () => console.log("Sequence entered"),
        panels: {
            features: {
                marginTop: "50vh",
                marginBottom: "50vh",
                // snap: 0.3333333333
            },
        },
        debug: debug
    })

    // 3. Loop through panels and build on their master timelines 
    sequence.panels.forEach(panel => {
        switch(panel.name) {
    
            case "features":
    
                (() => {
    
                    // Do something
    
                })()
    
                break
        }
    })
})

