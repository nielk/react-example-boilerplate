let conf = {}

const Conf = {
  load: () => (
    fetch('./config.json')
      .then(data => data.json())
      .then((data) => {
        conf = data
      })
      .catch(() => {
        console.error('Cannot load configuration file')
      })
  ),
  get: prop => (prop ? conf[prop] : conf)
}

export default Conf
