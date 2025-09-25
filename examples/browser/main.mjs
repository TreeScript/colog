import colog from "../../dist/index.browser.js"

const data = {
    id: 1,
    name: "moon",
    nested: {
        hello: "world",
        arr: [1, 2, 3],
        longArr: Array.from({ length: 30 }, (_, i) => i + 1),
        users: Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            username: `user_${i + 1}`,
            email: `user${i + 1}@test.com`,
        })),
    },
}

// 기본
// colog(data, { view: "both" })
// colog(data, { view: "tree" })

colog(data)