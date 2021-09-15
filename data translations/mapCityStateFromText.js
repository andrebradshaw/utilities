function mapCityStateFromText(obj,key){
    var usa = [["Alabama","AL"],["Alaska","AK"],["Arizona","AZ"],["Arkansas","AR"],["California","CA"],["Colorado","CO"],["Connecticut","CT"],["Delaware","DE"],["District of Columbia","DC"],["Florida","FL"],["Georgia","GA"],["Hawaii","HI"],["Idaho","ID"],["Illinois","IL"],["Indiana","IN"],["Iowa","IA"],["Kansas","KS"],["Kentucky","KY"],["Louisiana","LA"],["Maine","ME"],["Maryland","MD"],["Massachusetts","MA"],["Michigan","MI"],["Minnesota","MN"],["Mississippi","MS"],["Missouri","MO"],["Montana","MT"],["Nebraska","NE"],["Nevada","NV"],["New Hampshire","NH"],["New Jersey","NJ"],["New Mexico","NM"],["New York","NY"],["North Carolina","NC"],["North Dakota","ND"],["Ohio","OH"],["Oklahoma","OK"],["Oregon","OR"],["Pennsylvania","PA"],["Rhode Island","RI"],["South Carolina","SC"],["South Dakota","SD"],["Tennessee","TN"],["Texas","TX"],["Utah","UT"],["Vermont","VT"],["Virginia","VA"],["Washington","WA"],["West Virginia","WV"],["Wisconsin","WI"],["Wyoming","WY"]];
    var canada = [["Alberta", "AB"],["British Columbia", "BC"],["Manitoba", "MB"],["New Brunswick", "NB"],["Newfoundland and Labrador", "NL"],["Northwest Territories", "NT"],["Nova Scotia", "NS"],["Nunavut", "NU"],["Ontario", "ON"],["Prince Edward Island", "PE"],["Quebec", "QC"],["Saskatchewan", "SK"],["Yukon", "YT"]];
    var city = /^(.+?),\s+[a-zA-Z]{2}\b/.exec(obj[key])?.[1];
    var state = /^.+?,\s+([a-zA-Z]{2})\b/.exec(obj[key])?.[1];
    var state_upper = state?.toUpperCase();
    var us_state = usa.filter(r=> r[1] == state_upper)?.[0]?.[1];
    var ca_state = canada.filter(r=> r[1] == state_upper)?.[0]?.[1];
    return {
        ...obj,
        ...(city ? {city: city} : {}),
        ...(us_state || ca_state || state ? {state: (us_state ? us_state : ca_state ? ca_state : state)} : {}),
        ...((us_state || ca_state) && !obj.country ? {country: ca_state ? 'CA' : 'US'} : {})
    }
}
mapCityStateFromText({location: "New York, NY"},'location');
//{location: 'New York, NY', city: 'New York', state: 'NY', country: 'US'}
