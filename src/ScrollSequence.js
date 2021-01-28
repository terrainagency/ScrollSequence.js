import {setDefault} from '../functions/setDefault.js'

// 1: Take in default / configurations
// 2: Build Trigger DOM elements
// 3: Init triggers for each panel

export class ScrollSequence {
    constructor(settings) {
        // DOM Manipulation
        this.container = document.querySelector(setDefault(settings.container, "[data-sequence]")) // default: [data-sequence]
        this.triggerContainer = this.buildTriggerContainer(settings.SequencePadding) 
        this.panelsContainer = document.querySelector(setDefault(settings.panelsContainer, "[data-panels]")) // default: [data-panels]
        this.panels = this.buildPanels(settings.panelSelector, settings.configPanels)

        // Initialization
        this.init()
    }
    // Add Trigger Container to DOM
    buildTriggerContainer(padding) {
        if(!padding) {padding = "50"}
        else {padding = parseFloat(padding) * 100}
        this.container.innerHTML += `<!-- Trigger Container --><div data-triggers style="padding: ${padding}vh 0"></div>`

        return document.querySelector("[data-triggers]")
    }
    // Define sequence.panels and add panel and state triggers to DOM
    buildPanels(panelSelector, config) {
        let panels = this.container.querySelectorAll(setDefault(panelSelector, "[data-panel]")) // default: [data-panel]
        let arr = []

        panels.forEach((panel, i) => {
            arr.push({
                name: panel.dataset.panel,
                container: panel,
                settings: setDefault(config[panel.dataset.panel], {})
            })

            let str = `<div data-trigger="${panel.dataset.panel}" style="height: ${parseFloat(panel.dataset.height) * 100}vh;"></div>`

            this.triggerContainer.innerHTML += str
        })

        return arr
    }
    init() {
        // Pin the sequence container and create a master timeline and scrollTrigger
        gsap.registerPlugin(ScrollTrigger)

        this.master = gsap.timeline({
            scrollTrigger: {
                trigger: this.container,
                start: "20px 20px",
                end: "bottom bottom",
                pin: this.panelsContainer,
                anticipatePin: 1,
                pinSpacing: false,
                markers: false,
            }
        })

        // Create a master timeline and scrollTrigger for each panel
        this.panels.forEach(panel => {
            console.log(panel.settings)

            panel.master = gsap.timeline({
                scrollTrigger: {
                    trigger: `[data-trigger="${panel.container.dataset.panel}"]`,
                    toggleActions: setDefault(panel.settings.toggleActions, "play pause resume reset"),
                    start: setDefault(panel.settings.start, "top center"),
                    end: setDefault(panel.settings.end, "bottom center"),
                    scrub: setDefault(panel.settings.scrub, 1),
                    snap: panel.settings.snap,
                    onEnter: panel.settings.onEnter,
                    onEnterBack: panel.settings.onEnterBack,
                    onLeave: panel.settings.onLeave,
                    onLeaveBack: panel.settings.onLeaveBack,
                    onUpdate: panel.settings.onUpdate
                }
            })
        })
    }
}
