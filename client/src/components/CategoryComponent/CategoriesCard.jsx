import React from 'react'
import Card from '../../ui/Card'
import { useSelector } from 'react-redux'
function CategoriesCard() {


  const {filteredProducts,productList,selectedCategory}=useSelector((state =>state.product))

  const title=selectedCategory && selectedCategory !== 'All' ? selectedCategory  : 'All Products'


  const productToShow=filteredProducts.length > 0 ? filteredProducts :productList
  return (
    <>
    <div className='d-flex flex-column'>
    <p style={{fontSize:"32px",fontWeight:"bold",fontFamily:'Satoshi',color:'rgba(0,0,0,1)',marginBottom:"30px"}}>{title}</p>
    <div className='category-card d-flex flex-wrap gap-3'>

        {productToShow.map( product =>(
        <>
         <div style={{height:"520px"}}  key={product.id}>
            <Card  product={product}/>
          </div>
        </>
         
        ))}
    </div>
    </div>
    </>
  )
}

export default CategoriesCard