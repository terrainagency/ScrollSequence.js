# ScrollSequence.js

Dependencies: GSAP, GSAP Scroll Trigger

Demo: https://terrainagency.com/ghost/objects/scrollsequence/demo

## Usage

ScrollSequence is a <1kb (minified) object built for Terrain's Ghost library.

ScrollSequence.js creates a pinned sequence of master timelines each containing scrollTrigger a instance. The goal of ScrollSequence is to create an efficient workflow for building scroll based pages. It advocates for separation of concern through dividing content to HTML, and animation to javascript. This allow sequence content to be easily modified over time, and makes jumping between projects accross clients easier.


```javascript
import {ScrollSequence} from './utils.js'
```

## 1: HTML Structure

```HTML
    <!-- Sequence container -->
    <div data-sequence>
        <!-- Panel with no states -->
        <section data-panel data-name="myPanel1" data-height="1">
            <!-- Canvas is recommended for performance -->
            <canvas></canvas>
        </section>
        <!-- Panel with states -->
        <section data-panel data-name="myPanel2" data-height="1.4">
            <canvas></canvas>
            <div data-state data-name="myState1"></div>
            <div data-state data-name="myState2"></div>
        </section>

        <!-- Trigger container: all generated triggers will be placed here -->
        <div data-triggers></div>
    </div>
```

> Panels and states must have a `data-name` attribute in order for them to be referenced. 

## 2: Create a ScrollSequence

```javascript
const sequence = new ScrollSequence({
    container: document.querySelector("[data-sequence]"),
    triggerContainer: document.querySelector("[data-triggers]"),
    panelsContainer: document.querySelector("[data-panels]"), 
    panels: document.querySelectorAll("[data-panel]"), 
    debug: true,
})
```

Key | Type | Description
------------ | ------------ | ------------
container | string | Defines query paramenters for the sequence container
panels | string | Defines query paramenters for all panels within the sequence container
triggerContainer | string | Defines query paramenters for the trigger container

## 3: Loop through panels

```javascript
sequence.panels.forEach(panel => {
    switch(panel.name) {

        case "PanelName":

            (() => {

                // Do something

            })()

            break
    }
}
```

> PanelName must match the data-panel value in the sequence object.

## 4: Con

Each panel contains a master timeline `panel.master` containing a scrollTrigger `panel.master.scrollTrigger` instance. 

```javascript
sequence.panels.forEach(panel => {
    switch(panel.name) {
        case "PanelName":

            (() => {

                function yourTimeline() {
                    let tl = gsap.timeline({paused: true})

                    tl.to(el, {options})

                    return tl
                }

                panel.master.add(yourTimeline())

            })()

            break
    }
}
```

> NOTE: the above is only an example of how to work with ScrollSequence.js, it can always be configured to suit your needs.

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

# Known issues

Sequence object does not need to contain panels. The original code is not nearly as agnostic as it could be. It is currently agnostic by input but not agnostic by function. Each function should run as separately as possible to ensure long term flexibility.

ScrollSequence should come prebuilt with some visuals to help build out the original sequence template. This will be useful when building the structure of the page.

## Status

ScrollSequence.js is a part of Terrain's Ghost library, and is currently in development. Ghost is a library of foundational code blocks, designed for practical use on projects built with GSAP and Tailwind.

Ghost's code is non-obtrusive, and does not create any actions without your direction. It is designed to be as agnostic as possible, allowing it to function freely accross a large variety of applications.

- [x] Basic architecture 
- [x] Integrate base panel ScrollTriggers
- [ ] Add padding parameter to sequence object [default: 50vh]
- [ ] Allow panels to snap to tl labels
- [ ] Switch all debug css to inline styles
- [ ] Update on browser resize
- [ ] Add support for media queries
- [ ] Allow users to set their own scrollTrigger defaults
- [ ] Allow users to set their own default color for debug

## License

[MIT](https://choosealicense.com/licenses/mit/)
