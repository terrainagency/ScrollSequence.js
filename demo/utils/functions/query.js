// usage: query(source, selector, default selector, all)

export function query(src, sel, d, all) {    
    if(sel === undefined) {sel = d}
    if(all === true) {return src.querySelectorAll(sel)} 
    else {return src.querySelector(sel)}
}