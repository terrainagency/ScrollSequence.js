import {query} from '../functions/query.js'

// 1: Take in default / configurations
// 2: Build Trigger DOM elements
// 3: Init triggers for each panel

export class ScrollSequence {
    constructor(settings) {
        // DOM Manipulation
        this.debug = this.configDebug(settings.debug)
        this.container = query(document, settings.container, "[data-sequence]") // default: [data-sequence]
        this.triggerContainer = this.buildTriggerContainer(settings.SequencePadding) 
        this.panelsContainer = query(document, settings.panelsContainer, "[data-panels]") // default: [data-panels]
        this.panels = this.buildPanels(settings.panelSelector)
        this.snapDefaults = settings.snapDefaults

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
    buildPanels(panelSelector) {
        let panels = query(this.container, panelSelector, "[data-panel]", true) // default: [data-panel]
        let arr = []

        panels.forEach((panel, i) => {
            arr.push({
                name: panel.dataset.panel,
                container: panel,
            })

            let str = `<div data-trigger="${panel.dataset.panel}" style="height: ${parseFloat(panel.dataset.height) * 100}vh; `
            if(this.debug) {
                str += `background-color: ${this.debug.bg}; padding: 1rem; color: ${this.debug.primary}; font-size: 0.875rem; line-height: 1.25rem; border-top: 1px solid ${this.debug.primary}; `
                if(i === arr.length - 1) {str += `border-bottom: 1px solid ${this.debug.primary};`}
            }
            str += `">`
            if(this.debug){str += `${panel.dataset.panel}`}
            str += `</div>`

            this.triggerContainer.innerHTML += str
        })

        return arr
    }
    configDebug(debug) {
        if(debug === true) {debug = {primary: "#0059FE", secondary: "#F7B603", bg: "rgba(166,218,255,0.25)"}} 
        else if(typeof debug === 'object') {
            debug = {primary: `rgb(${debug.r},${debug.g},${debug.b})`, secondary: `rgba(${debug.r},${debug.g},${debug.b},0.25)`, bg: `rgba(${debug.r},${debug.g},${debug.b},0.25)`}
        }
        return debug
    }
    init() {
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
                onEnter: () => {},
                onEnterBack: () => {},
                onLeave: () => {},
                onEnterBack: () => {},
                onUpdate: self => {if(this.debug){this.showSequenceProg.innerHTML = self.progress.toFixed(2)}},
                pinSpacing: false,
                markers: false,
            }
        })
        // Create a master timeline and scrollTrigger for each panel
        this.panels.forEach(panel => {
            panel.master = gsap.timeline({
                scrollTrigger: {
                    trigger: `[data-trigger="${panel.container.dataset.panel}"]`,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1,
                    // snap: calcSnap(panel.container.dataset.snap)
                }
            })
            function calcSnap(snap) {
                if(snap) {
                    return {
                        // snapTo: "labels", // snap to the closest label in the timeline
                        // duration: {min: 0.1, max: 0.4}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                        // delay: 0.1, // wait 0.2 seconds from the last scroll event before doing the snapping
                        // ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
                    }
                }
            }
        })
    }
    initDebug() {
        this.panelsContainer.innerHTML += `
            <div style="position: absolute; width: 100%; height: 100vh; padding: 1rem; font-size: .875rem; line-height: 1.25rem; background-color: ${this.debug.bg}; box-shadow: inset 0 0 0 1px ${this.debug.primary}; color: ${this.debug.primary};">
                <div>
                    <p>panel: <span id="debug-sequence-current">undefined</span></p>
                    <p>progression: <span id="debug-panel-progress">undefined</span></p>
                    <p>length: <span id="debug-panel-height">undefined</span></p>
                    <br />
                    <p>sequence: ${this.container.dataset.sequence}</p>
                    <p>progression: <span id="debug-sequence-progress">0</span></p>
                    <p>viewport: ${window.innerHeight}px</p>
                    <p>length: ${this.container.offsetHeight / window.innerHeight * 100}vh</p>
                </div>
            </div>
        `
        this.showSequenceProg = document.querySelector("#debug-sequence-progress") 
        this.showPanelProg = document.querySelector("#debug-panel-progress")
        this.showPanelHeight = document.querySelector("#debug-panel-height")
        this.showCurrentSeq = document.querySelector("#debug-sequence-current")

        ScrollTrigger.defaults({
            toggleActions: "play pause resume reset",
            markers: {startColor: this.debug.primary, endColor: this.debug.secondary, fontSize: "10px", indent: 10},
            onEnter: self => {
                this.showCurrentSeq.innerHTML = self.trigger.dataset.trigger
                this.showPanelHeight.innerHTML = self.trigger.offsetHeight / window.innerHeight * 100 + "vh"
            },
            onEnterBack: self => {
                this.showCurrentSeq.innerHTML = self.trigger.dataset.trigger
                this.showPanelHeight.innerHTML = self.trigger.offsetHeight / window.innerHeight * 100 + "vh"
            },
            onLeave: () => {
                this.showCurrentSeq.innerHTML = undefined
                this.showPanelProg.innerHTML = undefined
                this.showPanelHeight.innerHTML = undefined
            },
            onLeaveBack: () => {
                this.showCurrentSeq.innerHTML = undefined
                this.showPanelProg.innerHTML = undefined
                this.showPanelHeight.innerHTML = undefined
            },
            onUpdate: self => this.showPanelProg.innerHTML = self.progress.toFixed(2),
        })

        console.log(this)
    }
}
