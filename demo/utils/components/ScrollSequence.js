// 1: Take in configurations
// 2: Configurations vs defaults
// 3: Build DOM elements
// 4: Init

export class ScrollSequence {
    constructor(el, settings) {
        // DOM Manipulation
        this.debug = this.configDebug(settings.debug)
        this.container = document.querySelector(el)
        this.triggerContainer = this.buildTriggerContainer(settings.paddingTop, settings.paddingBottom) 
        this.panelsContainerSelector = settings.panelsContainer
        this.panels = this.buildPanels(settings.panelSelector, settings.config ? settings.config : {})

        // Initialization
        this.init()
    }
    // Add Trigger Container to DOM
    buildTriggerContainer(paddingTop, paddingBottom) {
        let pt = paddingTop ? paddingTop : "50vh"
        let pb = paddingBottom ? paddingBottom : "50vh"

        // if(!padding) {padding = "50vh"}
        this.container.innerHTML += `<!-- Trigger Container --><div data-triggers style="padding-top: ${pt};  padding-bottom: ${pb};"></div>`

        return this.container.querySelector("[data-triggers]")
    }
    // Define sequence.panels and add panel
    buildPanels(panelSelector, config) {
        let panels = this.container.querySelectorAll(panelSelector ? panelSelector : "[data-panel]") // default: [data-panel]
        let arr = []

        panels.forEach((panel, i) => {
            let states = panel.querySelectorAll("[data-state]")
            let settings = config[panel.dataset.panel] ? config[panel.dataset.panel] : {}  

            arr.push({
                name: panel.dataset.panel,
                container: panel,
                settings: settings,
                states: this.buildStates(panel, states),
                // snapPos: this.buildSnap(states)           
            })

            let marginTop = settings.marginTop ? settings.marginTop : 0
            let marginBottom = settings.marginBottom ? settings.marginBottom : 0

            let str = `<div data-trigger="${panel.dataset.panel}" style="display: flex; flex-direction: column; height: ${parseFloat(panel.dataset.height) * 100}vh; margin-top: ${marginTop}; margin-bottom: ${marginBottom}; `
            if(this.debug) {
                str += `background-color: ${this.debug.bg}; color: ${this.debug.primary}; font-size: 0.875rem; line-height: 1.25rem; border-top: 1px solid ${this.debug.primary}; `
                if(i === arr.length - 1) {str += `border-bottom: 1px solid ${this.debug.primary};`}
            }
            str += `">`

            if(this.debug){str += `<div style="position: absolute; padding: 1rem;">${panel.dataset.panel}</div>`}

            if(states) {
                states.forEach((state, i) => {
                    if(this.debug) {
                        str += `<div data-trigger="${state.dataset.state}" style="flex: 1 1 0%; text-align: right; font-size: 0.875rem; line-height: 1.25rem; padding: 1rem; border-top: 1px solid ${this.debug.primary}">${state.dataset.state}</div>`
                    } else {
                        str += `<div data-trigger="${state.dataset.state}" style="flex: 1 1 0%;"></div>`
                    }
                })
            }

            str += `</div>`

            this.triggerContainer.innerHTML += str
        })

        return arr
    }

    // This is a utility function make sure to remove and update this later
    buildSnap(arr) {
        let result = [0]
        let pos = 0

        for(var i = 0; i < arr.length; i++) {
            pos += 1 / arr.length
            result.push(pos)
        }

        return result
    }
    buildStates(panel, states) {
        let arr = []

        if(states) {
            states.forEach((state, i) => {
                arr.push({
                    name: state.dataset.state,
                })
            })

            return arr
        }
    }
    configDebug(debug) {
        if(debug === true) {debug = {primary: "#0059FE", secondary: "#F7B603", bg: "rgba(166,218,255,0.25)"}} 
        else if(typeof debug === 'object') {
            debug = {primary: `rgb(${debug.r},${debug.g},${debug.b})`, secondary: `rgba(${debug.r},${debug.g},${debug.b},0.25)`, bg: `rgba(${debug.r},${debug.g},${debug.b},${debug.a})`}
        }
        return debug
    }
    init() {
        this.panelsContainer = this.container.querySelector(this.panelsContainerSelector ? this.panelsContainerSelector : "[data-panels]")

        if(this.debug) {this.initDebug()}

        // Pin the sequence container and create a master timeline and scrollTrigger
        gsap.registerPlugin(ScrollTrigger)

        this.master = gsap.timeline({
            scrollTrigger: {
                trigger: this.container,
                start: "20px 20px",
                end: "bottom bottom",
                pin: this.panelsContainer,
                anticipatePin: 1,
                onUpdate: self => {if(this.debug){this.showSequenceProg.innerHTML = self.progress.toFixed(2)}},
                pinSpacing: false,
                markers: false,
            }
        })

        // Create a master timeline and scrollTrigger for each panel
        
        this.panels.forEach(panel => {      

            panel.master = gsap.timeline({
                scrollTrigger: {
                    trigger: this.container.querySelector(`[data-trigger="${panel.container.dataset.panel}"]`),
                    toggleActions: panel.settings.toggleActions ? panel.settings.toggleActions : "play pause resume reset",
                    start: panel.settings.start ? panel.settings.start : "top center",
                    end: panel.settings.end ? panel.settings.end : "bottom center",
                    // scrub: typeof panel.settings.scrub === "undefined" ? true : panel.settings.scrub,
                    scrub: false,
                    snap: calcSnap(),
                    onEnter: panel.settings.onEnter ? panel.settings.onEnter : this.debugEnter,
                    onEnterBack: panel.settings.onEnterBack ? panel.settings.onEnterBack : this.debugEnter,
                    onLeave: panel.settings.onLeave ? panel.settings.onLeave : this.debugLeave,
                    onLeaveBack: panel.settings.onLeaveBack ? panel.settings.onLeaveBack : this.debugLeave,
                    onUpdate: panel.settings.onUpdate ? panel.settings.onUpdate : this.debugUpdate
                }
            })

            console.log(typeof panel.settings.scrub === "undefined" ? true : panel.settings.scrub)

            function calcSnap() {
                if(panel.states.length > 0) {
                    let obj = 1 / (panel.states.length )
                    return obj
                }
                return false
            }

            if(panel.states.length > 0) {

                panel.states.forEach((state, i) => {
                    state.master = gsap.timeline({
                        scrollTrigger: {
                            trigger: this.container.querySelector(`[data-trigger="${state.name}"]`),
                            toggleActions: "play pause resume reset",
                            start: "top center",
                            end: "bottom center",
                            scrub: false,

                            onEnter: () => {
                                panel.master.play()
                                console.log(`Entered ${state.name}`)
                                console.log(panel.master)
                            },
                        }
                    })

                    console.log(this.container.querySelector(`[data-trigger="${state.name}"]`))

                })

            }

        })
    }
    initDebug() {
        this.panelsContainer.innerHTML += `
            <div style="pointer-events: none; position: absolute; z-index: 9999; width: 100%; height: 100vh; padding: 1rem; font-size: .875rem; line-height: 1.25rem; background-color: ${this.debug.bg}; box-shadow: inset 0 0 0 1px ${this.debug.primary}; color: ${this.debug.primary};">
                <div>
                    <p>panel: <span id="${this.container.id}-debug-panel">undefined</span></p>
                    <p>progression: <span id="${this.container.id}-debug-panel-prog">undefined</span></p>
                    <p>length: <span id="${this.container.id}-debug-length">undefined</span></p>
                    <br />
                    <p>sequence: ${this.container.id}</p>
                    <p>progression: <span id="${this.container.id}-debug-sequence-prog">0</span></p>
                    <p>viewport: ${window.innerHeight}px</p>
                    <p>length: ${Math.ceil(this.container.offsetHeight / window.innerHeight * 100)}vh</p>
                </div>
            </div>
        `

        this.showSequenceProg = this.panelsContainer.querySelector(`#${this.container.id}-debug-sequence-prog`) 
        this.showPanelProg = this.panelsContainer.querySelector(`#${this.container.id}-debug-panel-prog`)
        this.showPanelHeight = this.panelsContainer.querySelector(`#${this.container.id}-debug-length`)
        this.showCurrentSeq = this.panelsContainer.querySelector(`#${this.container.id}-debug-panel`)

        this.debugEnter = (self) => {
            this.showCurrentSeq.innerHTML = self.trigger.dataset.trigger
            this.showPanelHeight.innerHTML = self.trigger.offsetHeight / window.innerHeight * 100 + "vh"
        }
        this.debugLeave = () => {
            this.showCurrentSeq.innerHTML = " "
            this.showPanelProg.innerHTML = " "
            this.showPanelHeight.innerHTML = " "
        }
        this.debugUpdate = (self) => this.showPanelProg.innerHTML = self.progress.toFixed(2)

        ScrollTrigger.defaults({
            markers: {startColor: this.debug.primary, endColor: this.debug.secondary, fontSize: "10px", indent: 10},
        })

        console.log(this)
    }
}


// v1.0
// Load next panel at end of each panel





// NOTES

// OBJECTS

// Transition
// Scrub
// Snap
