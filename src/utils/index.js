const getSelectedField = (select = []) => {
  return Object.fromEntries(select.map(field => [field, 1]))
}

const unSelectedField = (unSelect = []) => {
  return Object.fromEntries(unSelect.map(field => [field, 0]))
}

module.exports = {
  getSelectedField,
  unSelectedField
}