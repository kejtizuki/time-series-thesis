import moment from 'moment';

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
  let newData = data.map(item => ({ date: parseDate(item[data.columns[0]]), time: parseTime(item[data.columns[0]], item[data.columns[1]]) }));
  newData.unshift({ date: parseDate(data.columns[0]), time: parseTime(data.columns[0], data.columns[1]) });
  console.log(groupBy(newData))
  return groupBy(newData);
};

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
  // console.log("new ", dataArr)
  return dataArr
};
