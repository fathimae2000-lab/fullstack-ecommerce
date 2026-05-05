import React from 'react'
import Hero from '../components/HomeComponent/Hero'
import Brand from '../components/HomeComponent/Brand'
import NewArrival from '../components/HomeComponent/NewArrival'
import TopSelling from '../components/HomeComponent/TopSelling'
import Category from '../components/HomeComponent/Category'
import Review from '../components/HomeComponent/Review'
const HomePage = () => {
  return (
    <div>
        <Hero/>
        <Brand/>
        <NewArrival/>
        <TopSelling/>
        <Category/>
        <Review/>
    </div>
  )
}

export default HomePage