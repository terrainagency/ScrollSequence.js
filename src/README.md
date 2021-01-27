# Known issues

Sequence object does not need to contain panels. The original code is not nearly as agnostic as it could be. It is currently agnostic by input but not agnostic by function. Each function should run as separately as possible to ensure long term flexibility.

ScrollSequence should come prebuilt with some visuals to help build out the original sequence template. This will be useful when building the structure of the page.


# Checklist
- [x] Basic architecture 
- [x] Integrate base panel ScrollTriggers
- [ ] Add padding parameter to sequence object [default: 50vh]
- [ ] Allow panels to snap to tl labels
- [ ] Switch all debug css to inline styles
- [ ] Update on browser resize
- [ ] Add support for media queries


