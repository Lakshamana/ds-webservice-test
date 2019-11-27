function validateForm() {
  console.log('passei')
  // evt.preventDefault();
  const url = 'https://jsonplaceholder.typicode.com/users'
  // const city = document.getElementById("cidade").value;
  // const state = document.getElementById("estado").value;
  console.log('dslkfjsdlkfj')
  // console.log(city, state);
  getFromUrl(url, function() {
    const response = JSON.parse(this.responseText)
    for (const data of response) {
      const payload = pick(data, ['username', 'email'])
      console.log(payload)
    }
  })
}

function getFromUrl(url, cb) {
  const req = new XMLHttpRequest()
  req.open('GET', url)
  req.onload = cb
  req.send()
}

/**
 *
 * @param {Object} obj
 * @param {Array} params
 */
function pick(obj, params) {
  const payload = {}
  for (const d in obj) {
    if (params.includes(d)) {
      payload[d] = obj[d]
    }
  }
  return payload
}
