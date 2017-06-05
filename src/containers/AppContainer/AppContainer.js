import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'

const AppContainer = ({ children }) => (
  <div>
    <main className="app-container">
      <Grid>
        {children}
      </Grid>
    </main>
  </div>
)

AppContainer.propTypes = {
  children: PropTypes.node
}

AppContainer.defaultProps = {
  children: ''
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)
