import colog from "../../dist/index.browser.js"

const _data = {
    user: {
      id: 33,
      username: "moon_dev",
      profile: {
        nickname: "Moon",
        avatarUrl: "https://example.com/avatar.png",
        bio: "Full-stack developer & blogger",
      },
    },
    posts: Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      title: `Post ${i + 1} Title`,
      content: `This is a sample content of post ${i + 1}.`,
      tags: ["typescript", "nextjs", "colog"],
      comments: Array.from({ length: 2 }, (_, j) => ({
        id: j + 1,
        author: `commenter_${j + 1}`,
        message: `Comment ${j + 1} on post ${i + 1}`,
        likes: Math.floor(Math.random() * 10),
      })),
    })),
  }

// default
colog(_data)