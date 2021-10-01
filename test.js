export const test = (req, res) => {
  res.json({
    products: [
      {
        id: 1,
        title: 'node',
        description: 'node.js is awesome',
      },
      {
        id: 2,
        title: 'express',
        description: 'express is a server-side framework for node.js',
      },
    ],
  });
};
