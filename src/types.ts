export type CologOptions = {
    // 공통
    label?: string
    autoLabel?: boolean
    time?: boolean
    depth?: number | null
    color?: boolean
    compact?: boolean | number
    lineWidth?: number

    view?: 'json' | 'tree' | 'both'
    inlineMaxItems?: number   // 한 줄에 허용할 원시 항목 개수 (기본 12)
    inlineMaxChars?: number   // 한 줄 문자열 최대 길이 (기본 80)
    rowItems?: number         // 그리드 모드: 한 줄에 몇 개 (기본 12)
    truncateAt?: number       // 이 개수를 넘으면 head/tail만 보여주기 (기본 200)
    headCount?: number        // 생략 모드에서 앞에 보여줄 개수 (기본 48)
    tailCount?: number        // 생략 모드에서 뒤에 보여줄 개수 (기본 12)
  }
  