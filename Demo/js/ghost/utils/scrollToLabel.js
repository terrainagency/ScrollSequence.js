export function scrollToLabel(tl, l, dur) {
    const prc = tl.labels[l] / tl.totalDuration()
    const pos = tl.scrollTrigger.start + (tl.scrollTrigger.end - tl.scrollTrigger.start) * prc

    gsap.to(window, {duration: dur, scrollTo: pos})
}