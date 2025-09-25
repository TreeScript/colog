import type { CologOptions } from './types'
import type { Token, ColorTheme } from './color'

const INDENT = '  ' // 2 spaces

function P(tokens: Token[], text: string, style?: string) {
    tokens.push({ text, style })
}

function indent(level: number) { return INDENT.repeat(level) }

function chunk<T>(arr: T[], n: number): T[][] {

    const out: T[][] = []
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
    
    return out
}

// ── Prefix (라벨/시간) ──────────────────────────────
export function buildModeHeader(opts: CologOptions = {}): string {

    const view = (opts.view ?? "json").toLowerCase()
    const mode = 
        view === "json" 
        ? "JSON"
        : view === "tree"
        ? "TREE"
        : "JSON + TREE"
    
    const parts: string[] = [mode]    

    if(opts.time) parts.push(new Date().toISOString())

    return parts.join(" ")
}

// ── 컬러 토큰 프린터 ────────────────────────────────
const isPrimitive = (v: any) => v === null || typeof v !== 'object'
const isPrimitiveArray = (arr: any[]) => arr.every(isPrimitive)

type LayoutOpts = {
    depth: number | null
    inlineMaxItems: number
    inlineMaxChars: number
    rowItems: number
    truncateAt: number
    headCount: number
    tailCount: number
}

const defaultLayout: LayoutOpts = {
    depth: null,
    inlineMaxItems: 12,
    inlineMaxChars: 80,
    rowItems: 12,
    truncateAt: 200,
    headCount: 48,
    tailCount: 12
}

const jt = (v: any) => JSON.stringify(v)

export function formatToColoredTokens(
    value: unknown,
    depth: number | null,
    theme: ColorTheme,
    layout: Partial<LayoutOpts> = {}
): Token[] {

    const L: LayoutOpts = { ...defaultLayout, depth, ...layout }
    const seen = new WeakSet<any>()
    const out: Token[] = []

    function val(v: any, lvl: number) {
        if (v === null) return P(out, 'null', theme.nil)
        switch (typeof v) {
            case 'string': return P(out, jt(v), theme.string)
            case 'number': return P(out, String(v), theme.number)
            case 'boolean': return P(out, String(v), theme.boolean)
            case 'undefined': return P(out, 'undefined', theme.nil)
        }

        if (seen.has(v)) { P(out, '"[Circular]"', theme.nil); return }
        seen.add(v)

        if (Array.isArray(v)) {
            if (L.depth !== null && lvl >= (L.depth as number)) {
                P(out, '"[MaxDepth]"', theme.nil); return
            }

            // 원시 배열 최적화
            if (isPrimitiveArray(v)) {
                const inlineCandidate = `[ ${v.map(x =>
                    typeof x === 'string' ? jt(x) :
                        typeof x === 'number' ? String(x) :
                            typeof x === 'boolean' ? String(x) :
                                x === null ? 'null' : String(x)
                ).join(', ')} ]`

                // 1) 한 줄
                if (v.length <= L.inlineMaxItems && inlineCandidate.length <= L.inlineMaxChars) {
                    P(out, '[ ')
                    v.forEach((x, i) => {
                        if (i) P(out, ', ')
                        val(x, lvl + 1)
                    })
                    P(out, ' ]')
                    return
                }

                // 2) 아주 길면 head/tail만
                if (v.length > L.truncateAt) {
                    P(out, '[\n')
                    for (const row of chunk(v.slice(0, L.headCount), L.rowItems)) {
                        P(out, indent(lvl + 1))
                        row.forEach((x, i) => { if (i) P(out, ', '); val(x, lvl + 1) })
                        P(out, '\n')
                    }
                    P(out, indent(lvl + 1))
                    P(out, `… (+${v.length - L.headCount - L.tailCount} more)\n`, theme.nil)
                    for (const row of chunk(v.slice(-L.tailCount), L.rowItems)) {
                        P(out, indent(lvl + 1))
                        row.forEach((x, i) => { if (i) P(out, ', '); val(x, lvl + 1) })
                        P(out, '\n')
                    }
                    P(out, indent(lvl)); P(out, ']')
                    return
                }

                // 3) 일반: 가로 그리드
                P(out, '[\n')
                for (const row of chunk(v, L.rowItems)) {
                    P(out, indent(lvl + 1))
                    row.forEach((x, i) => { if (i) P(out, ', '); val(x, lvl + 1) })
                    P(out, '\n')
                }
                P(out, indent(lvl)); P(out, ']')
                return
            }

            // 객체/중첩 배열
            P(out, '[\n')
            v.forEach((x, i) => {
                P(out, indent(lvl + 1)); val(x, lvl + 1)
                if (i < v.length - 1) P(out, ',')
                P(out, '\n')
            })
            P(out, indent(lvl)); P(out, ']')
            return
        }

        // object
        if (L.depth !== null && lvl >= (L.depth as number)) {
            P(out, '"[MaxDepth]"', theme.nil); return
        }

        const keys = Object.keys(v)
        if (keys.length === 0) { P(out, '{}'); return }

        P(out, '{\n')
        keys.forEach((k, i) => {
            P(out, indent(lvl + 1)); P(out, jt(k), theme.key); P(out, ': ')
            val((v as any)[k], lvl + 1)
            if (i < keys.length - 1) P(out, ',')
            P(out, '\n')
        })
        P(out, indent(lvl)); P(out, '}')
    }

    try { val(value, 0) } catch { return [{ text: String(value) }] }
    return out
}
