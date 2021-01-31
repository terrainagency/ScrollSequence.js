import {parseFlex} from '../utils/parseFlex.js'

export class ScrollSequence {
    constructor(sequenceContainer, config) {
        this.container = document.querySelector(sequenceContainer)
        this.triggerContainer = this.buildTriggerContainer(config.paddingTop, config.paddingBottom) 
        this.panelsContainer = config.panelsContainer ? this.container.querySelector(config.panelsContainer) : this.container.querySelector("[data-panels]")
        this.audit = this.debug(config.debug)
        this.panels = this.buildPanels(config.panels ? config.panels : "[data-panel]", config.settings ? config.settings : {})
        this.version = "0.1"
        this.init()
    }
    buildTriggerContainer(paddingTop, paddingBottom) {
        let pt = paddingTop ? paddingTop : "50vh"
        let pb = paddingBottom ? paddingBottom : "50vh"

        this.container.innerHTML += `<!-- Trigger Container --><div data-triggers style="padding-top: ${pt};  padding-bottom: ${pb};"></div>`

        return this.container.querySelector("[data-triggers]")
    }
    buildPanels(sel, config) {
        
        let panels = this.container.querySelectorAll(sel)
        let arr = []

        panels.forEach(panel => {

            // 1. Define panel
            let name = panel.dataset.panel
            let height = panel.dataset.height
            let settings = config[name] ? config[name] : {}     

            // Margin defaults
            settings.marginTop = settings.marginTop ? settings.marginTop : 0
            settings.marginBottom = settings.marginBottom ? settings.marginBottom : 0

            let obj = {
                name: name,
                container: panel,
                height: height,
                settings: (() => {
                
                    // ScrollTrigger settings
                    settings.config = {
                        trigger: `[data-trigger="${name}"]`,
                        toggleActions: settings.toggleActions ? settings.toggleActions : "play pause resume reset",
                        start: settings.start ? settings.start : "top center",
                        end: settings.end ? settings.end : "bottom center",
                        scrub: settings.scrub ? settings.scrub : false,
                        snap: settings.snap ? settings.snap : undefined,
                        onEnter: settings.onEnter ? settings.onEnter : this.audit ? this.debugEnter : undefined,
                        onEnterBack: settings.onEnterBack ? settings.onEnterBack : this.audit ? this.debugEnter : undefined,
                        onLeave: settings.onLeave ? settings.onLeave : this.audit ? this.debugLeave : undefined,
                        onLeaveBack: settings.onLeaveBack ? settings.onLeaveBack : this.audit ? this.debugLeave : undefined,
                        onUpdate: settings.onUpdate ? settings.onUpdate : this.audit ? this.debugUpdate : undefined
                    }

                    return settings
                })(),
                states: this.buildStates(panel)
            }
            
            // 2. Add panel to DOM
            let str = `<div data-trigger="${name}" style="display: flex; flex-direction: column; height: ${parseFloat(height) * 100}vh; margin-top: ${obj.settings.marginTop}; margin-bottom: ${obj.settings.marginBottom}; `
            this.audit ? str += `border: 1px solid ${this.debug.primary}">${name}` : `">`
            str += `</div>`

            this.triggerContainer.innerHTML += str

            if(obj.states.length > 0) {
                let stateContainer = this.triggerContainer.querySelector(`[data-trigger="${name}"]`)

                obj.states.forEach(state => {
                    stateContainer.innerHTML += `<div data-trigger="${state.name}" style="flex: 1 1 0%;"></div>`
                })
            }

            arr.push(obj)
        })

        return arr
    }

    // create states
    buildStates(panel) {
        let num = panel.dataset.states;
        let arr = []

        if(num > 0) {
            for(var i = 0; i < num; i++) {
                let name = `${panel.dataset.panel}-${i}`

                arr.push({
                    name: name,
                    settings: {
                        config: {
                            trigger: `[data-trigger="${name}"]`,
                            toggleActions: "play pause resume reset",
                            start: "top center",
                            end: "bottom center",
                        }
                    }
                })
            }
        }
        return arr
    }
    init() {       

        // 1. Pin the sequence
        gsap.registerPlugin(ScrollTrigger)

        this.master = gsap.timeline({
            scrollTrigger: {
                trigger: this.container,
                start: "top top",
                end: "bottom bottom",
                pin: this.panelsContainer,
                anticipatePin: 1,
                onEnter: undefined,
                onEnterBack: undefined,
                onLeave: undefined,
                onLeaveBack: undefined,
                onUpdate: self => this.audit ? this.sequenceProg.innerHTML = self.progress.toFixed(2) : undefined,
                pinSpacing: false,
                markers: false,
            }
        })

        // 2. Create a scrollTrigger for each panel
        this.panels.forEach(panel => {
            panel.master = gsap.timeline({
                scrollTrigger: panel.settings.config
            })

            // 3. Create a scrollTrigger for each state
            if(panel.states.length > 0) {
                panel.states.forEach(state => {
                    state.master = gsap.timeline({
                        scrollTrigger: state.settings.config
                    })
                })
            }
        })
    }
    debug(config) {

        if(config) {

            // 1. Set colors
            // FLAG: To support hex codes use gsap.utils.splitColor(), also consider building toPalette()
            this.debug.primary = config.primary ? `rgb(${config.primary.r},${config.primary.g},${config.primary.b})` : `rgb(0,89,254)`
            this.debug.secondary = config.secondary ? `rgb(${config.secondary.r},${config.secondary.g},${config.secondary.b})` : `rgb(88,21,239)`
            this.debug.opacity = config.opacity ? config.opacity : 0.1
            this.debug.bg = config.primary ? `rgba(${config.primary.r},${config.primary.g},${config.primary.b},${this.debug.opacity})` : `rgb(0,89,254,${this.debug.opacity})`           

            let position = parseFlex(config.position)

            // 2. Add debug panel to DOM
            let id = this.container.id

            this.panelsContainer.innerHTML += `
                <div data-debug="${id}" style="
                    background-color: ${this.debug.bg};
                    position: absolute; 
                    display: flex;
                    flex-direction: column;
                    justify-content: ${position[0]};
                    align-items: ${position[1]};
                    top: 0;
                    pointer-events: none; 
                    z-index: 9999; 
                    width: 100vw; height: 100vh; 
                    padding: 1rem; 
                    font-size: .875rem; 
                    line-height: 1.25rem; 
                    box-shadow: inset 0 0 0 1px ${this.debug.primary}; 
                    color: ${this.debug.primary};
                ">
                    <div>
                        <p>panel: <span id="${id}-panel">undefined</span></p>
                        <p>progression: <span id="${id}-panel-prog">undefined</span></p>
                        <p>length: <span id="${id}-length">undefined</span></p>
                        <br />
                        <p>sequence: ${id}</p>
                        <p>progression: <span id="${id}-sequence-prog">0</span></p>
                        <p>viewport: ${window.innerHeight}px</p>
                        <p>length: ${Math.ceil(this.container.offsetHeight / window.innerHeight * 100)}vh</p>
                    </div>
                </div>
            `

            this.sequenceProg = document.querySelector(`#${id}-sequence-prog`) 
            let panelProg = document.querySelector(`#${id}-panel-prog`)
            let panelHeight = document.querySelector(`#${id}-length`)
            let currentSeq = document.querySelector(`#${id}-panel`)

            // 3. Set scrollTrigger defaults
            this.debugEnter = (self) => {
                currentSeq.innerHTML = self.trigger.dataset.trigger
                panelHeight.innerHTML = self.trigger.offsetHeight / window.innerHeight * 100 + "vh"
            }
            this.debugLeave = () => {
                currentSeq.innerHTML = " "
                panelProg.innerHTML = " "
                panelHeight.innerHTML = " "
            }
            this.debugUpdate = (self) =>  panelProg.innerHTML = self.progress.toFixed(2)

            ScrollTrigger.defaults({
                markers: {startColor: this.debug.primary, endColor: this.debug.secondary, fontSize: "10px", indent: 10},
            })

            // 4. Log sequence for reference
            console.log(this)
        }
        return config
    }
}