# GSAP Scroll Sequence

An agnostic GSAP ScrollSequence object built for Terrain's Ghost library.

# Usage

The goal of ScrollSequence is to create an efficient workflow for building scroll based pages. ScrollSequence is configured partially through HTML to allow sequence content to be easily modified over time.

> Panels and states must have a `data-name` attribute in order for them to be referenced.

# Panels

Panels are the main building blocks of a sequence.

Option | Default
[data-name] | undefined
[data-height] | undefined

# States

States are child elements of a panel that contain a section of content

Option | Default
[data-name] | undefined
[data-height] | flex-auto