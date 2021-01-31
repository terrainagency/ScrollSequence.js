export class ScrollSequence {
    constructor(sequenceContainer, config) {
        this.container = document.querySelector(sequenceContainer)
        this.triggerContainer = this.buildTriggerContainer(config.paddingTop, config.paddingBottom) 
        this.panelsContainer = config.panelsContainer ? document.querySelector(config.panelsContainer) : document.querySelector("[data-panels]")
        this.panels = this.buildPanels(config.panels, config ? config : {})
        this.init()
    }
    buildTriggerContainer(paddingTop, paddingBottom) {
        let pt = paddingTop ? paddingTop : "50vh"
        let pb = paddingBottom ? paddingBottom : "50vh"

        // if(!padding) {padding = "50vh"}
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

            let settings = config.settings[name] ? config.settings[name] : {}

            // Margin defaults
            settings.marginTop = settings.marginTop ? settings.marginTop : 0
            settings.marginBottom = settings.marginBottom ? settings.marginBottom : 0

            console.log(settings.marginTop)

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
                        onEnter: settings.onEnter ? settings.onEnter : undefined,
                        onEnterBack: settings.onEnterBack ? settings.onEnterBack : undefined,
                        onLeave: settings.onLeave ? settings.onLeave : undefined,
                        onLeaveBack: settings.onLeaveBack ? settings.onLeaveBack : undefined,
                        onUpdate: settings.onUpdate ? settings.onUpdate : undefined
                    }
                    
                    return settings
                })(),
                states: this.buildStates(panel)
            }
            
            // 2. Add panel to DOM
            this.triggerContainer.innerHTML += `<div data-trigger="${name}" style="display: flex; flex-direction: column; height: ${parseFloat(height) * 100}vh; margin-top: ${obj.settings.marginTop}; margin-bottom: ${obj.settings.marginBottom};"></div>`

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
}