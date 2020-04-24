async function handleFetch(url,params_obj,type){ //all arguments are required
  if(params_obj && url){
    var res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return false });
    if(res.status > 199 && res.status < 300){
      if(type == 'json'){
        var d = await res.json().catch(err=> { console.log([err,url,params_obj]); return false });
      }else{
        var d = await res.text().catch(err=> { console.log([err,url,params_obj]); return false });  
      }
      return d;
    }
    if(res.status == 429) {
      await delay(60000);
      var res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return {} });
      if(res.status > 199 && res.status < 300){
        if(type == 'json'){
          var d = await res.json().catch(err=> { console.log([err,url,params_obj]); return false });
        }else{
          var d = await res.text().catch(err=> { console.log([err,url,params_obj]); return false });  
        }
        return d;
      }else{
        return {download_now: true, status: res.status};
      }
    }
    if(res.status > 499 && res.status < 900) {
      await delay(3110);
      var res = await fetch(url,params_obj).catch(err=> { console.log([err,url,params_obj]); return false });
      if(res.status > 199 && res.status < 300){
        if(type == 'json'){
          var d = await res.json().catch(err=> { console.log([err,url,params_obj]); return false });
        }else{
          var d = await res.text().catch(err=> { console.log([err,url,params_obj]); return false });  
        }
        return d;
      }else{
        return {download_now: true, status: res.status};
      }
    }
    if(res.status > 899) {
      console.log('you have been logged out');
      return {download_now: true, status: res.status};
    }
  } else {return false;}
}
