export class ScrollSequence {
    constructor(settings) {
        this.container = this.query(settings.container, "[data-sequence]")
        this.triggerContainer = this.query(settings.triggerContainer, "[data-triggers]")
        this.panelsContainer = this.query(settings.panelsContainer, "[data-panels]")
        this.panelsArr = this.queryAll(settings.panels, "[data-panel]")
        this.panels = this.initPanels()
        this.debug = settings.debug
        this.init()
    }
    query(el, d) {
        let element = el
        if(element === undefined) {
            element = d
        }
        return document.querySelector(element)
    }
    queryAll(el, d) {
        let element = el
        if(element === undefined) {
            element = d
        }
        return document.querySelectorAll(element)
    }
    initPanels() {

        let arr = []

        this.panelsArr.forEach(panel => {
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

        console.log(this)

        if(this.debug) {this.initDebug()}

        // Pin the sequence
        gsap.registerPlugin(ScrollTrigger)

        ScrollTrigger.create({
            trigger: "[data-sequence]",
            start: "20px 20px",
            end: "bottom bottom",
            pin: this.panelsContainer,
            onEnter: () => {},
            onEnterBack: () => {},
            onUpdate: self => this.showSequenceProg.innerHTML = self.progress.toFixed(2),
            pinSpacing: false,
            markers: false,
        })


        this.panels.forEach(panel => {
            console.log(panel.trigger)
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

