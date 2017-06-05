let previous = ''

function push(route) {
  previous = route
}

function getPreviousRoute() {
  return previous
}

const hashHistory = {
  push,
  getPreviousRoute
}

export { hashHistory }
