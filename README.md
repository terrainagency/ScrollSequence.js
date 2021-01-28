# ScrollSequence.js

Dependencies: GSAP, GSAP Scroll Trigger

Demo: https://terrainagency.com/ghost/objects/scrollsequence/demo

## Usage

ScrollSequence is a <2kb (minified) component that creates a pinned sequence of panels. Each panels contains a master timelines with a scrollTrigger instance. 

The goal of ScrollSequence is to create an efficient workflow for building scroll based pages by advocating for separation of concern through restricting content to HTML, and animation to javascript. 


```javascript
import {ScrollSequence} from './utils.js'
```

## 1: HTML Structure

```HTML
<!-- ScrollSequence container -->
<div data-sequence="genesis" class="relative w-screen min-h-screen">
    <div data-panels class="absolute w-screen h-screen">
        <section data-panel="myFirstPanel" data-height="2" class="absolute w-screen h-screen">

            <!-- Content for myFirstPanel -->

        </section>
    </div>
</div>
```

> The `data-name` attribute attached to panels and states must have a value in order for them to be referenced.

## 2: Create a new ScrollSequence

Most of the time, creating a new ScrollSequence looks like the line below:

```javascript
const sequence = new ScrollSequence({debug: true})
```

If you have multiple ScrollSequences on a single page, you will need to define a unique container element for each ScrollSequence.

```javascript
const sequence = new ScrollSequence({
    container: "[data-sequence]",
    debug: true 
})
```

> Warning: The use case above is in progress and is not currently supported.

If you need to configure custom options:

```javascript
const sequence = new ScrollSequence({
    container: "[data-sequence]",
    panelsContainer: "[data-panels]", 
    panelSelector: "[data-panel]", 
    stateSelector: "[data-state]", 
    triggerContainer: "[data-triggers]",
    sequencePadding: 0.5,
    debug: true 
})
```

Key | Type | Default | Description
------------ | ------------ | ------------ | ------------
configPanels* | array of objects | undefined | used to manually override scrollTrigger values
debug* | boolean or {r,g,b} | false | Turns debug mode off/on

Additional Settings

Key | Type | Default | Description
------------ | ------------ | ------------ | ------------
container | string | [data-sequence] | Selector for the sequence
panelsContainer | string | [data-panels] | Selector of sequence panels to pin
panelSelector | string | [data-panel] | Selector for panels
stateSelector | string | [data-state] | Selector for states
triggerContainer | string | [data-triggers] | Selector for triggers to be placed in
sequencePadding | number | 0.5 | Defines space between the pinned trigger element and panels

## 3: Define animations for each panel

Each panel contains a master timeline `panel.master` containing a scrollTrigger `panel.master.scrollTrigger` instance. 

Switch statements allow for easy organization of the panels, as each `panel.master` can grow considerably in lines depending on the needs of the page.

```javascript
sequence.panels.forEach(panel => {
    switch(panel.name) {

        case "myFirstName":

            (() => {

                // Do something

            })()

            break
    }
}
```

> PanelName must match the data-panel value in the sequence object.

## 4: Configure Animtions

```javascript
sequence.panels.forEach(panel => {
    switch(panel.name) {
        case "myFirstName":

            (() => {

                // Create a timeline
                let tl = gsap.timeline({paused: true})
                tl.to(el, {options})

                // Add timeline to the master
                panel.master.add(tl)

            })()

            break
    }
}
```

> The above is only an example of how to work with ScrollSequence.js, it can always be configured to suit your needs.

## Snapping

Enable snapping by adding `data-snap="true"` to the panel. In order for snapping to function properly, you must define lables within your `panel.master` animation. 

```html
    <section data-panel="SnapExample" data-height="2" data-snap="true" class="absolute w-screen h-screen">
        <div class="flex flex-col w-full h-full justify-center items-center">
            <div id="rect" class="inline-block w-10 h-10 bg-black"></div>
        </div>
    </section>
```

```javascript
case "SnapExample":
    
    (() => {
        panel.master.addLabel("start")
        panel.master.to("#rect", {rotate: 45})
        panel.master.addLabel("intro")
        panel.master.to("#rect", {backgroundColor: "#f0f", rotate: 0})
        panel.master.addLabel("end")
    })()

    break
```

> NOTE: Mark sure to add a label to the start and end of the `panel.master` timeline.

## Advanced Example

```javascript
import {ScrollSequence} from './utils.js'

const sequence = new ScrollSequence({debug: true})

sequence.panels.forEach(panel => {
    switch(panel.name) {

        case "intro":

            (() => {
                
                function toChair() {
                    let tl = gsap.timeline({paused: true})
                    tl.to(el, {options})

                    return tl
                }
                
                // Add timeline to the master
                panel.master.add(toChar())

            })()

            break
    }
}
```

## Panels

Panels are the main building blocks of a sequence.

Option | Default
------------ | ------------
[data-name] | undefined
[data-height] | undefined

## States

States are child elements of a panel that contain a section of content

Option | Default
------------ | ------------
[data-name] | undefined
[data-height] | flex-auto

## Status

ScrollSequence.js is a part of Terrain's Ghost library, and is currently in development. Ghost is a library of foundational code blocks, designed for practical use on projects built with GSAP and Tailwind.

Ghost's code is non-obtrusive, and does not create any actions without your direction. It is designed to be as agnostic as possible, allowing it to function freely accross a large variety of applications.

To Do:

- [x] Basic architecture 
- [x] Integrate base panel ScrollTriggers
- [x] Add padding parameter to sequence object with a default
- [x] Add states to panels
- [x] Switch all debug css to inline styles
- [ ] Add support for setting snap defaults
- [ ] Update on browser resize
- [ ] Add support for media queries
- [x] Allow users to set their own default color for debug
- [x] Set defaults for container and panel queries

Polish:

- [ ] Create a webpack dev environment for Ghost repositories
- [ ] Update branding for Ghost repositories
- [ ] Consider spliting this.init() into this.build() and this.init()
- [ ] Allow for multiple ScrollSequences on a single page
  
# Known issues

* data-height may violate the separation of concerns as it pertains more to animation than the content itself. 
* trigger container may violate the separation of concerns as it is required for functionality.

## License

[MIT](https://choosealicense.com/licenses/mit/)
