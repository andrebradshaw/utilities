var parseYearMonths = (n) => {
      var m = n / 2629800000;
      var years = Math.trunc(m / 12);
      var months = Math.round(12 * ((m / 12) - years));
      var str = months && years ? `${years} yr${years>1?'s':''} ${months} mo${months>1?'s':''}` : years && months == 0 ? `${years} year${years>1?'s':''}` : `${months} month${months>1?'s':''}`;
      return str;
    };

parseYearMonths(114329500000)
//"3 yrs 7 mos"
