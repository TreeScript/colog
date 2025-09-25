import { logBrowser } from "./browser"
import type { CologOptions } from "./types"

export default function colog(data: unknown, opts: CologOptions = {}): void {

    if(opts.view === undefined) opts.view = "json"
    logBrowser(data, opts)
}

export type { CologOptions as CologOpts }