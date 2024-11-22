import React from 'react';

const ProductList = ({ products, onEditProduct, onDeleteProduct, onToggleProduct }) => {
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedProducts).map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {groupedProducts[category].map(product => (
              <li key={product._id}>
                <span style={{ textDecoration: product.purchased ? 'line-through' : 'none' }}>
                  {product.name} - {product.quantity}
                </span>
                <button className="button button-toggle" onClick={() => onToggleProduct(product._id)}>
                  {product.purchased ? 'Unmark' : 'Mark as Purchased'}
                </button>
                <button className="button button-edit" onClick={() => onEditProduct(product)}>Edit</button>
                <button className="button button-delete" onClick={() => onDeleteProduct(product._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductList;