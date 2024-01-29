export default [
  {
    name: "top",
    description: "top 6",
  },
  {
    name: "rank",
    description: "find rank",
    options: [
      {
        name: "username",
        description: "finds rank of user",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "test",
    description: "test code",
    options: [
      {
        name: "index",
        description: "index of problem",
        type: 3,
        required: true,
      },
      {
        name: "code",
        description: "code",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "aia",
    description: "gets aiasoft problem",
    options: [
      {
        name: "problem",
        description: "problem",
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: "calc",
    description: "calculator",
    options: [
      {
        name: "expression",
        description: "expression",
        type: 3,
        required: true,
      },
    ],
  },
];
