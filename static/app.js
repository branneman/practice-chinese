window.addEventListener('DOMContentLoaded', domContentLoaded)

var doc = document
var elem = {}

function domContentLoaded() {
  if (!__radicals) throw new Error('__radicals not defined')

  cacheElements()
  populateTable(elem.table, groupRadicals(__radicals))
  addEventListeners()

  switchPage(location.hash.substr(1))
}

var qs = (x, e = doc) => e.querySelector(x)
var qsa = (x, e = doc) => [].slice.call(e.querySelectorAll(x))

function cacheElements() {
  elem.sections = qsa('.section')

  elem.sectionNav = qs('.section--nav')
  elem.sectionRadicalTable = qs('.section--radical-table')
  elem.sectionRadicalRandom = qs('.section--radical-random')
  elem.sectionPinyinTable = qs('.section--pinyin-table')
  elem.sectionPinyinRandom = qs('.section--pinyin-random')

  elem.table = qs('.section--radical-table .radical-table')
}

function switchPage(page) {
  elem.sections.forEach((section) => section.classList.add('hidden'))

  switch (page) {
    case '':
      elem.sectionNav.classList.remove('hidden')
      break
    case 'radical-table':
      elem.sectionRadicalTable.classList.remove('hidden')
      break
    case 'radical-random':
      elem.sectionRadicalRandom.classList.remove('hidden')
      break
    case 'pinyin-table':
      elem.sectionPinyinTable.classList.remove('hidden')
      break
    case 'pinyin-random':
      elem.sectionPinyinRandom.classList.remove('hidden')
      break
  }
}

function addEventListeners() {
  window.addEventListener('hashchange', () =>
    switchPage(location.hash.substr(1))
  )
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
