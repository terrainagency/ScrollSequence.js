// var _ = (function () {

// 	'use strict';

// 	// Create the methods object
// 	var methods = {};

// 	//
// 	// Methods
// 	//

// 	methods.query = function () {
//         let sel = el
//         if(sel === undefined) {sel = d}
    
//         if(all === true) {return document.querySelectorAll(sel)} 
//         else {return document.querySelector(sel)}
// 	};

// 	// Expose the public methods
// 	return methods;

// })();



export function query(el, d, all) {
    let sel = el
    if(sel === undefined) {sel = d}

    if(all === true) {return document.querySelectorAll(sel)} 
    else {return document.querySelector(sel)}
}