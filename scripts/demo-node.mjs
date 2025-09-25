import colog from "../dist/index.cjs"

// colog({ id: 1, name: "moon", nested: { hello: "world", arr: [1, 2, 3] } }, {
//     label: "DEMO",
//     tiem: true,
//     depth: null,
//     color: true
// })

// colog({ id: 1, name: "moon", nested: { hello: "world", arr: [1, 2, 3] } }, { compact: false })

const data = {
    id: 1,
    name: "moon",
    nested: {
        hello: "world",
        // 짧은 배열 (한 줄로 나오기 좋음)
        arr: [1, 2, 3],
        // 긴 배열 (줄바꿈 되는지 확인)
        longArr: Array.from({ length: 30 }, (_, i) => i + 1),
        // 객체 배열 (더 읽기 좋은지 확인)
        users: Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        username: `user_${i + 1}`,
        email: `user${i + 1}@test.com`,
        })),
    },
};

// colog(`Data: ${data}`)
colog(data)