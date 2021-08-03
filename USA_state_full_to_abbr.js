function usStateSwitch(str){
  var arr = [["Alabama","AL"],["Alaska","AK"],["Arizona","AZ"],["Arkansas","AR"],["California","CA"],["Colorado","CO"],["Connecticut","CT"],["Delaware","DE"],["District of Columbia","DC"],["Florida","FL"],["Georgia","GA"],["Hawaii","HI"],["Idaho","ID"],["Illinois","IL"],["Indiana","IN"],["Iowa","IA"],["Kansas","KS"],["Kentucky","KY"],["Louisiana","LA"],["Maine","ME"],["Maryland","MD"],["Massachusetts","MA"],["Michigan","MI"],["Minnesota","MN"],["Mississippi","MS"],["Missouri","MO"],["Montana","MT"],["Nebraska","NE"],["Nevada","NV"],["New Hampshire","NH"],["New Jersey","NJ"],["New Mexico","NM"],["New York","NY"],["North Carolina","NC"],["North Dakota","ND"],["Ohio","OH"],["Oklahoma","OK"],["Oregon","OR"],["Pennsylvania","PA"],["Rhode Island","RI"],["South Carolina","SC"],["South Dakota","SD"],["Tennessee","TN"],["Texas","TX"],["Utah","UT"],["Vermont","VT"],["Virginia","VA"],["Washington","WA"],["West Virginia","WV"],["Wisconsin","WI"],["Wyoming","WY"],["American Samoa","AS"],["Guam","GU"],["Northern Mariana Islands","MP"],["Puerto Rico","PR"],["U.S. Virgin Islands","VI"],["U.S. Minor Outlying Islands","UM"],["Micronesia","FM"],["Marshall Islands","MH"],["Palau","PW"]];
  for(var i=0; i<arr.length; i++){
    if(str?.toLowerCase()?.trim() == arr[i][0]?.toLowerCase() || str?.toLowerCase()?.trim() == arr[i][1]?.toLowerCase()){
      return str?.trim().length > 2 ? arr[i][1] : arr[i][0];
    }
  }
}
usStateSwitch(' ga ')
