import { isNode } from "./env"
import { logNode } from "./node"
import { logBrowser } from "./browser"

export type CologOptions = {
    label?: string
    time?: boolean
    depth?: number | null
    color?: boolean
    compact?: boolean | number
    lineWidth?: number
    view?: "json" | "tree" | "both"
}
    
/**
 * colog MVP 스텁: 구현은 추후
 * 지금은 빌드/테스트 파이프라인만 확인용으로 console.log 패스스루
 */
export default function colog(data: unknown, opts: CologOptions = {}): void {

    if(isNode) {
        logNode(data, opts)
    }else {
        logBrowser(data, opts)
    }
}


export type { CologOptions as CologOpts }