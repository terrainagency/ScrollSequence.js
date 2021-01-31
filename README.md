<p align="center">
  <img width="180" height="180" src="https://github.com/terrainagency/ghost/blob/main/assets/logo.svg" alt="Ghost: Agnostic GSAP and Tailwind Framework">
</p>

# ScrollSequence.js

Dependencies: GSAP, GSAP Scroll Trigger

Demo: https://terrainagency.com/ghost/objects/scrollsequence/demo

## Usage

ScrollSequence is a <3kb (minified) component that creates a pinned sequence of panels. 

The goal of ScrollSequence is to create an efficient workflow by providing a structure for rapid development of scroll based pages.


```javascript
import {ScrollSequence} from './ghost/components/ScrollSequence.js'
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

Setting | Description
------------ | ------------ 
[data-height] | Defines the height of a panel
[data-states] | Defines the number of states within a panel

> The `data-name` attribute attached to panels and states must have a value in order for them to be referenced.

## 2: Create a new ScrollSequence

For basic scenarios, creating a new ScrollSequence will likely look like the `example1` below. 

```javascript
const sequence = new ScrollSequence("#id", {settings: {}, debug: true})
```

Key | Type | Default | Description
------------ | ------------ | ------------ | ------------
settings | object | {} | Object to pass custom settings for specific panels
panelsContainer | string | [data-panel] | Selector of sequence panels to pin
panels | string | [data-panel] | Selector for panels
paddingTop | number | 0.5 | Defines top padding for the pinned sequence
paddingBottom | number | 0.5 | Defines top padding for the pinned sequence
debug | boolean or {} | false | Turns debug mode off/on

Custom configurations for specific panels can be passed through the settings object. In `example2` below, customized properties were attached to `SnapPanel`. 

```javascript
// 1. Create sequence from selector #id as container
const sequence = new ScrollSequence("#id", {

    // 2. Configure any unique panel settings
    settings: {

        // NOTE: Must match the [data-panel] value
        SnapPanel: {
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

Key | Default
------------ | ------------ 
toggleActions | "play pause resume reset"
start | "top center"
end | "bottom center"
scrub | false
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

## Advanced Useage

ScrollSequence is at it's best when each content block in the DOM has a singular distinctive panel. Using `marginTop` and `marginBottom`, you can easily define an enter and leave animation. 

Setting up defaults before initializing ScrollSequence instances can be useful if there are multiple ScrollSequences on a page.

```javascript
// 1. Default settings can be set before and passed when initializing ScrollSequence
let snap = {
    snapTo: "labels", 
    duration: {min: 0.1, max: 0.4}, 
    delay: 0.2, 
    ease: "power1.inOut" 
}
let debug = {
    primary: {r: 233, g: 0, b: 0},
    opacity: 0.1,
    position: "top left"
}

// 2. Create a new ScrollSequence
const sequence = new ScrollSequence("#id", {
    paddingTop: "100vh", 
    settings: {

        // 3. Configure unique settings for the Features panel
        Features: {
            snap: snap,
            marginTop: "50vh",
            marginBottom: "50vh"
        },
    },
    debug: debug
})
```

Enable snapping by adding a `snap: {}` object to the panel settings. Panels can only contain `scrub` or `snap`, they will not function with both.

> In order for snapping to labels to function properly, you must define labels within your `panel.master` animation. 

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
- [x] Add support for top and bottom padding

v1.0:
- [x] Add margin params to triggers
- [ ] Dynamic support for window resizing
- [ ] Support mediaQueries
- [ ] Add scale parameter for trigger heights
- [ ] Build the ScrollSequence.toPos() method
- [ ] Enable lazy loading
- [ ] Create a webpack dev environment for Ghost repositories
- [ ] Update branding for Ghost repositories

## License

[MIT](https://choosealicense.com/licenses/mit/)
