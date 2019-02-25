Math.easeOutQuintic = function(t, b, c, d) {
  var ts = (t /= d) * t
  var tc = ts * t
  return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t)
}
Math.easeOutCubic = function(t, b, c, d) {
  var ts = (t /= d) * t
  var tc = ts * t
  return b + c * (tc + -3 * ts + 3 * t)
}

var requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 1000 / 60) }
})()

function scroll(element, to, callback, duration) {
  element.style.scrollSnapType = 'y mandatory'
  const start = element.scrollLeft
  const change = to - start
  let currentTime = 0
  const increment = 20

  duration = (typeof (duration) === 'undefined') ? 500 : duration

  var animateScroll = function() {
    currentTime += increment
    var val = Math.easeOutCubic(currentTime, start, change, duration)
    element.scrollLeft = val
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      element.style.scrollSnapType = 'x mandatory'
      if (callback && typeof (callback) === 'function') {
        callback()
      }
    }
  }
  animateScroll()
}

export default scroll
