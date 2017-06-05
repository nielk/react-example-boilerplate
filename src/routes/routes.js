import { Route, IndexRedirect, Redirect } from 'react-router'

export default (
  <Route path="/">
    <IndexRedirect to="login" />
    <Route path="login" onEnter={() => {}} onLeave={() => {}} />
    <Route path="/" component={AppPage} onEnter={(nextState, replace, callback) => {}}>
      <Route path="home" component={} />
    </Route>
    <Redirect from="*" to="/" />
  </Route>
)
