
function validateForm(evt) {
  evt.preventDefault();
  const url = 'http://servicos.cptec.inpe.br/XML/cidade/244/previsao.xml'
  // const city = document.getElementById("cidade").value;
  // const state = document.getElementById("estado").value;
  // console.log(city, state);
  getFromUrl(url, function() {
    const response = this.responseXML.getElementsByTagName('previsao')
    let previsoes = []
    for (const dia of response){
      let previsao = {}
      for (const node of dia.childNodes){
        previsao[node.tagName] = node.innerHTML
      }
      previsoes.push(previsao)
    }
    console.log(previsoes)
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
