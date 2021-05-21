function processObjectOptions(arr,user_selected_object_state, object_level){       

    const object_definitions = {};
//TODO: This should reference a user preference document in the future.
    let make_false = []; //["id","cert_company_name","cert_end_timestamp","cert_start_timestamp","millseconds_in_cert","cert_company_id","languages","company_connections","shared_connections","edu_start_year","edu_school_id","job_company_linkedin_url","job_company_id","job_company_description","job_company_hq_region","job description","job_is_current","job_industries","job_country","region_code","country_code","public_id","lir_niid","industry","network_distance","profile_img","number_of_connections","ts_hire_identity","patents","vols","pro_projects","publications","network_distance","desired_company_max_size","desired_company_min_size","certs","companies_following","courses","honors","test_scores"];
    arr.forEach(obj=> {
        Object.entries(cleanObject(obj)).forEach(kv=>{
            if(kv[0] && kv[1]){
                let current_user_sel = user_selected_object_state && user_selected_object_state[kv[0]] && user_selected_object_state[kv[0]].is_user_selected ? user_selected_object_state[kv[0]].is_user_selected : true;
                let is_object = !Array.isArray(kv[1]) && typeof kv[1] == 'object';
                let is_array = Array.isArray(kv[1]);
                let is_array_of_objects = is_array ? kv[1].every(v=> typeof v == 'object' && Array.isArray(v) === false) : false;
                if(object_definitions[kv[0]]){
                    if( is_array_of_objects ){
                        let new_keys = Object.keys(object_definitions[kv[0]].in_array).filter(itm=> !Object.keys(kv[1]).includes(itm))
                        if(new_keys.length > 0 ){
                            new_keys.forEach(nk=> {
                                let add_these_keys = processObjectOptions(kv[1],user_selected_object_state, {parent_key: kv[0]});
                                object_definitions[kv[0]]['in_array'] = {...object_definitions[kv[0]].in_array,...add_these_keys}
                            })
                        }
                    }
                }else{
                    object_definitions[kv[0]] = {
                        type: typeof kv[1],
                        is_object: is_object,
                        is_array: is_array,
                        in_array: is_array && is_array_of_objects ? processObjectOptions(kv[1],user_selected_object_state, {parent_key: kv[0]}) : false,
                        type: typeof kv[1],
                        is_top_level: object_level?.is_top_level ? true : false,
                        parent_key: object_level?.parent_key ? object_level?.parent_key : null,
                    }
                }

            }
        })
    })
    return object_definitions;
}
var obj_2 = processObjectOptions(fileArray)
console.log(obj_2)
function downloadr(arr2D, filename) {
  var data = /.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D.map(el=> el.reduce((a,b) => a+'	'+b )).reduce((a,b) => a+''+b);
  var type = /.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
  var file = new Blob([data], {    type: type  });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    var a = document.createElement('a'),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 10);
  }
}

downloadr(obj_2,'object key child map.json')
