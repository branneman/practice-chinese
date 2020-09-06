const mods = {
  neg: '负', // fù
  1e1: '十', // shí
  1e2: '百', // bǎi
  1e3: '千', // qiān
  1e4: '万', // wàn
  1e8: '亿', // yì
  1e12: '兆', // zhào
  1e16: '京', // jīng
  1e20: '垓', // gāi
  1e24: '秭', // zǐ
  1e28: '穰', // ráng
  1e32: '沟', // gōu
  1e36: '涧', // jiàn
  1e40: '正', // zhēng
  1e44: '载', // zài
}
const base = [
  '零', // líng
  '一', // yī
  '二', // èr
  '三', // sān
  '四', // sì
  '五', // wǔ
  '六', // liù
  '七', // qī
  '八', // bā
  '九', // jiǔ
  '十', // shí
]

export default function arabic2chinese(a) {
  let s = ''

  if (a < 0) {
    s += mods.neg
    a = Math.abs(a)
  }

  // 1e4-1e8 category patterns
  if (a >= 1e4 && a <= 1e8 - 1) {
    const _ = (a - (a % 1e4)) / 1e4
    s += category(_)
    s += mods[1e4]

    // dispatch to < 1e4 patterns
    a = a % 1e4
    if (a < 1e3) {
      s += base[0]
    }
  }

  // < 1e4 category patterns
  s += category(a)

  // More than one zero in a row becomes a single zero
  s = s.replace(new RegExp(base[0] + '{2,3}', 'g'), base[0])

  // Trailing zero's
  if (s.length > 1) {
    s = s.replace(new RegExp(base[0] + '+$'), '')
  }

  return s
}

function category(a) {
  const div1000 = (x) => x % 1000 === 0
  const div100x = (x) => x % 1000 < 10
  const div10x0 = (x) => div1000(x - (x % 100)) && div10(x % 10)
  const div10xx = (x) => div1000(x - (x % 100)) && !div10(x % 10)
  const div100 = (x) => x % 100 === 0
  const div10x = (x) => div100(x - (x % 10))
  const div10 = (x) => x % 10 === 0

  const pattern_thousands = (x) => base[x / 1000] + mods[1e3]
  const pattern_101_999 = (x) => base[Math.floor(x / 100)] + mods[1e2]
  const pattern_hundreds = (x) => base[x / 100] + mods[1e2]
  const pattern_21_99 = (x) =>
    base[Math.floor(x / 10)] + mods[1e1] + base[x - Math.floor(x / 10) * 10]
  const pattern_tens = (x) => base[x / 10] + mods[1e1]
  const pattern_10_19 = (x) => mods[1e1] + base[x - 10]
  const pattern_0_10 = (x) => base[x]

  let s = ''

  // thousands pattern: 1000 = 1+1000
  if (a >= 1000 && a <= 9999 && div1000(a)) {
    s += pattern_thousands(a)
  }

  // 1001-9999 pattern: 1234 = 1+1000+2+100+3+10+4
  if (a >= 1000 && a <= 9999 && !div1000(a)) {
    s += pattern_thousands(a - (a % 1000))

    // [1001] with zero's in the hundreds and tens place: 1001 = 1+1000+0+1
    if (div100x(a)) {
      s += base[0]
      s += pattern_0_10(a % 100)
    }

    // [1010] with zero's in the hundreds and ones place: 1010 = 1+1000+0+1+10
    else if (div10x0(a)) {
      s += base[0]
      s += pattern_tens(a % 100) // a = [1234 -> 34]
    }

    // [1011] with a zero in the hundreds place: 1011 = 1+1000+0+1+10+1
    else if (div10xx(a)) {
      s += base[0]
      s += pattern_21_99(a % 100) // a = [1234 -> 34]
    }

    // dispatch to < 1000 patterns
    else {
      a -= Math.floor(a / 1000) * 1000
    }
  }

  // hundreds pattern: 100 = 1+100
  if (a >= 100 && a <= 999 && div100(a)) {
    s += pattern_hundreds(a)
  }

  // 101-999 pattern
  if (a >= 101 && a <= 999 && !div100(a)) {
    s += pattern_101_999(a)

    // with a zero in the ones place: 760 = 7+100+6+10
    if (!div100(a) && div10(a) && !div10x(a)) {
      s += pattern_tens(a - Math.floor(a / 100) * 100)
    }

    // with a zero in the tens place: 506 = 5+100+0+6
    if (!div100(a) && !div10(a) && div10x(a)) {
      s += base[0]
      s += pattern_0_10(a - Math.floor(a / 100) * 100)
    }

    // generic: 135 = 1+100+3+10+5
    if (!div100(a) && !div10(a) && !div10x(a)) {
      s += pattern_21_99(a - Math.floor(a / 100) * 100)
    }
  }

  // tens pattern: 30 = 3+10
  if (a >= 20 && a <= 90 && div10(a)) {
    s += pattern_tens(a)
  }

  // 21-99 pattern: 21 = 2+10+1
  if (a >= 21 && a <= 99 && !div10(a)) {
    s += pattern_21_99(a)
  }

  // 11-19 pattern: 11 = 10+1
  if (a >= 11 && a <= 19) {
    s += pattern_10_19(a)
  }

  // 0-10 pattern
  if (a >= 0 && a <= 10) {
    s += pattern_0_10(a)
  }

  return s
}
