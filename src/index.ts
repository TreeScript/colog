export type CologOptions = {
    label?: string
    time?: boolean
    depth?: number
    color?: boolean
}
    
/**
 * colog MVP 스텁: 구현은 추후
 * 지금은 빌드/테스트 파이프라인만 확인용으로 console.log 패스스루
 */
export default function colog(data: unknown, _opts: CologOptions = {}): void {
    // TODO: Node는 util.inspect, Web은 console.dir + JSON pretty 적용 예정
    // 현재는 임시로 원본 출력만.
    // eslint-disable-next-line no-console
    console.log(data)
}
  