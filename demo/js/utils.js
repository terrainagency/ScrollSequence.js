export class ScrollSequence {
    constructor(settings) {
        this.settings = settings
        this.container = document.querySelector(settings.container)
        this.triggerContainer = document.querySelector(settings.triggerContainer)
        this.panels = []
        this.init()
    }
    init() {
        this.initPanels()
        
        console.log(this)
    }
    initPanels() {
        let panels = document.querySelectorAll(this.settings.panels)

        panels.forEach(panel => {
            let states = panel.querySelectorAll("[data-state]")

            let obj = {
                name: panel.dataset.name,
                container: panel,
                height: parseFloat(panel.dataset.height) * 100,
                trigger: null,
                states: (() => {
                    let arr = []
                    states.forEach(state => {
                        let obj = {
                            name: state.dataset.name,
                            container: state,
                            height: parseFloat(state.dataset.height) * 100,
                            trigger: null,
                            // tl: null,
                        }
                        arr.push(obj)
                    })
                    return arr
                })(),
                // tl: null,
            }
            this.panels.push(obj)

            // Add panel to trigger container
            let str = `<div data-trigger`
            if(obj.name) {str += ` data-name="${obj.name}"`}
            str += ` class="flex flex-col"`
            if(obj.height) {str += ` style="height: ${obj.height}vh"`}
            str += `>`

            // Add each state to trigger container
            for(let i = 0; i < obj.states.length; i++) {
                console.log("state: " + i + " of " + (obj.states.length-1))

                str += `<div data-state`
                if(obj.states[i].name) {str += ` data-name="${obj.states[i].name}"`}
                if(obj.states[i].height) {str += ` style="height: ${obj.states[i].height}vh"`}
                else {str+= ` class="flex-auto"`}
                str += `></div>`

            }
            str += `</div>`
            this.triggerContainer.innerHTML += str
        })

    }
}





