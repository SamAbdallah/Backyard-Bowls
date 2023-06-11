import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import './AddProduct.css';

function AddProduct() {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    category: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('productPrice', formData.productPrice);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('image', formData.image);

    axios
      .post('http://localhost:3000/createItem', data)
      .then((response) => {
        console.log('Item created successfully:', response.data);
        // Reset form values
        setFormData({
          productName: '',
          productPrice: '',
          category: '',
          description: '',
          image: null,
        });
      })
      .catch((error) => {
        console.error('Error creating item:', error);
      });
  };

  return (
    <div id='container'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product name:</label>
          <input type='text' name='productName' value={formData.productName} onChange={handleChange} />
        </div>
        <div>
          <label>Product Price:</label>
          <input type='text' name='productPrice' value={formData.productPrice} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type='text' name='description' value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type='text' name='category' value={formData.category} onChange={handleChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type='file' name='image' onChange={handleFileChange} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
