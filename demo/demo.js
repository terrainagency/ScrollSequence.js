import {ScrollSequence} from './utils/components/ScrollSequence.js'

document.addEventListener('DOMContentLoaded', () => {


    // 1. Create a new ScrollSequence
    const sequence = new ScrollSequence("#FirstSequence", {

        // 2. Configure sequence settings

        // 3. Configure any unique panel settings
        config: {

            // NOTE: Must match the associated [data-panel] value
            SnapSlider: {
                snap: {
                    snapTo: "labels", 
                    duration: {min: 0.1, max: 0.4}, 
                    delay: 0.2, 
                    ease: "power1.inOut" 
                }
            }
        },

        // 4. Turn on debug?
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

                        // var topScroll = window.innerWidth < 737 ? 50 : 100;

                        panel.master.addLabel("start") // start

                        panel.master.to("#rect", {rotate: 45})
                        panel.master.addLabel("intro")
                        panel.master.to("#rect", {backgroundColor: "#0059FE", rotate: 0})
    
                        panel.master.addLabel("end") // end

                })()

                break
        }

        
    })
})