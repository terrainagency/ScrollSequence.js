// usage: query(selector, default selector, all)

export function query(el, d, all) {    
    let sel = el
    if(sel === undefined) {sel = d}

    if(all === true) {return document.querySelectorAll(sel)} 
    else {return document.querySelector(sel)}
}