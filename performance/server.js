
function random(min, max) {
  const generateNumber = Math.random() * (max - min) + min
  return Math.floor(generateNumber)
}

module.exports = () => {
  const data = {
    products: []
  }

  for (let i = 0; i < 1000; i++) {
    data.products.push({
      id: i + 1,
      price: random(1, 100),
      title: `Sapato ${i + 1}`,
    })
  }

  return data
}