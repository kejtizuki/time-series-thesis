import moment from 'moment';
import dayjs from 'dayjs'
import toObject from 'dayjs/plugin/toObject'
import weekday from 'dayjs/plugin/weekday'
import * as d3 from "d3";
import weekOfYear from 'dayjs/plugin/weekOfYear'

export const extractDate = timeStamp => moment(`${timeStamp.split('T')[0]}`, 'YYYYMMDDxxx').format('YYYY-MM-DD').split('T')[0];

export const howManyInDay = arr => arr.reduce(function(obj, item) {
  obj[item] = (obj[item] || 0) + 1;
  return obj;
}, {});

export const howManyInMonth = arr => arr.reduce(function(obj, item) {
  obj[item.split('-')[1]] = (obj[item.split('-')[1]] || 0) + 1;
  return obj;
}, {});

export const getDayOfWeek = date => {
  var dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

const parseDate = timeStamp => moment(`${timeStamp.split('T')[0]}`, 'YYYYMMDDxxx')
  .format('YYYY-MM-DD').split('T')[0];

const parseTime = (timeStamp, offset) => {
  const timeString = timeStamp.split('T')[1].slice(0, -1);
  const value = offset || (timeStamp.split(';')[1]).split(';')[0];
  return moment.utc(`${timeString}`, 'HH:mm:ss').utcOffset(value).format('HH:mm:ss');
};

export const getDayInsights = data => {
  dayjs.extend(weekday)
  let newData = data.map(item => ({ date: parseDate(item[data.columns[0]]), time: parseTime(item[data.columns[0]], item[data.columns[1]]) }));
  newData.unshift({
    date: parseDate(data.columns[0]),
    time: parseTime(data.columns[0], data.columns[1])
  });
  return groupBy(newData);
};

export const getDayHoursArr = (data, timeStamp) => {
  let thisDayHours = data[timeStamp]
  return groupByHoursArr(thisDayHours)
}

export const getDayHours = (data, timeStamp) => {
  let thisDayHours = data[timeStamp]
  return groupByHours(thisDayHours)
}

export const getAvg = obj => {
  let sum, mean
  let tmpSumArr = []
  obj.map(hour => {
    tmpSumArr.push(hour.value)
  })
  return d3.mean(tmpSumArr)
}

const groupByHours = arr => {
  let groupedByObj = {}
  for (let i=1; i< 25; i++) {
    groupedByObj[i] = 0;
  }
  arr.filter(a => {
  const hour = parseInt(a.split(':')[0])
  if (Object.keys(groupedByObj).includes(hour.toString())) {
      groupedByObj[hour]++;
  } else {
      groupedByObj[hour] = 1;
  }
});
return groupedByObj;
}

export const groupByHoursArr = arr => {
  let groupedByObj = {}
  let arrayOfHours = []
  for (let i=0; i< 24; i++) {
    arrayOfHours.push({key: i, value: 0});
  }
  arr.filter(a => {
    const hour = parseInt(a.split(':')[0])
    if (arrayOfHours.some(e => e.key === hour)) {
      arrayOfHours[hour].value++
    }
});
return arrayOfHours;
}

const groupBy = arr => arr.reduce(function (r, a) {
  r[a.date] = r[a.date] || [];
  r[a.date].push(a.time);
  return r;
}, {});

export const howManyWeekDayMonth = (arr, countedDays) => arr.reduce(function(obj, item) {
  let date = new Date(item)
  let weekdaysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let weekdays = {}

  weekdaysArr.map((day) => (
    weekdays[day] = countedDays[item]
  ))

  obj[item.split('-')[1]] = Object.assign(
    {},
    weekdays
  );

  return obj

}, {});

export const parseData = (data) => {
  const cleaned = data.map(item => (item[data.columns[0]]).replace(/[-:.]/g, ''));
  let newData = cleaned.map(item => ({ timestamp: extractDate(item) }));
  //add at the beginning of array
  newData.unshift({ timestamp: extractDate(data.columns[0]) });
  const dataArr = newData.map(item => item.timestamp);
  return dataArr
};

export const getWeekday = (timeStamp) => {
  dayjs.extend(weekday)
  let weekdaysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return dayjs(timeStamp).weekday()
  // return weekdaysArr[dayjs(timeStamp).weekday()]
}

export const getFilteredbyWeekday = (dayInsights, weekday) => {
  let filtered = Object.keys(dayInsights)
  .filter(key => dayjs(key).weekday() === weekday)
  .reduce((obj, key) => {
      obj[key] = dayInsights[key];
      return obj;
    }, {});
  return filtered
}

export const getWeekdayInsights = (dayInsights, weekday) => {

  dayjs.extend(toObject)
  //dayjs('2019-12-09').toObject() months are returned from 0 to 11
  // console.log('Oobject', dayjs(Object.keys(dayInsights)[0]).toObject())
  let filtered = Object.keys(dayInsights)
  .filter(key => dayjs(key).weekday() === weekday)
  .reduce((obj, key) => {
      obj[key] = dayInsights[key];
      return obj;
    }, {});

  let mergedWeekdaysData = Object.keys(filtered).reduce(function(res, v) {
    return res.concat(filtered[v]);
  }, []);
  return mergedWeekdaysData
}

export const getMonthArr = (monthData) => {

  dayjs.extend(toObject)
  //dayjs('2019-12-09').toObject() months are returned from 0 to 11
  // console.log('Oobject', dayjs(Object.keys(dayInsights)[0]).toObject())
  // let filtered = Object.keys(monthData)
  // .reduce((obj, key) => {
  //     obj[key] = monthData[key];
  //     return obj;
  //   }, {});

  let mergedWeekdaysData = Object.keys(monthData).reduce(function(res, v) {
    return res.concat(monthData[v]);
  }, []);
  return mergedWeekdaysData
}

export const getWeekdayInsightsFilteredByMonth = (dayInsights, weekday, month) => {

  dayjs.extend(toObject)
  //dayjs('2019-12-09').toObject() months are returned from 0 to 11
  // console.log('Oobject', dayjs(Object.keys(dayInsights)[0]).toObject())
  let filteredByDay = Object.keys(dayInsights)
  .filter(key => dayjs(key).weekday() === weekday)
  .reduce((obj, key) => {
      obj[key] = dayInsights[key];
      return obj;
    }, {});

  let filteredByMonth = Object.keys(filteredByDay)
  .filter(key => dayjs(key).toObject().months === month)
  .reduce((obj, key) => {
      obj[key] = dayInsights[key];
      return obj;
    }, {});

  let mergedWeekdaysData = Object.keys(filteredByMonth).reduce(function(res, v) {
    return res.concat(filteredByMonth[v]);
  }, []);
  return mergedWeekdaysData
}

//returns object where key is a day and value is an array of timestamps
export const getMonthInsights = (dayInsights, month) => {

    dayjs.extend(toObject)
    //dayjs('2019-12-09').toObject() months are returned from 0 to 11
    // console.log('Oobject', dayjs(Object.keys(dayInsights)[0]).toObject())

    let filteredByMonth = Object.keys(dayInsights)
    .filter(key => dayjs(key).toObject().months === month)
    .reduce((obj, key) => {
        obj[key] = dayInsights[key];
        return obj;
      }, {});

      if (dayjs(Object.keys(filteredByMonth)[0]).toObject().months === 1) {
       let firstDate = '2017-02-01'
       let lastDate = Object.keys(filteredByMonth)[0]

       console.log(lastDate)

       const dates = [ ...Array(
              Date.parse(lastDate)/86400000 - Date.parse(firstDate)/86400000 + 1).keys()
          ].map(k => new Date(
                  86400000*k+Date.parse(firstDate)
              ).toISOString().slice(0, 10).replace(/-0(\d)$/, '-$1'));

        console.log(dates)

        let addedDates = {}

        for (let i = 0; i < dates.length; i++) {
          addedDates[dates[i]] = []
        }
        var filteredAndFilled = Object.assign({}, addedDates, filteredByMonth);
        return filteredAndFilled
      }
      else {
        return filteredByMonth
      }

    // let merged = Object.keys(filteredByMonth).reduce(function(res, v) {
    //   return res.concat(filteredByMonth[v]);
    // }, []);
    // return filteredByMonth
}

//Returns which month is a date
export const getMonth = (currentDay) => {
  dayjs.extend(toObject)
  return dayjs(currentDay).toObject().months
}

export const getMonthName = (currentDay) => {
  dayjs.extend(toObject)
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[dayjs(currentDay).toObject().months]
}

export const getMonthNameFromMonthNr = (month) => {
  // dayjs.extend(toObject)
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[month]
}

export const getMonthNrFromName = (month) => {
  // dayjs.extend(toObject)
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months.indexOf(month)
}

export const getMonths = (obj) => {
  let monthsArray = [];
  dayjs.extend(toObject)
  Object.keys(obj)
    .map(item => {
      if (monthsArray.indexOf(item) === -1) {
        monthsArray.push(dayjs(item).toObject().months)
      }
    })
  monthsArray = [...new Set(monthsArray)]
  return monthsArray
}

export const getWeekInsights = (currentDay, allDays, dayInsights) => {
  dayjs.extend(weekOfYear)
  let week = moment(currentDay).isoWeekday(1).format('w')

  let filteredByWeek = Object.keys(dayInsights)
  .filter(key => moment(key).isoWeekday(1).format('w') === week)
  .reduce((obj, key) => {
      obj[key] = dayInsights[key];
      return obj;
    }, {});

  return filteredByWeek

};

export const getWeeklyViolinData = (weekData) => {

}

export const getWeekdayNr = (currentDay) => {
  dayjs.extend(toObject)
  return dayjs(currentDay).toObject()
}

export const getTotalInDay = (obj) => {
  let counter = 0;
  Object.values(obj).map(elem => {
    counter = counter + elem.value
  })
  return counter;
}

//all days in a month
export const filteredByMonth = (allDaysArr, month) => {
  let filtered = allDaysArr
  .filter(key => dayjs(key).toObject().months === month)

  console.log('filtered ', filtered)
  return filtered
}

// returns object of key (hour) and value (average occurence in this hour)
export const avgWeekdayHours = (data, totalWeekdays) => {
  let avgData = data.map(item => ({
    key: item.key,
    value: (item.value)/totalWeekdays
  }))
  return avgData
}
