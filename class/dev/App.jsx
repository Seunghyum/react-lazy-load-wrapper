import React, { Component } from 'react'
import LazyLoadWrapper from '../index'
import { BG_IMG } from './constants'

const images = [
  'https://images.pexels.com/photos/1884306/pexels-photo-1884306.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3989816/pexels-photo-3989816.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2569471/pexels-photo-2569471.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3965506/pexels-photo-3965506.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/1713953/pexels-photo-1713953.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3052725/pexels-photo-3052725.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3041347/pexels-photo-3041347.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
]

class App extends Component {
  render() {
    return (
      <>
        {images.map((img, index) => (
          <LazyLoadWrapper key={index} label={BG_IMG} isTriggerOnce>
            <img src={img} alt="" />
          </LazyLoadWrapper>
        ))}
      </>
    )
  }
}
export default App
