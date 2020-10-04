export interface Color {
    hex: string
    r: number
    g: number
    b: number
}

export namespace Color {
    export const distanceBetween = (a: Color, b: Color) => {
        return Math.sqrt(Math.pow(Math.abs(a.r - b.r), 2)
            + Math.pow(Math.abs(a.g - b.g), 2)
            + Math.pow(Math.abs(a.b - b.b), 2))
    }
}

export interface SoundNamedColor extends Color {
    sound: string
}

export const allColors = () => {
    const result: Color[] = []
    for (let i = 0; i <= 255; i += 8) {
        for (let j = 0; j <= 255; j += 8) {
            for (let k = 0; k <= 255; k += 8) {
                result.push({
                    r: i,
                    g: j,
                    b: k,
                    hex: `#${i.toString(16).toUpperCase().padStart(2, '0')}${j.toString(16).toUpperCase().padStart(2, '0')}${k.toString(16).toUpperCase().padStart(2, '0')}`
                })
            }
        }
    }
    return result
}
