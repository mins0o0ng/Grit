const axios = require('axios');

// const getFirstAndLastDateOfMonth = require('./date.js');
// const dates = getFirstAndLastDateOfMonth();

const API_URL = 'https://open.neis.go.kr/hub/schoolInfo';
const API_KEY = '44ac123965a443e899a65a39829e2f14';
const SCHOOL_NAME = '부산동고등학교';
const GRADE = '1';
const CLASS = '3';

let atptOfcdcScCode = ''; // 시도교육청코드
let sdSchulCode = ''; // 행정표준코드

let meal_API_URL = '';
let timetable_API_URL = '';

const timetableByDate = {};
const mealtableByDate = {}; // 식단 정보를 저장할 전역 변수 추가

function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const formattedDate = getFormattedDate();
// console.log("오늘 날짜: " + formattedDate); // 예: '2024-05-24'

async function getSchoolInfo() {
    try {
        const response = await axios.get(API_URL, {
            params: {
                KEY: API_KEY,
                Type: 'json',
                SCHUL_NM: SCHOOL_NAME
            }
        });

        if (response.data.schoolInfo) {
            const schoolData = response.data.schoolInfo[1].row[0];
            atptOfcdcScCode = schoolData.ATPT_OFCDC_SC_CODE;
            sdSchulCode = schoolData.SD_SCHUL_CODE;

            console.log('시도교육청코드 (ATPT_OFCDC_SC_CODE):', atptOfcdcScCode);
            console.log('행정표준코드 (SD_SCHUL_CODE):', sdSchulCode);

            meal_API_URL = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=${atptOfcdcScCode}&SD_SCHUL_CODE=${sdSchulCode}`;
            timetable_API_URL = `https://open.neis.go.kr/hub/hisTimetable?KEY=${API_KEY}&Type=json&ATPT_OFCDC_SC_CODE=${atptOfcdcScCode}&SD_SCHUL_CODE=${sdSchulCode}&GRADE=${GRADE}&CLASS_NM=${CLASS}`

        } else {
            console.log('학교 정보를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('API 호출 중 오류가 발생했습니다:', error);
    }
}

async function getMealInfo(url) {
    try {
        const response = await axios.get(url);
        if (response.data.mealServiceDietInfo) {
            const meals = response.data.mealServiceDietInfo[1].row;

            meals.forEach(meal => {
                if (!mealtableByDate[meal.MLSV_YMD]) {
                    mealtableByDate[meal.MLSV_YMD] = {
                        조식: [],
                        중식: [],
                        석식: []
                    };
                }
                mealtableByDate[meal.MLSV_YMD][meal.MMEAL_SC_NM].push(meal.DDISH_NM);
            });

            for (const [date, mealTypes] of Object.entries(mealtableByDate)) {
                console.log(`날짜: ${date}`);
                for (const [mealType, dishes] of Object.entries(mealTypes)) {
                    if (dishes.length > 0) {
                        console.log(`${mealType}:`);
                        dishes.forEach(dish => console.log(dish));
                    }
                }
                console.log(''); // 날짜별 구분을 위한 빈 줄 추가
            }
        } else {
            console.log('식단 정보를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('API 호출 중 오류가 발생했습니다:', error);
    }
}

async function getTimetableInfo(url) {
    try {
        const response = await axios.get(url);
        if (response.data.hisTimetable) {
            const timetables = response.data.hisTimetable[1].row;

            timetables.forEach(timetable => {
                if (!timetableByDate[timetable.ALL_TI_YMD]) {
                    timetableByDate[timetable.ALL_TI_YMD] = [];
                }
                timetableByDate[timetable.ALL_TI_YMD].push({
                    PERIO: timetable.PERIO,
                    ITRT_CNTNT: timetable.ITRT_CNTNT
                });
            });

            for (const [date, timetableDetails] of Object.entries(timetableByDate)) {
                console.log(`날짜: ${date}`);
                timetableDetails.forEach(detail => {
                    console.log(`교시: ${detail.PERIO}, 수업내용: ${detail.ITRT_CNTNT}`);
                });
                console.log(''); // 날짜별 구분을 위한 빈 줄 추가
            }
        } else {
            console.log('시간표 정보를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('API 호출 중 오류가 발생했습니다:', error);
    }
}

async function meal(start, end) {
    await getSchoolInfo();
    await getMealInfo(meal_API_URL + `&MLSV_FROM_YMD=${start}&MLSV_TO_YMD=${end}`);
    return mealtableByDate;
}

async function timetable(start, end) {
    await getSchoolInfo();
    await getTimetableInfo(timetable_API_URL + `&TI_FROM_YMD=${start}&TI_TO_YMD=${end}`);
    return timetableByDate;
}

// meal(20240520, 20240524);
// timetable(20240520, 20240524);

module.exports = {
    meal,
    timetable
}