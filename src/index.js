
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
    writeDataOnHtml(previsoes)
  })

}

function writeDataOnHtml(payload){

  document.getElementById('data').innerHTML =
  '<table border=1 cellpadding="5" id="table-data">'+
  '<tr>'+
  '<th>Day</th>'+
  '<td>Tempo</td>'+
  '<td>Maxima</td>'+
  '<td>Minima</td>'+
  '<td>IUV</td>'+
  '</tr>'+
  '</tr>'+
  '</table>'

  for (const data of payload){
    console.log(data)
    document.getElementById('table-data').innerHTML +=
    '<tr>'+
    '<td>'+data.dia+'</td>'+
    '<td>'+data.tempo+'</td>'+
    '<td>'+data.maxima+' ºC</td>'+
    '<td>'+data.minima+' ºC</td>'+
    '<td>'+data.iuv+'</td>'+
    '</tr>'
  }
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
