import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setQuantity(product.quantity);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      _id: product ? product._id : null,
      name,
      category,
      quantity,
      purchased: product ? product.purchased : false,
    };
    onSave(newProduct);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default ProductForm;