export function parseFlex(str) {
    if(str) {
        let pos = str.split(/\s+/)
        pos.forEach((p, i) => {
            switch(p) {
                case "left":
                case "top": pos[i] = "flex-start"
                    break
                case "center": pos[i] = "center"
                    break
                case "right":
                case "bottom": pos[i] = "flex-end"
                    break
            }
        })
        return pos
    }
    return ["flex-start", "flex-start"]
}