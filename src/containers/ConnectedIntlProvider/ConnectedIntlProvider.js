// https://github.com/yahoo/react-intl/issues/234

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { Map } from 'immutable'

import {
  initLanguage
} from 'containers/ConnectedIntlProvider/actions'
import {
  getLanguagePending,
  getLanguageCode,
  getMessages
} from 'containers/ConnectedIntlProvider/selectors'

class ConnectedIntlProvider extends Component {

  componentWillMount() {
    this.props.initLanguage()
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.isPending !== nextProps.isPending ||
           !this.props.languageCode !== nextProps.languageCode
  }

  render() {
    return this.props.isPending ? null : (
      <IntlProvider
        key={this.props.languageCode}
        locale={this.props.languageCode}
        messages={this.props.messages.toJS()}
      >
        {this.props.children}
      </IntlProvider>
    )
  }
}

ConnectedIntlProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isPending: PropTypes.bool.isRequired,
  languageCode: PropTypes.string.isRequired,
  messages: PropTypes.instanceOf(Map).isRequired,
  initLanguage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isPending: getLanguagePending(state),
  languageCode: getLanguageCode(state),
  messages: getMessages(state)
})

const mapDispatchToProps = {
  initLanguage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedIntlProvider)
