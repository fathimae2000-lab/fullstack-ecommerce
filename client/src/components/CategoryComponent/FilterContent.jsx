import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import {setCategoryFilter} from '../../productAPI/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'

function FilterContent() {

  const {selectedCategory}=useSelector((state =>state.product))
 
  const categories=["T-shirts", "Shorts", "Shirts", "Jeans"]
  const dispatch=useDispatch()

  return (
    <div className="filter-wrapper">

        {/* ALL */}
        <div
          className={`filter-item ${selectedCategory === "All" ? "active" : ""}`}
          onClick={() => dispatch(setCategoryFilter("All"))}
        >
          <span>All</span>
          <FaChevronRight size={12} />
        </div>
      {/* Category */}
      <div className="filter-section">
        {categories.map((item, i) => (
          <div className="filter-item" onClick={()=>{
            dispatch(setCategoryFilter(item))
          }} key={i}>
            <span>{item}</span>
            <FaChevronRight size={12} />
          </div>
        ))}
      </div>

      <hr />

      {/* Price */}
      <h5>Price</h5>
      <input type="range" className="range" />

      {/* Colors */}
      <h5>Colors</h5>
      <div className="main-color">
        {["green", "red", "yellow", "orange", "blue", "darkblue", "purple", "pink", "white", "black"]
          .map((c, i) => (
            <div key={i} className={`color-circle ${c}`}></div>
          ))}
      </div>

      {/* Size */}
      <h5>Size</h5>
      <div className="size-section">
        {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large','XX-Large','3X-Large','4X-Large'].map((s, i) => (
          <div key={i} className="size-box">{s}</div>
        ))}
      </div>

        {/* Styles */}
         <h5>Dress Style</h5>
      <div className="filter-section">
        {['Casual', "Formal", "Party", "Gym"].map((item, i) => (
          <div className="filter-item" key={i}>
            <span>{item}</span>
            <FaChevronRight size={12} />
          </div>
        ))}
      </div>

      <button className="apply-btn w-100">Apply Filter</button>
    </div>
  )
}

export default FilterContent