function getCalendarInfoFromDateRange(o){
    function unqKey(array,key){  var q = [];  var map = new Map();  for (const item of array) {    if(!map.has(item[key])){        map.set(item[key], true);        q.push(item);    }  }  return q;}
/*
    note: is accounting for leap years, but not accounting for the 100 year, but not 400 year condition.
*/
    function getDateObjects(d,pre){
        let obj = {};
        let date = new Date(d);
        obj[`${pre}_date`] = date
        obj[`${pre}_year`] = date.getFullYear();
        obj[`${pre}_month`] = date.getMonth()+1;
        obj[`${pre}_day`] = date.getDate();
        return obj;
    }
    function ymdFormat(d){
        let date = new Date(d);
        let yr = date.getFullYear();
        let mo = date.getMonth()+1;
        let day = date.getDate();
        return `${yr}-${(mo < 10 ? '0'+mo.toString() : mo)}-${(day < 10 ? '0'+day.toString() : day)}`;
    }
    const everyNth = (i,n) => /\./.test((i/n).toString()) === false && i != 0;

    const {target_end_date,target_end_year,target_end_month,target_end_day} = getDateObjects(o.end_date,'target_end');
    const {target_start_date,target_start_year,target_start_month,target_start_day} = getDateObjects(o.start_date,'target_start');

    const month_days = [31,29,31,30,31,30,31,31,30,31,30,31];
    const daymonth = Array(12).fill().map((_,i)=> i+1).map((a,i,r)=> Array(month_days[i]).fill().map((_,ii)=> [(ii+1),a])).flat();
    const every_day = Array(target_end_year-target_start_year+1).fill().map((_,i)=> i+target_start_year).map(yr=> daymonth.map(dm=> [...dm,...[yr]])).flat();

    const all_dates = every_day.map(dmy=> `${dmy[2]}-${(dmy[1] < 10 ? '0'+dmy[1].toString() : dmy[1])}-${(dmy[0] < 10 ? '0'+dmy[0].toString() : dmy[0])}`).map(dstring=> /\d+-02-29/.test(dstring) && !everyNth(parseInt(/^\d+/.exec(dstring)[0]),4) ? null : dstring).filter(i=> i);
    const target_start_datestring = ymdFormat(o.start_date);
    const target_end_datestring = ymdFormat(o.end_date);
    const start_index = all_dates.indexOf(target_start_datestring);
    const end_index = all_dates.indexOf(target_end_datestring);
    const output_dates = all_dates.slice(start_index,end_index+1);
    return unqKey(output_dates.reverse().map(r=> {
        let this_date = new Date(new Date(r).getTime() + ((new Date().getTimezoneOffset() / 60) * 3600000));
        let month = this_date.getMonth();
        let year = this_date.getFullYear();
        let date = this_date.getDate();
        return {
            year: year,
            month: month+1,
            year_month: `${year}-${month+1}`,
            date: date,
            timestamp: this_date.getTime(),
            date_string: `${year}-${month+1}-${date}`,
        }
    }),'year_month').map(r=> {
        let first_of_the_month_timestamp = new Date(`${r.year_month}-1 00:00:00`).getTime();
        let end_of_the_month =  new Date(`${r.date_string} 23:59:59`).getTime();
        return {...r,...{
            first_of_the_month_timestamp:first_of_the_month_timestamp,
            end_of_the_month:end_of_the_month,
        }}
    });
}
getCalendarInfoFromDateRange({
  start_date:'1 Jan 2016',
  end_date:new Date(),
});
