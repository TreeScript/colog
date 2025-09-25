import util, { inspect } from "node:util"
import type { CologOptions } from "./index"
import { buildModeHeader } from "./format"

const BOLD = '\x1b[1m'
const DIM = '\x1b[2m'
const RESET = '\x1b[0m'

export function logNode(data: unknown, opts: CologOptions = {}) {

    const header = buildModeHeader(opts)

    const { 
        depth = null, 
        color = true,
        compact = 3,
        lineWidth = 120
    } = opts

    const inspected = util.inspect(data, {
        colors: color,
        depth: depth ?? null,
        compact,
        breakLength: lineWidth,
        maxStringLength: Infinity
    })

    if(header) {

        const [label, ...rest] = header.split(" ")
        const time = rest.join(" ")
        const decorated =
            time ? `${BOLD}${label}${RESET} ${DIM}${time}${RESET}` : `${BOLD}${label}${RESET}`

        console.log(decorated + "\n" + inspected)
    }else {
        console.log(inspected)
    }
}
