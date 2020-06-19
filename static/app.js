window.addEventListener('DOMContentLoaded', domContentLoaded)

var doc = document
var elem = {}
var state = { page: 'table' }

function domContentLoaded() {
  if (!__radicals) throw new Error('__radicals not defined')

  cacheElements()
  populateTable(elem.table, groupRadicals(__radicals))
  addEventListeners()

  if (location.hash === '#random') {
    switchPage('random')
  } else {
    switchPage('table')
  }
}

function cacheElements() {
  elem.navTable = doc.querySelector('.nav__table')
  elem.navRandom = doc.querySelector('.nav__random')

  elem.layoutTable = doc.querySelector('.layout__table')
  elem.layoutRandom = doc.querySelector('.layout__random')

  elem.table = doc.querySelector('.radicals-table')
}

function switchPage(page) {
  if (page === 'table') {
    elem.navTable.classList.add('active')
    elem.navRandom.classList.remove('active')
    elem.layoutTable.classList.remove('hidden')
    elem.layoutRandom.classList.add('hidden')
  } else if (page === 'random') {
    elem.navTable.classList.remove('active')
    elem.navRandom.classList.add('active')
    elem.layoutTable.classList.add('hidden')
    elem.layoutRandom.classList.remove('hidden')
  }
}

function addEventListeners() {
  elem.navTable.addEventListener('click', () => {
    location.hash = '#table'
    switchPage('table')
  })
  elem.navRandom.addEventListener('click', () => {
    location.hash = '#random'
    switchPage('random')
  })
}

function populateTable(table, radicals) {
  var tbody = doc.createElement('div')

  Object.entries(radicals).forEach(([strokeCount, r]) => {
    var tr = addClass(doc.createElement('div'), 'tr')

    tr.appendChild(addClass(createTextElement('div', strokeCount), 'th'))

    r.forEach((r) => {
      var td = addClass(doc.createElement('a'), 'td')
      td.setAttribute('href', '#')
      td.appendChild(addClass(createTextElement('div', r.pinyin1), 'pinyin'))
      td.appendChild(addClass(createTextElement('div', r.radical), 'radical'))
      td.appendChild(addClass(createTextElement('div', r.english), 'english'))
      tr.appendChild(td)

      td.addEventListener('click', (e) => {
        e.preventDefault()
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
