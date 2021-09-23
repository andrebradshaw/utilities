function mapCityStateFromText(obj,key){
    var usa = [["Alabama","AL"],["Alaska","AK"],["Arizona","AZ"],["Arkansas","AR"],["California","CA"],["Colorado","CO"],["Connecticut","CT"],["Delaware","DE"],["District of Columbia","DC"],["Florida","FL"],["Georgia","GA"],["Hawaii","HI"],["Idaho","ID"],["Illinois","IL"],["Indiana","IN"],["Iowa","IA"],["Kansas","KS"],["Kentucky","KY"],["Louisiana","LA"],["Maine","ME"],["Maryland","MD"],["Massachusetts","MA"],["Michigan","MI"],["Minnesota","MN"],["Mississippi","MS"],["Missouri","MO"],["Montana","MT"],["Nebraska","NE"],["Nevada","NV"],["New Hampshire","NH"],["New Jersey","NJ"],["New Mexico","NM"],["New York","NY"],["North Carolina","NC"],["North Dakota","ND"],["Ohio","OH"],["Oklahoma","OK"],["Oregon","OR"],["Pennsylvania","PA"],["Rhode Island","RI"],["South Carolina","SC"],["South Dakota","SD"],["Tennessee","TN"],["Texas","TX"],["Utah","UT"],["Vermont","VT"],["Virginia","VA"],["Washington","WA"],["West Virginia","WV"],["Wisconsin","WI"],["Wyoming","WY"]];
    var canada = [["Alberta", "AB"],["British Columbia", "BC"],["Manitoba", "MB"],["New Brunswick", "NB"],["Newfoundland and Labrador", "NL"],["Northwest Territories", "NT"],["Nova Scotia", "NS"],["Nunavut", "NU"],["Ontario", "ON"],["Prince Edward Island", "PE"],["Quebec", "QC"],["Saskatchewan", "SK"],["Yukon", "YT"]];
    var us_city_state_x = new RegExp(`^(.+?),\\s+(${[...usa,...canada].map(u=> '\\b'+u[0]+'\\b|\\b'+u[1]+'\\b').reduce((a,b)=> a+'|'+b)})`,'i')
    var city = us_city_state_x.exec(obj[key])?.[1];
    var state = us_city_state_x.exec(obj[key])?.[2];
    var state_upper = state?.toUpperCase();
    var us_state = usa.filter(r=> r[1].toUpperCase() == state_upper || r[0].toUpperCase() == state_upper)?.[0]?.[1];
    var ca_state = canada.filter(r=> r[1].toUpperCase() == state_upper || r[0].toUpperCase() == state_upper)?.[0]?.[1];

    var is_canada_provence = state == 'CA' && canada.some(ca=> new RegExp('\\b'+ca[0]+'\\b','i'));
    return {
        ...obj,
        ...(!is_canada_provence && city ? {city: city} : {}),
        ...(us_state || ca_state || state ? {state: (!is_canada_provence && us_state ? us_state : is_canada_provence ? city : ca_state ? ca_state : state)} : {}),
        ...((us_state || ca_state) && !obj.country ? {country: is_canada_provence || ca_state ? 'CA' : 'US'} : {})
    }
}
mapCityStateFromText({location: "Prince Edward Island, CA"},'location');
// {location: 'Prince Edward Island, CA', state: 'Prince Edward Island', country: 'CA'}
