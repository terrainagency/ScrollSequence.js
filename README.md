# ScrollSequence.js

Dependencies: GSAP, GSAP Scroll Trigger

Demo: https://terrainagency.com/ghost/objects/scrollsequence/demo

## Usage

ScrollSequence is a <1kb (minified) object built for Terrain's Ghost library.

ScrollSequence.js creates a pinned sequence of master timelines each containing scrollTrigger a instance. The goal of ScrollSequence is to create an efficient workflow for building scroll based pages by advocating for separation of concern through restricting content to HTML, and animation to javascript. 


```javascript
import {ScrollSequence} from './utils.js'
```

## 1: HTML Structure

```HTML
<!-- ScrollSequence container -->
<div data-sequence="genesis" class="relative w-screen min-h-screen">
    <div data-panels class="absolute w-screen h-screen">
        <section data-panel="myFirstPanel" data-height="2" class="">

            <!-- Content for myFirstPanel -->

        </section>
        <section data-panel="mySecondPanel" data-height="4" class="">
            <div data-state="myFirstState">

                <!-- Content for myFirstState of mySecondPanel -->

            </div>
            <div data-state="mySecondState">

                <!-- Content for mySecondState of mySecondPanel -->

            </div>
        </section>
    </div>

    <!-- Trigger Container -->
    <div data-triggers class="relative w-full"></div>
</div>
```

> The `data-name` attribute attached to panels and states must have a value in order for them to be referenced.

## 2: Create a ScrollSequence

```javascript
const sequence = new ScrollSequence({
    container: "[data-sequence]",
    panelsContainer: "[data-panels]", 
    triggerContainer: "[data-triggers]",
    panels: "[data-panel]", 
    debug: true,
})
```

Key | Type | Default | Description
------------ | ------------ | ------------ | ------------
container | string | [data-sequence] | Selector for the sequence
panelsContainer | string | [data-panels] | Selector of sequence panels to pin
triggerContainer | string | [data-triggers] | Selector for triggers to be placed in
panels | string | [data-panel] | Selector for panels
debug | boolean | false | Turns debug mode off/on


## 3: Loop through panels

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

Each panel contains a master timeline `panel.master` containing a scrollTrigger `panel.master.scrollTrigger` instance. 

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

> NOTE: the above is only an example of how to work with ScrollSequence.js, it can always be configured to suit your needs.

## Advanced Example

```javascript
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

- [x] Basic architecture 
- [x] Integrate base panel ScrollTriggers
- [ ] Add padding parameter to sequence object with a default
- [ ] Allow panels to snap to tl labels
- [ ] Switch all debug css to inline styles
- [ ] Update on browser resize
- [ ] Add support for media queries
- [ ] Allow users to set their own scrollTrigger defaults
- [ ] Allow users to set their own default color for debug
- [x] Set defaults for container and panel queries
 
# Known issues

* data-height may violate the separation of concerns as it pertains more to animation than the content itself. 
* trigger container may violate the separation of concerns as it is required for functionality.

## License

[MIT](https://choosealicense.com/licenses/mit/)
