import type { CologOptions } from './types'
import { buildModeHeader, formatToColoredTokens } from './format'
import { defaultTheme, toConsoleArgs } from './color'

export function logBrowser(data: unknown, opts: CologOptions = {}) {
    const header = buildModeHeader(opts)
    const depth = opts.depth ?? null
    const view = opts.view ?? "json"
    const theme = defaultTheme

    if (header) {
        console.groupCollapsed(
            "%c" + header,
            "font-family:'Cascadia Code',monospace;font-weight:600;color:#111827;"
        )
    }

    try {
        if (view === 'json' || view === 'both') {

            const tokens = formatToColoredTokens(data, depth, theme, {

                inlineMaxItems: opts.inlineMaxItems ?? 12,
                inlineMaxChars: opts.inlineMaxChars ?? 80,
                rowItems: opts.rowItems ?? 12,
                truncateAt: opts.truncateAt ?? 200,
                headCount: opts.headCount ?? 48,
                tailCount: opts.tailCount ?? 12
            })
            
            const args = toConsoleArgs(tokens, theme)

            console.log(...args)
        }

        if (view === 'tree' || view === 'both') {

            console.dir(data)
        }
    } finally {
        if (header) console.groupEnd()
    }
}
