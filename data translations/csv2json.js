
var table = textFile.split(/\n/).map(row=> row?.trim().split(/[,](?=(?:[^\"]|\"[^\"]*\")*$)/));
  var cleanObject = (ob) => 
  Object.entries(ob).reduce((r, [k, v]) => {
    if( v != null && v != undefined && v !== "" && ( ['string','number','boolean','function','symbol'].some(opt=> typeof v == opt) || (typeof v == 'object' && ((Array.isArray(v) && v.length) || (Array.isArray(v) != true) ) ) ) ) { 
      r[k] = v; 
      return r;
    } else { 
     return r; 
    }
  }, {});

var header = table[0];
var jsondata = table.map(row=> {
    return header.map((h,i)=> {
        return cleanObject({
            [h]:row[i]
        })
    }).reduce((a,b)=> {return {...a,...b}})
})
