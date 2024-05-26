function parseDateString(dateString) {
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1; // 월은 0부터 시작
  const day = parseInt(dateString.substring(6, 8), 10);
  return new Date(year, month, day);
}

function getFirstAndLastDateOfMonth(baseDate) {
  const date = baseDate ? parseDateString(baseDate) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  // This month's first day
  const firstDate = new Date(year, month, 1);
  const firstDateString = `${year}${(month + 1).toString().padStart(2, '0')}01`; // YYYYMMDD 형식

  // This month's last day
  const lastDate = new Date(year, month + 1, 0);
  const lastDateString = `${year}${(month + 1).toString().padStart(2, '0')}${lastDate.getDate().toString().padStart(2, '0')}`; // YYYYMMDD 형식

  return {
      firstDate: firstDateString,
      lastDate: lastDateString
  };
}

function getFirstAndLastDateOfWeek(baseDate) {
  const date = baseDate ? parseDateString(baseDate) : new Date();
  const dayOfWeek = date.getDay();
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  const diffToFriday = 5 - dayOfWeek;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);

  const friday = new Date(date);
  friday.setDate(date.getDate() + diffToFriday);

  const mondayString = `${monday.getFullYear()}${(monday.getMonth() + 1).toString().padStart(2, '0')}${monday.getDate().toString().padStart(2, '0')}`; // YYYYMMDD 형식

  const fridayString = `${friday.getFullYear()}${(friday.getMonth() + 1).toString().padStart(2, '0')}${friday.getDate().toString().padStart(2, '0')}`; // YYYYMMDD 형식

  return {
      mondayDate: mondayString,
      fridayDate: fridayString
  };
}

// 내보내기
module.exports = {
  getFirstAndLastDateOfMonth,
  getFirstAndLastDateOfWeek
};
