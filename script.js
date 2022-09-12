const reverseString = (str) => str.split('').reverse().join('');

const isPalindrome = (a) => reverseString(a) === a;

const convertDateToString = (date) => {
  let output = {};
  if (date.day <= 9) {
    output.day = `0${date.day.toString()}`;
  } else {
    output.day = date.day.toString();
  }

  if (date.month <= 9) {
    output.month = `0${date.month.toString()}`;
  } else {
    output.month = date.month.toString();
  }

  output.year = date.year.toString();
  return output;
};

// takes date in str obj
const getAllDateFormats = (date) => {
  let output = [];
  // DD-MM-YYYY
  output.push(`${date.day}${date.month}${date.year}`);

  // MM-DD-YYYY
  output.push(`${date.month}${date.day}${date.year}`);

  // YYYY-MM-DD
  output.push(`${date.year}${date.month}${date.day}`);

  // DD-MM-YY
  output.push(`${date.day}${date.month}${date.year.slice(-2)}`);

  // MM-DD-YY
  output.push(`${date.month}${date.day}${date.year.slice(-2)}`);

  // YY-MM-DD
  output.push(`${date.year.slice(-2)}${date.month}${date.day}`);

  return output;
};

const checkPalindromeForAllDateFormats = (date) => {
  let allDateFormats = getAllDateFormats(date);
  let palindromeStrs = [];

  allDateFormats.forEach((str) => {
    let result = isPalindrome(str);
    palindromeStrs.push(result);
  });

  return palindromeStrs;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
};

const getNextDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getNextPalindromeDate = (date) => {
  let nextDate = getNextDate(date);
  let nextDay = 0;

  while (1) {
    nextDay++;
    let dateStr = convertDateToString(nextDate);
    let resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [nextDay, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
};

const getPreviousDate = (date) => {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getPreviousPalindromeDate = (date) => {
  let previousDate = getPreviousDate(date);
  let ctr = 0;

  while (1) {
    ctr++;
    let dateStr = convertDateToString(previousDate);
    let resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
};

function App() {
  const checkBtn = document.querySelector('.check-btn');
  const calculateResult = () => {
    const inputValue = document.querySelector('.date-input');
    const resultDiv = document.querySelector('.result');

    let dateStr = inputValue.value;
    dateStr = dateStr.split('-');
    let date = {
      year: parseInt(dateStr[0]),
      month: parseInt(dateStr[1]),
      day: parseInt(dateStr[2]),
    };

    let dateAsStr = convertDateToString(date);
    let palindromeList = checkPalindromeForAllDateFormats(dateAsStr);
    let isPalindrome = false;

    for (let i = 0; i < palindromeList.length; i++) {
      if (palindromeList[i]) {
        isPalindrome = true;
        break;
      }
    }

    if (!isPalindrome) {
      const [date1, nextDate] = getNextPalindromeDate(date);
      const [date2, prevDate] = getPreviousPalindromeDate(date);

      if (date1 > date2) {
        resultDiv.innerText = `The nearest palindrome date is a ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
      } else {
        resultDiv.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${date1} days.`;
      }
    } else {
      resultDiv.innerText = 'Yay! Your birthday is palindrome!';
    }
  };

  checkBtn.addEventListener('click', calculateResult);
}

App();
