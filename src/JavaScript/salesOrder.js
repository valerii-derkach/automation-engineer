function orderByTotal(sales) {
  const modifiedSales = sales.map(sale => ({
    ...sale,
    total: sale.amount * sale.quantity
  }));

  modifiedSales.sort((a, b) => a.total - b.total);

  return modifiedSales;
}

module.exports = orderByTotal;
