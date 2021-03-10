/*
  javascript timestamp to excel timestamp format

  converts milliseconds since 1 Jan 1970 into days since 1 Jan 1900
*/
function millsecDateToExcelDate(ms){
    const everyNth = (i,n) => /\./.test((i/n).toString()) === false && i != 0;
    const month_days = [31,29,31,30,31,30,31,31,30,31,30,31];
    const target_date = new Date(ms);
    const target_year = target_date.getFullYear();
    const target_month = target_date.getMonth();
    const target_day = target_date.getDate();
    const no_time_date = new Date(`${target_year}-${target_month+1}-${target_day}`);
    const partial_year_days = month_days.map((m,i,r)=> i == 1 && !everyNth(target_year,4) ? 28 : m).slice(0,(target_month));
    const allyears = Array(target_year-1900).fill().map((_,i)=> i=i+1900).map(yr=> month_days.map((m,i,r)=> i == 1 && !everyNth(yr,4) ? 28 : m));
    const days_since_1900 = [...allyears.flat(),...partial_year_days].reduce((a,b)=> a+b) + target_day;
    const fractional_day = (ms - no_time_date.getTime())/86400000;
    return days_since_1900+fractional_day;
}
millsecDateToExcelDate(1615387380359)
//output == 44265.4048652662
