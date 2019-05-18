const translation = require('./translation')

test('translate the swedish input to the robber language', () => {
  expect(translation.translateToRobberLanguage('rövarspråket')).toBe('rorövovarorsospoproråkoketot')
})

test('translate the robber input to swedish', () => {
  expect(translation.translateToSwedishLanguage('rorövovarorsospoproråkoketot')).toBe('rövarspråket')
})
