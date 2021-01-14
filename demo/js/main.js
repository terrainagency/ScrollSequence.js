import {ScrollSequence} from './utils.js'

document.addEventListener('DOMContentLoaded', () => {

    // Define ScrollSequence
    let sequence = new ScrollSequence({
        container: "[data-sequence]",
        panels: "[data-panel]",
        triggerContainer: "[data-triggers]",
    })

    // Master timeline for each panel
    sequence.panels.forEach(panel => {
        switch(panel.name) {
            case "myPanel":
                // Define master timeline
                let master = new TimelineMax({paused: true})

                gsap.registerPlugin(ScrollTrigger)
                
                ScrollTrigger.create({
                    trigger: panel.trigger,
                    start: "top",
                    end: "bottom",
                    toggleActions: "play pause resume reset",
                    animation: master,    
                    onEnter: () => console.log(panel),
                    markers: true,
                })
            break
        }
    })
})