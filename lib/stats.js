const convertDataPerDays = data => {
  const result = {}
  const days = Object.keys(data[0].timeline.deaths).length
  const deathsPerDay = [...new Array(days).keys()].map(i => 0)
  const deathsPerDaySince01Jan = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 6, 9]
  const casesPerDay = [...new Array(days).keys()].map(i => 0)
  const casesPerDaySince01Jan = [27, 29, 30, 30, 31, 32, 32, 35, 37, 39, 40, 40, 41, 42, 43, 44, 45, 62, 121, 198, 291, 440, 579, 844, 1312, 2015, 2801, 4579, 6061, 7816, 9821, 11948, 14552, 17389, 20628, 24553, 28276, 31439, 34876, 37552, 40553, 43099, 45134, 59287, 64438, 67100, 69197, 71329, 73332, 75184, 75700, 76677, 77673, 78651, 79205, 80087, 80828, 81820, 83112, 84615, 86604, 88585, 90443, 93016, 95314, 98425, 102050, 106099, 109991, 114381, 118948, 126214, 134576, 145483, 156653, 169593, 182490, 198234]
  const lastDate = Object.keys(data[0].timeline.deaths)[days - 1]


  data.forEach(item => {
    const id = item.country.replace(/\s/g, '_')
    if (!result.hasOwnProperty(id)) {
      result[id] = {
        death: [],
        deaths: 0,
        cases: 0,
        case: [],
      }
    }
    result[id].deaths += item.timeline.deaths[lastDate] || 0
    result[id].cases += item.timeline.cases[lastDate] || 0

    Object.entries(item.timeline.deaths).forEach(([key, value], d) => {
      deathsPerDay[d] += value
    })

    Object.entries(item.timeline.cases).forEach(([key, value], d) => {
      casesPerDay[d] += value
    })
  })

  // const totalDeathsGlobal = Object.entries(result).reduce((acc, cur) => {
  //   return acc + cur[1].deaths
  // }, 0)

  // const totalCasesGlobal = Object.entries(result).reduce((acc, cur) => {
  //   return acc + cur[1].cases
  // }, 0)

  deathsPerDay.forEach((t) => deathsPerDaySince01Jan.push(t))
  casesPerDay.forEach((t) => casesPerDaySince01Jan.push(t))

  return {
    deathsPerDay,
    casesPerDay,
    deathsPerDaySince01Jan,
    casesPerDaySince01Jan,
  }
}

export const mergeHistory = (history, data) => {
  const converted = convertDataPerDays(data)

  history.covid19.deaths = converted.deathsPerDaySince01Jan.map((value, day) => {
    return {
      "x": day,
      "y": value,
    }
  })

  const days = 350
  const newData = []
  newData.push({
    id: history.covid19.id,
    data: history.covid19.deaths.slice(0, days),
  })
  newData.push({
    id: history.ebola.id,
    data: history.ebola.deaths.slice(0, days),
  })
  newData.push({
    id: history.h1n1.id,
    data: history.h1n1.deaths.slice(0, days),
  })
  newData.push({
    id: history.sars.id,
    data: history.sars.deaths.slice(0, days),
  })


  return newData
}