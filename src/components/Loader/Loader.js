import React, { PropTypes } from 'react'

const Loader = props => (
  <div className="loader-wrap">
    <div className="loader" />
    <p className="loader-text">{props.children}</p>
  </div>
)

Loader.propTypes = {
  children: PropTypes.node
}

Loader.defaultProps = {
  children: null
}

export default Loader
