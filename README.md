# GSAP Scroll Sequence

Dependencies: GSAP, GSAP Scroll Trigger

## Usage

GSAP ScrollSequence is a <1kb (minified) object built for Terrain's Ghost library.

The goal of ScrollSequence is to create an efficient workflow for building scroll based pages. ScrollSequence is configured partially through HTML to allow sequence content to be easily modified over time.

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
let sequence = new ScrollSequence({
    container: "[data-sequence]",
    panels: "[data-panel]",
    triggerContainer: "[data-triggers]",
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
        case "myPanel":
            // do something
            break
        default:
            console.log("Error: panel.name not found")
    }
}
```

> Switch statements are recommended as an easy and transparent way to specify functions to a specfic panel. 

## 4: Create a master timeline and ScrollTrigger for each panel

```javascript
sequence.panels.forEach(panel => {
    switch(panel.name) {
        case "myPanel":
            let master = new TimelineMax({paused: true})

            gsap.registerPlugin(ScrollTrigger)

            ScrollTrigger.create({
                trigger: panel.trigger,
                start: "top",
                end: "bottom",
                toggleActions: "play pause resume reset",
                animation: master,    
                onEnter: () => console.log(panel),
                markers: true,
            })
            break
        default:
            console.log("Error: panel.name not found")
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
