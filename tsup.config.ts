import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],   // ESM + CJS 동시 지원
    dts: true,                // 타입 선언 출력
    sourcemap: true,
    clean: true,
    target: "es2020",
    treeshake: true,
    minify: false
})
