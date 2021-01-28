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

For basic scenarios, creating a new ScrollSequence will likely look like the `example1` below. 

```javascript
const example1 = new ScrollSequence("#FirstSequence", {debug: true})
```

Key | Type | Default | Description
------------ | ------------ | ------------ | ------------
config | object | {} | Object to pass custom options for panels
panelsContainer | string | [data-panels] | Selector of sequence panels to pin
panelSelector | string | [data-panel] | Selector for panels
triggerContainer | string | [data-triggers] | Selector for triggers to be placed in
sequencePadding | number | 0.5 | Defines space between the pinned trigger element and panels
debug | boolean or {r,g,b} | false | Turns debug mode off/on

When custom configurations for a specific panel's scrollTrigger are needed, pass the config object. In `example2` below, customized properties were attached to `mySnapPanel`. 

```javascript
// 1. Create sequence from selector #FirstSequence as container
const example2 = new ScrollSequence("#FirstSequence", {

    // 2. Configure any unique panel settings
    config: {

        // NOTE: Must match the associated [data-panel] value
        mySnapPanel: {
            snap: {
                snapTo: "labels", 
                duration: {min: 0.1, max: 0.4}, 
                delay: 0.2, 
                ease: "power1.inOut" 
            }
        }
    },

    // 3. Turn on debug?
    debug: true,
})
```

Config options:

Key | Default
------------ | ------------ 
toggleActions | "play pause resume reset"
start | "top center"
end | "bottom center"
scrub | 1
snap | undefined 
onEnter* | undefined
onEnterBack* | undefined
onLeaveBack* | undefined
onUpdate* | undefined

> *If `debug: true`, the default for these properties will be replaced with debug display methods.

## 3: Define architecture for panel timelines

Each panel contains a master timeline `panel.master` containing a scrollTrigger `panel.master.scrollTrigger` instance. ScrollSequence gives complete freedom to write `panel.master` however you prefer.

```javascript
sequence.panels.forEach(panel => {
    switch(panel.name) {

        // case value must match the [data-panel] value
        case "myPanel":

            (() => {

                // panel.master.to({})

            })()

            break
    }
}
```

## Ex: Snapping

Enable snapping by adding `data-snap="true"` to the panel. In order for snapping to function properly, you must define labels within your `panel.master` animation. 

```html
    <section data-panel="SnapExample" data-height="2" data-snap="true" class="absolute w-screen h-screen">
        <div class="flex flex-col w-full h-full justify-center items-center">
            <div id="rect" class="inline-block w-10 h-10 bg-black"></div>
        </div>
    </section>
```

```javascript
sequence.panels.forEach(panel => {
    switch(panel.name) {
        
        case "myPanel":

            (() => {

                panel.master.addLabel("start") // start

                panel.master.to("#rect", {rotate: 45})
                panel.master.addLabel("intro")
                panel.master.to("#rect", {backgroundColor: "#0059FE", rotate: 0})

                panel.master.addLabel("end") // end

            })()

            break
    }
}
```

> NOTE: Mark sure to add a label to the start and end of the `panel.master` timeline.

## Status

ScrollSequence.js is a part of Terrain's Ghost library, and is currently in development. Ghost is a library of foundational code blocks, designed for practical use on projects built with GSAP and Tailwind.

Ghost's code is non-obtrusive, and does not create any actions without your direction. It is designed to be as agnostic as possible, allowing it to function freely accross a large variety of applications.

v0.1:

- [x] Basic architecture 
- [x] Integrate base panel ScrollTriggers
- [x] Add padding parameter to sequence object with a default
- [x] Add states to panels
- [x] Switch all debug css to inline styles
- [x] Add support for setting snap defaults
- [x] Allow users to set their own default color for debug
- [x] Set defaults for container and panel queries
- [x] Allow for multiple ScrollSequences on a single page

v1.0:

- [ ] Create a webpack dev environment for Ghost repositories
- [ ] Update branding for Ghost repositories

## License

[MIT](https://choosealicense.com/licenses/mit/)
