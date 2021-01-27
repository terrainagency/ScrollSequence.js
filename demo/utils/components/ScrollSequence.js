import {query} from '../functions/query.js'

export class ScrollSequence {
    constructor(settings) {
        this.container = query(settings.container, "[data-sequence]")
        
        this.sequencePadding = (() => {
            if(!settings.sequencePadding) {return "50"}
            else{return parseFloat(settings.sequencePadding) * 100}
        })()

        this.triggerContainer = (() => {
            this.container.innerHTML += `<!-- Trigger Container --><div data-triggers style="padding: ${this.sequencePadding}vh 0"></div>`
            return document.querySelector("[data-triggers]")
        })()

        this.panelsContainer = query(settings.panelsContainer, "[data-panels]")

        this.panelsArr = query(settings.panels, "[data-panel]", true)

        this.debug = (() => {
            let debug = settings.debug
            if(debug === true) {debug = {primary: "#0059FE", secondary: "#F7B603", bg: "rgba(166,218,255,0.25)"}} 
            else if(typeof debug === 'object') {
                debug = {primary: `rgb(${debug.r},${debug.g},${debug.b})`, secondary: `rgba(${debug.r},${debug.g},${debug.b},0.25)`, bg: `rgba(${debug.r},${debug.g},${debug.b},0.25)`}
            }
            return debug
        })()
        this.init()
    }
    init() {
        this.panels = this.buildPanels()
        if(this.debug) {this.initDebug()}
        this.buildTriggers()
    }
    buildPanels() {
        let arr = []

        this.panelsArr.forEach((panel, i) => {
            let obj = {
                container: panel,
                name: panel.dataset.panel,
                height: parseFloat(panel.dataset.height) * 100,
            }

            // Add a new trigger elements to triggers
            let str = `<div data-trigger`
            if(obj.name) {str += `="${obj.name}"`}
            if(this.debug){
                str += ` style="background-color: ${this.debug.bg}; padding: 1rem; color: ${this.debug.primary}; font-size: .875rem; line-height: 1.25rem; height: ${obj.height}vh; border-top: 1px solid ${this.debug.primary};`
                if(i === this.panelsArr.length - 1) {str += `border-bottom: 1px solid ${this.debug.primary};`}
            }
            else {str += ` style="height: ${obj.height}vh"`}
            str += `">`
            if(this.debug){str += `${obj.name}`}
            str += `</div>`
            this.triggerContainer.innerHTML += str

            arr.push(obj)
        })

        return arr
    }
    buildTriggers() {
        // Pin the sequence container and create a master timeline and scrollTrigger
        gsap.registerPlugin(ScrollTrigger)
        this.master = gsap.timeline({
            scrollTrigger: {
                trigger: this.container,
                start: "20px 20px",
                end: "bottom bottom",
                pin: this.panelsContainer,
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
                    trigger: `[data-trigger="${panel.name}"]`,
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                }
            })
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

