const situations = {
  conflict1: 'conflict1',
  conflict2: 'conflict2',
  comfort1: 'comfort1',
  comfort2: 'comfort2',
};

module.exports = {
  fields: {
    ...situations,
    completed: 'completed',
  },
  situations: Object.values(situations),
};
