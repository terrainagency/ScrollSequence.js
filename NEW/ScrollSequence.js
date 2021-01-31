// 1: Take in configurations
// 2: Configurations vs defaults
// 3: Build DOM elements
// 4: Init

import { parse } from "postcss"

export class ScrollSequence {
    constructor(sequenceContainer, config) {
        this.container = document.querySelector(sequenceContainer)
        this.triggerContainer = this.buildTriggerContainer(config.paddingTop, config.paddingBottom) 
        this.panels = this.buildPanels(config.panels, config ? config : {})
        this.init(config.debug)
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
            

            let obj = {
                name: name,
                container: panel,
                height: height,
                settings: (() => {
                    let settings = config.settings[name] ? config.settings[name] : {}

                    settings.marginTop = settings.marginTop ? settings.marginTop : 0
                    settings.marginBottom = settings.marginBottom ? settings.marginBottom : 0
        
                    return settings
                })(),
                states: this.buildStates(panel),
            }
            
            // 2. Add panel to DOM
            let str = `<div data-trigger="${name}" style="display: flex; flex-direction: column; height: ${parseFloat(height) * 100}vh; margin-top: ${obj.settings.marginTop}; margin-bottom: ${obj.settings.marginBottom};">`
            
            // 3. Add states to DOM
            obj.states.forEach((state, i) => {
                str += `<div data-trigger="${i}" style="flex: 1 1 0%;"></div>`
            })

            str += `</div>`

            this.triggerContainer.innerHTML += str

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
                arr.push({})
            }
        }
        return arr
    }
    init(debug) {

        // Debug
        if(debug) {this.debug(debug)}
    }
    debug(debug) {
        // Set colors
        debug.primary ? createColor(debug.primary) : "#0059fe"
        debug.secondary ? debug.secondary : "#f7b603"

        // function createColor(c) {
        //     let color = typeof c === 'string' || c instanceof String ? c : parse(c)
        //     // function parse(c) {
        //     //     color = `rgba(${debug.r},${debug.g},${debug.b})`
        //     // }
        //     console.log(color)
        //     return color
        // }

        const style = document.createElement('style');
        style.innerHTML = `
            [data-trigger] {
                border: 1px solid ${debug.primary};
            }
        `;
        document.head.appendChild(style);


        console.log(this)
    }
}

