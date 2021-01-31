function parseColor(c, def) {
    let color 
    if(!c) {color = def}
    else {color = typeof c === 'string' || c instanceof String ? c : `rgba(r: ${c.r}, g: ${c.g}, b: ${c.b}, a: ${c.a})`}

    return color
}