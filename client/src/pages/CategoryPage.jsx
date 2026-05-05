import React from 'react'
import OffCanvas from '../components/CategoryComponent/OffCanvas'
import BreadCrumb from '../ui/BreadCrumb'
import CategoriesCard from '../components/CategoryComponent/CategoriesCard'
function CategoryPage() {
  return (
    <div className='container-fluid ps-5 p-5 '>
          <BreadCrumb  home={"Home"} text={"Casual"}/>
       <div className='d-flex gap-5'>
         <OffCanvas />
        <CategoriesCard />
       </div>
    </div>
  )
}

export default CategoryPage