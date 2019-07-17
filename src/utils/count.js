export const getTotalCount = (data, key) => {
  let total = 0
  data.forEach(item => total += parseInt(item[key], 10))

  return total
}
