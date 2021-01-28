import {ScrollSequence} from './utils/components/ScrollSequence.js'

document.addEventListener('DOMContentLoaded', () => {

    // 2. Create a new ScrollSequence
    const sequence = new ScrollSequence({
        // panelSettings = {

        // }
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

                    // panel.master.scrollTrigger.snap =  {
                    //     snapTo: "labels", // snap to the closest label in the timeline
                    //     duration: {min: 0.2, max: 3}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                    //     delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
                    //     ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
                    // }
                    // panel.master.scrollTrigger.refresh()
                    // Do something
                    console.log(panel.master)

                })()

                break
        }
    })
})