window.addEventListener('DOMContentLoaded', domContentLoaded)

var doc = document
var elem = {}

function domContentLoaded() {
  if (!__radicals) throw new Error('__radicals not defined')

  cacheElements()
  populateTable(elem.table, groupRadicals(__radicals))
}

function cacheElements() {
  elem.layoutTable = doc.querySelector('.layout__table')
  elem.table = doc.querySelector('.radicals-table')
}

function populateTable(table, radicals) {
  var tbody = doc.createElement('div')

  Object.entries(radicals).forEach(([strokeCount, r]) => {
    var tr = addClass(doc.createElement('div'), 'tr')

    tr.appendChild(addClass(createTextElement('div', strokeCount), 'th'))

    r.forEach((r) => {
      var td = addClass(doc.createElement('div'), 'td')
      td.appendChild(addClass(createTextElement('div', r.pinyin1), 'pinyin'))
      td.appendChild(addClass(createTextElement('div', r.radical), 'radical'))
      td.appendChild(addClass(createTextElement('div', r.english), 'english'))
      tr.appendChild(td)

      td.addEventListener('click', () => {
        var audio = new Audio('./static/audio/' + r.pinyin2 + '.mp3')
        audio.addEventListener('canplaythrough', () => audio.play())
      })
    })

    tbody.appendChild(tr)
  })

  table.appendChild(tbody)
}

function groupRadicals(radicals) {
  var map = {}
  radicals.forEach((r) => {
    if (!map[r.strokeCount]) map[r.strokeCount] = []
    map[r.strokeCount].push(r)
  })
  return map
}

function createTextElement(tag, text) {
  var e = doc.createElement(tag)
  e.appendChild(doc.createTextNode(text))
  return e
}

function addClass(e, cl) {
  e.classList.add(cl)
  return e
}
