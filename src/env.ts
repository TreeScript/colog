export const isNode =
    typeof process !== "undefined" &&
    !!(process as any).versions?.node


export const isBrowser =
    typeof window !== "undefined" &&
    typeof document !== "undefined"