const weightedRandomProduct = (products) => {
  const prices = products.map((product) => product.price);
  const weights = prices.map((price) => 1 / price);

  const totalWeight = weights.reduce((acc, val) => acc + val, 0);
  const rand = Math.random() * totalWeight;
  let sum = 0;

  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (rand <= sum) {
      return products[i];
    }
  }
};

module.exports = weightedRandomProduct;
