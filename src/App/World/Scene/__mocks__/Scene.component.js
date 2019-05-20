const OLD_ENV = process.env.NODE_ENV;
process.env.NODE_ENV = 'test';
module.exports = jest.requireActual('../Scene.component');
process.env.NODE_ENV = OLD_ENV;
