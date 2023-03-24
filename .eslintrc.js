module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {endOfLine: 'auto', singleQuote: true, parser: 'flow'},
    ],
  },
};
