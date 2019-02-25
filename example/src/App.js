import React, { Component } from 'react'

import Carousel from 'react-scroll-carousel'

export default class App extends Component {
  render () {
    return (
      <Carousel>
        <div className="item">item 1</div>
        <div className="item">item 2</div>
        <div className="item">item 3</div>
        <div className="item">item 4</div>
        <div className="item">item 5</div>
        <div className="item">item 6</div>
        <div className="item">item 7</div>
        <div className="item">item 8</div>
      </Carousel>
    )
  }
}
