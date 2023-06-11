import { useState } from 'react'
import React from 'react'
import './AddProduct.css'

function AddProduct() {


    const [formData,setFormData]=useState({
        name:'',
        price:'',
        category:'',
        description:'',
        imagePath:''

    })

    const handleChange=(e)=>{
     setFormData({...formData,
        [e.target.name]:e.target.value
        
     })
    }

  return (
    <div id='container'>
        <form>
            <div>
                <label>Product name:</label>
                <input type='text'  />
            </div>
        </form>
    </div>
  )
}

export default AddProduct 