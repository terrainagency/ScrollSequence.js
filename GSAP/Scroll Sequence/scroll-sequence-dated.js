document.addEventListener('DOMContentLoaded', () => {
    window.onload = function() {


        // Define the Sequence object
        class Sequence {
            constructor(container) {
                this.container = container;
                this.triggerContainer;
                this.panels = [];
                
                this.init();
            }
            init() {
                // Find all elements with [data-panel] within the sequence container
                let panelsArr = this.container.querySelectorAll("[data-panel");

                panelsArr.forEach((panel) => {

                    // Build an object for each panel
                    let obj = {
                        name: panel.dataset.panel,
                        height: panel.dataset.height,
                        node: panel,
                        states: [],
                    }

                    // Push the new panel object into the global array
                    this.panels.push(obj);
                });

                console.log(this.panels);
                // console.log("Sequence.init();");
                // console.log(this.container);
                // console.log("Panels:");

                let triggerContainer = `<div data-obj='triggerContainer'></div>`;
                this.container.innerHTML += triggerContainer;
                this.triggerContainer = this.container.querySelector("[data-obj='triggerContainer']");
                
                // this.initPanels();
                // this.initTriggers();

        
                // Debug function
                // this.debug();
            }
            initPanels() {
                


                // For each panel, find all relevant data
                this.panels.forEach((panel) => {
                    // Create panel object
                    // let panel = {

                    // }


                    let height = parseFloat(panel.dataset.height);
                    let heightStr = height * 100 + "vh";
                    let name = panel.dataset.panel;
                    let states = panel.querySelectorAll("[data-state]");

                    // Create panel trigger
                    let panelStr = `<div data-trigger-panel='${panel.dataset.panel}' class='flex-auto' style='height: ${heightStr}'>`;
                    this.triggerContainer.innerHTML += panelStr;
                
                    // If panel has no height, set height to default
                    if(!height) { height = 1 } 

                    // If panel contains states
                    // By default, the height of a state is panel.height / states.length
                    if(states) {
                        states.forEach((state) => {
                            // Create a new trigger
                            let stateStr = `<div data-trigger='${state.dataset.state}' class='flex flex-col'></div>`;
                            this.triggerContainer.innerHTML += stateStr;
                        });
                    }
                    // Close the trigger container
                    this.triggerContainer.innerHTML += `</div>`; 
                });
                
                // Close the trigger container
                this.triggerContainer.innerHTML += `</div>`; 
            }
            // initTriggers() {

            //     this.panels.forEach((panel) => {
            //         console.log(panel.dataset.panel);
            //         let trigger = this.container.querySelector(`[data-trigger='${panel.dataset.panel}']`);
            //         console.log(trigger);
            //     });

            // }



            debug() {

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

