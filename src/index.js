
function validateForm(evt) {
  evt.preventDefault();
  const city = document.getElementById("cidade").value.toLowerCase().replace(' ', '%20');
  const state = document.getElementById("estado").value.toUpperCase();
  console.log(city, state);

  const codigo_url = `http://servicos.cptec.inpe.br/XML/listaCidades?city=${city}`
  const response = getFromUrl(codigo_url).getElementsByTagName('cidades')
  let codigo = null
  for (const cidade of response){
    for (const node of cidade.childNodes){
      if (node.childNodes[1].innerHTML === state){
        codigo = node.childNodes[2].innerHTML
        document.getElementById('codigo').value = codigo
        break
      }
    }
  }

  const code = document.getElementById('codigo').value
  console.log(codigo)
  const previsao_url = `http://servicos.cptec.inpe.br/XML/cidade/${code}/previsao.xml`
  const response2 = getFromUrl(previsao_url).getElementsByTagName('previsao')
    let previsoes = []
    for (const dia of response2){
      let previsao = {}
      for (const node of dia.childNodes){
        previsao[node.tagName] = node.innerHTML
      }
      previsoes.push(previsao)
    }
    console.log(previsoes)
    writeDataOnHtml(previsoes)
}

function writeDataOnHtml(payload){

  document.getElementById('data').innerHTML =
  '<table border=1 cellpadding="5" id="table-data">'+
  '<tr>'+
  '<th>Dia</th>'+
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

  document.getElementById('data').innerHTML +=
  'Para legenda de siglas do tempo, clique <a href="http://servicos.cptec.inpe.br/XML/#condicoes-tempo">aqui</a>'
}

function getFromUrl(url) {
  const req = new XMLHttpRequest()
  req.open('GET', url, false)
  req.send()
  return req.responseXML
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
