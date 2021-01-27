import {ScrollSequence} from './utils/components/ScrollSequence.js'

document.addEventListener('DOMContentLoaded', () => {

    // 2. Create a new ScrollSequence
    const sequence = new ScrollSequence({debug: true})

    // 3. Define animations for each panel
    sequence.panels.forEach(panel => {
        switch(panel.name) {

            case "Intro":
            case "Gallery":

                (() => {

                    

                })()
            
                break

            case "SnapSlider":

                (() => {
    
                    let states = panel.container.querySelectorAll("[data-state]")
    
                    states.forEach(state => {
                    

                        // let name = 
                        panel.master.addLabel(state.dataset.state)
    
                        // let tl = gsap.timeline()
                        //     // Do something
    
                        // // Add to master
                        // state.master.add(tl)

                        
                    })

                    console.log(panel.master)

                    
    
                    // master.addLabel("first")
                    //   .from(".box p", {scale: 0.3, rotation:45, autoAlpha: 0})
    
                    //   .addLabel("second")
                    //   .from(".box", {backgroundColor: "#28a92b"})
    
                    //   .addLabel("third")
    
                    //   .to(".box", {rotation: 360})
                    //   .addLabel("fourth");
                })()

                break
        }
    })
})