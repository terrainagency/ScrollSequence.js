import {ScrollSequence} from './utils/components/ScrollSequence.js'

document.addEventListener('DOMContentLoaded', () => {

    // Define defaults
    

    // 2. Create a new ScrollSequence
    const sequence = new ScrollSequence({
        configPanels: {
            SnapSlider: {
                snap: {
                    snapTo: "labels", // snap to the closest label in the timeline
                    duration: {min: 0.1, max: 0.4}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                    delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
                    ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
                },
                test: {
                    
                }
            },
            Gallery: {
                test: {
                    
                }
            },
            Intro: {
                test: {
                    
                }
            }
        },
        debug: true,
    })

    // 3. Define animations for each panel
    sequence.panels.forEach(panel => {
        switch(panel.name) {

            case "Intro":
            case "Gallery":

                (() => {

                    // Do something

                })()
            
                break

            case "SnapSlider":
                
                (() => {
                    panel.master.scrollTrigger.onEnter = () => {
                        console.log("Entered Snap Slider")
                    }
                    panel.master.scrollTrigger.snap = {
                        snapTo: "labels", // snap to the closest label in the timeline
                        duration: {min: 0.1, max: 0.4}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                        delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
                        ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
                    }
                    
                    panel.master.addLabel("start")
                    panel.master.to("#rect", {rotate: 45})
                    panel.master.addLabel("intro")
                    panel.master.to("#rect", {backgroundColor: "#f0f", rotate: 0})
                    panel.master.addLabel("end")
                })()

                break
        }

        
    })
})