const { frag, ...rest } = jest.requireActual('../index');

module.exports = {
  ...rest,
  frag: options => {
    frag(options);
    return 'void main() {}';
  },
};
