var cleanObject = (ob) => 
  Object.entries(ob).reduce((r, [k, v]) => {
    if( v != null && v != undefined && v !== "" && ( ['string','number','boolean','function','symbol'].some(opt=> typeof v == opt) || (typeof v == 'object' && ((Array.isArray(v) && v.length) || (Array.isArray(v) != true) ) ) ) ) { 
      r[k] = v; 
      return r;
    } else { 
     return r; 
    }
  }, {});
var snakeCaser = (s) => s.split(/(?<=[a-z])\B(?=[A-Z])/).map(i=> i.toLowerCase()).reduce((a,b)=> a+'_'+b)
function snakeCaseObject(obj){
    return obj ? cleanObject(Object.entries(obj).map(kv=> {
        let val = typeof kv[1] == 'object' && Array.isArray(kv[1]) ? kv[1].map(v=> snakeCaseObject(v))
            : kv[1] && typeof kv[1] == 'object' ? snakeCaseObject(kv[1])
            : kv[1];
        return {
            ...(/^\$/.test(kv[0]) ? {} : {[snakeCaser(kv[0].replace(/^js/,''))]:val})
        }
    }).reduce((a,b)=> {return {...a,...b}})) : {}
}
snakeCaseObject({
  allowContact: true,
  allowContactByPhone: false,
  allowContactBySms: true,
  allowRepeatedContact: false,
  contactClockOverride: null,
  contactedByCoworkerContactType: "EMAIL",
  contactedByCoworkerDate: null,
  contactedByCoworkerEmail: null,
  contactedByUserContactType: "EMAIL",
  contactedByUserDate: null,
  disallowBulkContactReason: null,
  disallowContactInterviewReason: "DISABLED_FEATURE",
  disallowContactReason: null,
  jsEmailAddress: null,
  jsPhone: null,
  responseStatus: "INTERESTED",
})
