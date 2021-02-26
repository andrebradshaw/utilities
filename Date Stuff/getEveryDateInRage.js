function getEveryDateInRage(o){
/* 
    note: not accounting for leap year
    end_day takes a number or nothing. 
    nothing will end the output on the last day of the current year. 
        1 == today, 2 == tomorrow, 3 == two days from now
        0 == yesterday
        -1 == two days ago, -2 == three days ago
*/
    const {start_year,end_year,end_day} = o;
    const rightnow = new Date();
    const current_year = rightnow.getFullYear();
    const current_month = rightnow.getMonth()+1;
    const current_date = rightnow.getDate();
    const month_days = [31,28,31,30,31,30,31,31,30,31,30,31];
    const daymonth = Array(12).fill().map((_,i)=> i+1).map((a,i,r)=> Array(month_days[i]).fill().map((_,ii)=> [(ii+1),a])).flat();
    const days_into_the_year = daymonth.findIndex(r=> r[0] == current_date && r[1] == current_month);
    const cut_output_at_this_index = (365 - days_into_the_year) - end_day;
    const every_day = Array(end_year-start_year).fill().map((_,i)=> i+start_year+1).map(yr=> daymonth.map(dm=> [...dm,...[yr]])).flat();
    if(typeof end_day == 'number'){
        return every_day.slice(0,(every_day.length-cut_output_at_this_index)).map(dmy=> `${dmy[2]}-${(dmy[1] < 10 ? '0'+dmy[1].toString() : dmy[1])}-${(dmy[0] < 10 ? '0'+dmy[0].toString() : dmy[0])}`);
    }else{
        return every_day.map(dmy=> `${dmy[2]}-${(dmy[1] < 10 ? '0'+dmy[1].toString() : dmy[1])}-${(dmy[0] < 10 ? '0'+dmy[0].toString() : dmy[0])}`);
    }
}
getEveryDateInRage({
  start_year:2009,
  end_year:2021,
  end_day:1
});
