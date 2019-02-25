import React, { Component } from 'react'
import PropTypes from 'prop-types'
import scrollSnapPolyfill from 'css-scroll-snap-polyfill'
import scroll from './animateScroll'

import styles from './styles.css'

const NextArrow = ({handleClick}) => (
  <svg onClick={handleClick} className={styles.nextArrow} width='24px' height='24px' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <polyline points='9 18 15 12 9 6' />
  </svg>
)
NextArrow.propTypes = {
  handleClick: PropTypes.func.isRequired
}

const PrevArrow = ({handleClick}) => (
  <svg onClick={handleClick} className={styles.prevArrow} width='24px' height='24px' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <polyline points='15 18 9 12 15 6' />
  </svg>
)
PrevArrow.propTypes = {
  handleClick: PropTypes.func.isRequired
}

const currentSlide = (left, slidesArray) => (
  slidesArray.find((slide) => {
    return Math.ceil(left / 10) * 10 >= slide.left && Math.ceil(left / 10) * 10 < slide.right
  })
)

export default class Carousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slidesArray: [],
      currentScroll: 0
    }
    this.sliderRef = React.createRef()
    this.refsArray = []
    this.handleScroll = this.handleScroll.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
  }

  render() {
    const {
      children,
      snapAlign
    } = this.props

    var slides = React.Children.map(children, (child, index) => {
      const ref = React.createRef()
      this.refsArray.push(ref)

      return (
        <div ref={this.slideRef} className={styles.slide} style={{
          scrollSnapAlign: snapAlign
        }}>
          {React.cloneElement(child, {ref, key: index})}
        </div>
      )
    })

    return (
      <div className={styles.wrapper}>
        <PrevArrow handleClick={this.handlePrev} />
        <div className={styles.slider} ref={this.sliderRef} onScroll={this.handleScroll}>
          {slides}
        </div>
        <NextArrow handleClick={this.handleNext} />
      </div>
    )
  }

  componentDidMount () {
    scrollSnapPolyfill()
    this.setState({
      slidesArray: this.refsArray.map((ref, i) => (
        {
          index: i,
          el: ref.current,
          left: ref.current.offsetLeft,
          right: ref.current.offsetLeft + ref.current.offsetWidth
        }
      ))
    })
  }

  handleScroll () {
    this.setState({currentScroll: this.sliderRef.current.scrollLeft})
  }

  handleNext () {
    const slides = this.state.slidesArray
    const slider = this.sliderRef.current
    const thisSlide = currentSlide(slider.scrollLeft, slides)
    if (thisSlide.index !== slides.length - 1) {
      const nextSlide = slides[thisSlide.index + 1]
      scroll(slider, nextSlide.left)
    }
  }

  handlePrev () {
    const slides = this.state.slidesArray
    const slider = this.sliderRef.current
    const thisSlide = currentSlide(slider.scrollLeft, slides)
    if (thisSlide.index !== 0) {
      const prevSlide = slides[thisSlide.index - 1]
      scroll(slider, prevSlide.left)
    }
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    snapAlign: PropTypes.string
  }

  static defaultProps = {
    snapAlign: 'start'
  }
}
