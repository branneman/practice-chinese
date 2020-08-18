window.addEventListener('DOMContentLoaded', domContentLoaded)

var doc = document
var elem = {}

function domContentLoaded() {
  if (!__radicals) throw new Error('__radicals not defined')

  cacheElements()
  populateRadicalTable(elem.radicalTable, groupRadicals(__radicals))
  generateRadicalRandom()
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

  elem.radicalTable = qs('.section--radical-table .radical-table')

  elem.radicalRandom = qs('.section--radical-random .radical-random')
  elem.radicalRandomBlock = qs('.radical-block', elem.radicalRandom)
  elem.radicalRandomRefresh = qs('.refresh', elem.radicalRandom)
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
  elem.radicalRandomRefresh.addEventListener('click', () => {
    generateRadicalRandom()
  })
}

function populateRadicalTable(table, radicals2d) {
  var tbody = doc.createElement('div')

  Object.entries(radicals2d).forEach(([strokeCount, radicals1d]) => {
    var tr = addClass(doc.createElement('div'), 'tr')
    tr.appendChild(addClass(createTextElement('div', strokeCount), 'th'))

    radicals1d.forEach((radical) => {
      tr.appendChild(generateRadicalBlock(radical, 'td radical-block'))
    })

    tbody.appendChild(tr)
  })

  table.appendChild(tbody)
}

function generateRadicalBlock(radical, cl) {
  var a = addClass(doc.createElement('a'), cl)

  a.setAttribute('href', '#')
  a.appendChild(addClass(createTextElement('div', radical.pinyin1), 'pinyin'))
  a.appendChild(addClass(createTextElement('div', radical.radical), 'radical'))
  a.appendChild(addClass(createTextElement('div', radical.english), 'english'))

  a.addEventListener('click', (evt) => {
    evt.preventDefault()
    var audio = new Audio('./static/audio/' + radical.pinyin2 + '.mp3')
    audio.addEventListener('canplaythrough', () => audio.play())
  })

  return a
}

function generateRadicalRandom() {
  var i = randomInt(0, __radicals.length - 1)
  var r = __radicals[i]

  var e = generateRadicalBlock(r, 'radical-block')
  elem.radicalRandom.replaceChild(e, elem.radicalRandomBlock)
  elem.radicalRandomBlock = e
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
  cl.split(' ').forEach((c) => e.classList.add(c))
  return e
}

function randomInt(min, max) {
  return min + Math.round(Math.random() * (max - min))
}
