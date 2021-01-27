document.addEventListener('DOMContentLoaded', () => {
    window.onload = function() {

        // Define the Sequence object
        class Sequence {
            constructor(container) {
                this.container = container;
                this.triggerContainer;
                this.panels = [];
                this.debug = true;
                this.init();
            }
            init() {
                this.initPanels();
                this.initTriggers();
                if(this.debug){this.logDebug();}
            }
            initPanels() {
                // Find all elements with [data-panel] within the sequence container
                let panelsArr = this.container.querySelectorAll("[data-panel");

                panelsArr.forEach((panel, i) => {

                    // Build an object for each panel
                    let obj = {
                        name: panel.dataset.panel,
                        trigger: null,
                        height: panel.dataset.height,
                        srcNode: panel,
                        states: [],
                        tl: null,
                    }

                    // Push the new panel object into the global array
                    this.panels.push(obj);

                    // Find all elements with [data-state] within this panel container
                    let states = panel.querySelectorAll("[data-state]");

                    // If the panel has states
                    if(states.length !== 0) {
                        states.forEach((state) => {
                            let obj = {
                                name: state.dataset.state,
                                trigger: null,
                                height: parseFloat(state.dataset.height),
                                srcNode: state,
                                tl: null,
                            }
                            this.panels[i].states.push(obj);
                        });
                    }
                });
            }
            initTriggers() {
                // Create the trigger container
                let triggerContainer = `<div data-obj='triggerContainer'></div>`;
                this.container.innerHTML += triggerContainer;
                this.triggerContainer = this.container.querySelector("[data-obj='triggerContainer']");

                this.panels.forEach((panel) => {
                    let str = `<div data-trigger="${panel.srcNode.dataset.panel}"`;

                    if(panel.height) {str += ` style="height: ${panel.height}vh"`;}

                    str += `>`;

                    // If panel has states
                    if(panel.states.length !== 0) {
                        panel.states.forEach((state) => {
                            console.log(state.height);

                            // Build a new trigger element
                            str += `<div data-trigger="${state.name}"`;

                            // If this state has a height declared
                            if(state.height) {str += ` style="height: ${state.height}vh"`;} 
                            else {str+= ` class="flex-auto"`} // Default height is state.length / panel.height via flex-auto

                            str += `></div>`;

                            // Add trigger element to the trigger container
                            this.triggerContainer.innerHTML += str;

                            // Update trigger for state
                            state.trigger = this.triggerContainer.querySelector(`[data-trigger='${state.name}']`);
                        });
                    }
                    // Close out the trigger container element
                    str += `</div>`;
                    this.triggerContainer.innerHTML += str;

                    panel.trigger = this.triggerContainer.querySelector(`[data-trigger='${panel.name}']`);
                });
            }
            logDebug() {
                console.log("this.panels: ");
                console.log(this.panels);

                // CONTAINER NOT FOUND
                if(!this.container) {console.log(`ERROR: CONTAINER NOT FOUND. Make sure the desired container has [data-obj="scrollSequence"].`)}
            }
        }
        
        // Create a new Sequence Object
        let sequenceContainer = document.querySelector("[data-obj='scrollSequence']");
        const seq = new Sequence(sequenceContainer);



        // Timeline
        // let tl = new TimelineMax({paused: true});
    }

});

