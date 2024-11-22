import React from 'react';

const ProgressIndicator = ({ shoppingList }) => {
  const totalProducts = shoppingList.length;
  const purchasedProducts = shoppingList.filter(product => product.purchased).length;
  const progress = totalProducts ? (purchasedProducts / totalProducts) * 100 : 0;

  return (
    <div>
      <h3>Progress: {purchasedProducts}/{totalProducts} ({progress.toFixed(2)}%)</h3>
      <progress value={progress} max="100"></progress>
    </div>
  );
};

export default ProgressIndicator;