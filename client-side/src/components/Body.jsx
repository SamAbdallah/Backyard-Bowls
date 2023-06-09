import React from 'react'
import './Body.css'

function Body() {
  return (
    <div className='container'>
      <div>
       <h1 id='title'>The Fastest <br/>Delivery  <br/> in <span id="orange">Your City</span></h1>
       <h5 id='subtitle'>Get your fresh groceries or every morning <br/> delivered to your doorstep...Fastfood as well!</h5>
       <div id='orderButton'><h1>Order Now</h1></div>
      </div>

      <div className='itemsTop'>
        <div id='itemRow'>
          <div>
            
          </div>

        </div>

      </div>
    </div>
  )
}

export default Body