// usage: query(source, selector, default selector, all)
// Allows query selectors to have a default selector. Useful in constructors
export function query(src, sel, d, all) {    
    if(sel === undefined) {sel = d}
    if(all === true) {return src.querySelectorAll(sel)} 
    else {return src.querySelector(sel)}
}