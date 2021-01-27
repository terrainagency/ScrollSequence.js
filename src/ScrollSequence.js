document.addEventListener('DOMContentLoaded', () => {


    class ScrollSequence {
        constructor(settings) {
            this.container = settings.container
            this.triggerContainer = settings.triggerContainer
            this.panelsContainer = settings.panelsContainer
            this.panels = this.createPanels(settings.panels)
            this.debug = settings.debug
            this.init()
        }
        createPanels(panels) {
            let arr = []
            panels.forEach(panel => {
                let obj = {
                    container: panel,
                    name: panel.dataset.panel,
                    height: parseFloat(panel.dataset.height) * 100,
                }

                // Add panel to trigger container
                let str = `<div data-trigger`
                if(obj.name) {str += `="${obj.name}"`}
                str += ` class="border-t border-blue-500 p-4 text-blue-500 text-sm z-0"`
                if(obj.height) {str += ` style="height: ${obj.height}vh"`}
                str += `>${obj.name}</div>`
                this.triggerContainer.innerHTML += str

                arr.push(obj)

            })

            return arr
        }
        init() {
            if(this.debug) {this.initDebug()}

            // Pin the sequence
            gsap.registerPlugin(ScrollTrigger)

            ScrollTrigger.create({
                trigger: "[data-sequence]",
                start: "20px 20px",
                end: "bottom bottom",
                pin: "[data-panels]",
                onEnter: () => {},
                onEnterBack: () => {},
                onUpdate: self => this.showSequenceProg.innerHTML = self.progress.toFixed(2),
                pinSpacing: false,
                markers: false,
            })
            
        }
        initDebug() {
            this.panelsContainer.innerHTML += `
                <div class="absolute top-0 flex flex-col justify-end w-full h-screen p-4 text-sm" style="background-color: rgba(166, 218, 255, 0.2); box-shadow: inset 0 0 0 1px #0059fe; color: #0059fe;">
                    <div>
                        <p>panel: <span id="sequence-current">undefined</span></p>
                        <p>progression: <span id="panel-progress">0</span></p>
                        <br />
                        <p>sequence: ${this.container.dataset.sequence}</p>
                        <p>progression: <span id="sequence-progress">0</span></p>
                        <p>viewport: ${window.innerHeight}px</p>
                        <p>height: ${this.container.offsetHeight}px</p>
                        <p>hRatio: ${this.container.offsetHeight / window.innerHeight * 100}%</p>
                    </div>
                </div>
            `
            this.showSequenceProg = document.querySelector(`#sequence-progress`) 
            this.showPanelProg = document.querySelector(`#panel-progress`)
            this.showCurrentSeq = document.querySelector("#sequence-current")

            ScrollTrigger.defaults({
                toggleActions: "play pause resume reset",
                markers: {startColor: "#0059fe", endColor: "#80adff", fontSize: "10px", indent: 10},
                onEnter: self => this.showCurrentSeq.innerHTML = self.trigger.dataset.trigger,
                onEnterBack: self => this.showCurrentSeq.innerHTML = self.trigger.dataset.trigger,
                onUpdate: self => this.showPanelProg.innerHTML = self.progress.toFixed(2),
            })
        }
 
    }


    // Create sequence
    const sequence = new ScrollSequence({
        container: document.querySelector("[data-sequence]"),
        triggerContainer: document.querySelector("[data-triggers]"),
        panelsContainer: document.querySelector("[data-panels]"),
        panels: document.querySelectorAll("[data-panel]"),
        // paddingTop: 0.5
        // paddingBottom: 0.5
        debug: true,
    })

    // Create Panels
    sequence.panels.forEach(panel => {

        switch(panel.name) {

            case "intro":
            case "features":
            case "buybox":

                (() => {
                    let master = gsap.timeline({
                        scrollTrigger: {
                            trigger: `[data-trigger="${panel.name}"]`,
                            start: "top center",
                            end: "bottom center",
                            // end: () => {return `+=${panel.trigger.offsetHeight}`},
                            scrub: true,
                        }
                    })
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
    
                    // let states = panel.container.querySelectorAll("[data-state]")
    
                    // states.forEach(state => {
                    //     let name = state.dataset.state
                    //     master.addLabel(name)
    
                    //     function animateChair() {
                    //         let tl = gsap.timeline()
                    //         return tl
                    //     }
    
                    //     master.add(animateChair())
    
                    // })
    
                    // console.log(master)

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
  


    // // Master timeline for each panel
    // sequence.panels.forEach(panel => {
    //     switch(panel.name) {
    //         case "myPanel":
    //             // Define master timeline
    //             let master = new TimelineMax({paused: true})

    //             gsap.registerPlugin(ScrollTrigger)

    //             ScrollTrigger.create({
    //                 trigger: panel.trigger,
    //                 start: "top",
    //                 end: "bottom",
    //                 toggleActions: "play pause resume reset",
    //                 animation: master,    
    //                 onEnter: () => console.log(panel),
    //                 markers: true,
    //             })
    //             break
    //         default:
    //             console.log("Error: panel.name not found")
    //     }
    // })
})