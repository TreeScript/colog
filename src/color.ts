export type Token = { 
    text: string 
    style?: string
}

export type ColorTheme = {
    font: string
    key: string
    string: string
    number: string
    boolean: string
    nil: string
    punctuation: string
}

export const defaultTheme: ColorTheme = {
    font: "font-family: 'Cascadia Code', monospace; white-space: pre; line-height: 1.4; font-size: 13px;",
    key: "color:#6B7280",
    string: "color:#10B981",
    number: "color:#3B82F6",
    boolean: "color:#F59E0B",
    nil: "color:#9CA3AF",
    punctuation: "color:inherit"
}

export function toConsoleArgs(tokens: Token[], theme: ColorTheme): [string, ...string[]] {
    let fmt = ""
    const styles: string [] = []

    for(const _token of tokens) {
        if(_token.style) {
            fmt += "%c" + _token.text
            styles.push(`${theme.font}; ${_token.style}`)
        }else {
            fmt += "%c" + _token.text
            styles.push(`${theme.font}; ${theme.punctuation}`)
        }
    }

    return [fmt, ...styles]
}