import {ScrollSequence} from './ScrollSequence.js'

document.addEventListener('DOMContentLoaded', () => {

    // Create and define sequence
    const sequence = new ScrollSequence({
        // container: "[data-sequence]",
        // triggerContainer: "[data-triggers]",
        // panelsContainer: "[data-panels]",
        // panels: "[data-panel]",

        // paddingTop: 0.5
        // paddingBottom: 0.5

        debug: true,
    })

    // Create Panels
    sequence.panels.forEach(panel => {

        switch(panel.name) {

            case "intro":
            case "Gallery":
            case "SnapSlider":

                (() => {
                    console.log(panel.master.scrollTrigger)
                    // let master = gsap.timeline({
                    //     scrollTrigger: {
                    //         trigger: `[data-trigger="${panel.name}"]`,
                    //         start: "top center",
                    //         end: "bottom center",
                    //         // end: () => {return `+=${panel.trigger.offsetHeight}`},
                    //         scrub: true,
                    //     }
                    // })
                })()
            
                break

            case "features-disabled":

                (() => {

                    let master = gsap.timeline({
                        scrollTrigger: {
                            trigger: panel.trigger,
                            scrub: true,
                            // snap: {
                            //     snapTo: "labels",
                            //     duration: {min: 0.2, max: 3},
                            //     delay: 0.2,
                            //     ease: "power1.inOut" 
                            // },
                        }
                    })
    
                    let states = panel.container.querySelectorAll("[data-state]")
    
                    states.forEach(state => {
                        let name = state.dataset.state
                        master.addLabel(name)
    
                        let tl = gsap.timeline()
                            // Do something
    
                        // Add to master
                        master.add(tl)
                    })
    
                    // master.addLabel("first")
                    //   .from(".box p", {scale: 0.3, rotation:45, autoAlpha: 0})
    
                    //   .addLabel("second")
                    //   .from(".box", {backgroundColor: "#28a92b"})
    
                    //   .addLabel("third")
    
                    //   .to(".box", {rotation: 360})
                    //   .addLabel("fourth");
                })()

                break

            default:
                console.log(`Panel not found: switch value "${panel.name}" does not match an existing data-panel value`)
        }
    })
})