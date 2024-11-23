import React, { useEffect, useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProgressIndicator from './components/ProgressIndicator';
import UserSettings from './components/UserSettings';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      setShoppingList(data);
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSaveProduct = async (product) => {
    const response = await fetch(`http://localhost:5000/products${product._id ? `/${product._id}` : ''}`, {
      method: product._id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    setShoppingList((prevList) =>
      product._id
        ? prevList.map((item) => (item._id === product._id ? data : item))
        : [...prevList, data]
    );
    setIsFormOpen(false);
  };

  const handleDeleteProduct = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    });
    setShoppingList((prevList) => prevList.filter((item) => item._id !== id));
  };

  const handleToggleProduct = async (id) => {
    const response = await fetch(`http://localhost:5000/products/${id}/toggle`, {
      method: 'PATCH',
    });
    if (!response.ok) {
      console.error('Failed to toggle product');
      return;
    }
    const data = await response.json();
    setShoppingList((prevList) =>
      prevList.map((item) => (item._id === id ? data : item))
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Compras Kiyo</h1>
        <UserSettings />
      </header>
      <main>
        <button className="add-product-button" onClick={handleAddProduct}>Add Product</button>
        <ProductList
          products={shoppingList}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onToggleProduct={handleToggleProduct}
        />
        <ProgressIndicator shoppingList={shoppingList} />
      </main>
      {isFormOpen && (
        <ProductForm
          product={currentProduct}
          onClose={handleCloseForm}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}

export default App;