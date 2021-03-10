function getEveryDateInRage(o){
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
    return all_dates.slice(start_index,end_index+1)
}
getEveryDateInRage({
  start_date:'10 Feb 2020',
  end_date:'10 Mar 2020'
});
// output = (30) ["2020-02-10", "2020-02-11", "2020-02-12", "2020-02-13", "2020-02-14", "2020-02-15", "2020-02-16", "2020-02-17", "2020-02-18", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-22", "2020-02-23", "2020-02-24", "2020-02-25", "2020-02-26", "2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04", "2020-03-05", "2020-03-06", "2020-03-07", "2020-03-08", "2020-03-09", "2020-03-10"]
