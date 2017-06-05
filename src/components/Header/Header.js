import React, { PropTypes } from 'react'
import { Grid, Col } from 'react-bootstrap'

const Title = (props) => {
  const { children, title } = props

  return (
    <Grid className="header">
      <Col xs={12} sm={9}>
        <h1 className="header-h1">{title}</h1>
      </Col>
      <Col xs={12} sm={3}>
        <div className="header-right">
          {children}
        </div>
      </Col>
    </Grid>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
}

Title.defaultProps = {
  children: null
}

export default Title
