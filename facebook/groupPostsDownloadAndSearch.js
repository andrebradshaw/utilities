async function initGroupPostsDownloadAndSearch(query_object){
    const {search_string,group_name} = query_object;
    function convert2TsvAndDownload(records, named_file){
      var fileArray = records;
      var tsvReady = (s) => s ? s.replace(/\t|\u0009|&#9;/g, ' ').replace(/[\r\n]+/g, '↵').replace(/\u2029|\u2028|\x85|\x1e|\x1d|\x1c|\x0c|\x0b/g,'↵').replace(/"/g, "'") : s;
      var unqHsh = (a, o) => a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));
      var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
      var str = (o) => typeof o == 'object' ? tsvReady(JSON.stringify(o).replace(/\n|\r/g, ' ')) : o;
      var firstLevel = fileArray.map(el => Object.entries(el));
      var header = unqHsh(firstLevel.map(el => el.map(itm => itm[0])).flat(),{});
      var table = [header];
      for (var i = 0; i < firstLevel.length; i++) {
        var arr = [];
        var row = [];
        var record = firstLevel[i];
        for (var s = 0; s < record.length; s++) {
          var record_kv = record[s];
          var col_key = record_kv[0];      
          var place = header.indexOf(col_key);
          arr[place] = record_kv[1];
        }
        for (var a = 0; a < arr.length; a++) {
          if (arr[a]) {
            row.push(arr[a]);
          } else {
            row.push('');
          }
        }
        table.push(row);
      }
      function downloadr(arr2D, filename) {
        var data = /\.json$|.js$/.test(filename) ? JSON.stringify(arr2D) : arr2D.map(el => el.reduce((a, b) => a + '\t' + b)).reduce((a, b) => a + '\r' + b);
        var type = /\.json$|.js$/.test(filename) ? 'data:application/json;charset=utf-8,' : 'data:text/plain;charset=utf-8,';
        var file = new Blob([data], {
          type: type
        });
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
      var output_ = table.map(el => el.map(itm => str(itm)));
      downloadr(output_, named_file);
    }
    function convertBoolSearch(search){
        const parseStringAsXset = (s) => s.split(/\s+\band\b\s+|(?<!\s+and\b)\s+\(|\)\s+(?!\band\b)/i).map(el=>el.split(/\s+\bor\b\s+/i).map(ii=>ii.replace(/\s*\)\s*/g,'').replace(/\s*\(\s*/g,'').replace(/\s+/g,'.{0,3}').replace(/"/g,'\\b').replace(/\*/g,'\\w*').replace(/\*\*\*/g,'.{0,60}')).reduce((a,b)=> a+'|'+b)).filter(el=> el);
        function permutateNear(input,joiner){
          var nearx = /(?<=\||^)\S+?(?=\||$)/g;
          var base = input.replace(nearx, '').replace(/[\|]+/g, '|');
          var near_or = input.match(nearx) ? input.match(nearx).map(str=> {
            var arr = str.split(/~/);
            if(arr.length > 5){
              return str.replace(/[~]+/,'.');
            }else{
              var cont = [];
              var containArr = [];
              function comboLoop(arr, cont){
                if (arr.length == 0) {
                  var row = cont.join(joiner);
                  containArr.push(row)
                }
                for (var i = 0; i < arr.length; i++) {
                  var x = arr.splice(i, 1);
                  cont.push(x);
                  comboLoop(arr, cont);
                  cont.pop();
                  arr.splice(i, 0, x);
                }
              }
              comboLoop(arr, cont);
              return containArr.reduce((a,b)=> a+'|'+b);
            }
          }).flat().reduce((a,b)=> a+'|'+b) : '';
          return base + near_or;
        }
        function buildSearchSet(str){
          if(str){
              var set = parseStringAsXset(str);
              var xset = set.map(r=> permutateNear(r,'.{0,39}')).map(r=> tryRegExp(r.replace(/^\||\|$/g,''),'i'));
              return xset;
          }else{return null}
        }
        function tryRegExp(s,f){
            try{return new RegExp(s,f)}
            catch(err){return err}
        }
        return buildSearchSet(search);
    }

    async function getPostsFromGroup(group_name){
        const rando = (n) => Math.round(Math.random() * n);
        const delay = (ms) => new Promise(res => setTimeout(res, ms));
        function dateString(d){
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var date = new Date(d);
          return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        }
        var cleanObject = (ob) =>     Object.entries(ob).reduce((r, [k, v]) => {    if(v != null && v != undefined && v != "" && ( typeof v == 'boolean' || typeof v == 'string' || typeof v == 'symbol' || typeof v == 'number' || typeof v == 'function' || (typeof v == 'object'  && ((Array.isArray(v) && v.length) || (Array.isArray(v) != true)) ) ) ) {         r[k] = v;         return r;    } else { return r; }    }, {});

        async function getGroupPosts(cursor,tokens){
            const {__spin_t,__user,fb_dtsg,__hsi,group_id} = tokens;
            const count = 20;
            const res = await fetch("https://www.facebook.com/api/graphql/", {
              "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/x-www-form-urlencoded",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
              },
              "referrer": "https://www.facebook.com/",
              "referrerPolicy": "strict-origin-when-cross-origin",
              "body": `av=${__user}&__user=${__user}&__a=1&__dyn=&__csr=&__req=8h&__beoa=0&__pc=&dpr=1.5&__ccg=EXCELLENT&__rev=&__s=&__hsi=&__comet_req=1&__comet_env=fb&fb_dtsg=${encodeURIComponent(fb_dtsg)}st=&__spin_r=&__spin_b=trunk&__spin_t=${__spin_t}&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=GroupsCometFeedRegularStoriesPaginationQuery&variables=%7B%22UFI2CommentsProvider_commentsKey%22%3A%22CometGroupDiscussionRootSuccessQuery%22%2C%22count%22%3A${count}%2C${cursor}%22displayCommentsContextEnableComment%22%3Anull%2C%22displayCommentsContextIsAdPreview%22%3Anull%2C%22displayCommentsContextIsAggregatedShare%22%3Anull%2C%22displayCommentsContextIsStorySet%22%3Anull%2C%22displayCommentsFeedbackContext%22%3Anull%2C%22feedLocation%22%3A%22GROUP%22%2C%22feedType%22%3A%22DISCUSSION%22%2C%22feedbackSource%22%3A0%2C%22focusCommentID%22%3Anull%2C%22privacySelectorRenderLocation%22%3A%22COMET_STREAM%22%2C%22renderLocation%22%3A%22group%22%2C%22scale%22%3A1.5%2C%22sortingSetting%22%3A%22CHRONOLOGICAL%22%2C%22stream_initial_count%22%3A2%2C%22useDefaultActor%22%3Afalse%2C%22id%22%3A%22${group_id}%22%7D&server_timestamps=true&doc_id=4911686058873292`,
              "method": "POST",
              "mode": "cors",
              "credentials": "include"
            });
            const t = await res.text();
            return parsePostFromGroupRes(t);
        }
        async function getFBSearchTokens(group_name){
            const reg = (o, n) => o ? o[n] : '';
            const res = await fetch(`https://www.facebook.com/groups/${encodeURIComponent(group_name)}?sorting_setting=CHRONOLOGICAL`)
            const text = await res.text();
            const x = /__user=(\d+).+?"([A-Za-z0-9]{12}:[A-Za-z0-9]{12})"/;
            return cleanObject({__user: reg(/__user=(\d+)./.exec(text),1), fb_dtsg: reg(x.exec(text),2), __spin_t:Math.floor(new Date()/1000), __hsi: reg(/qpl_inl\("(\d+)/.exec(text),1), group_id: reg(/groups\/(\d+)/.exec(text),1)});
        }

        function parsePostFromGroupRes(text){
            const reg = (o, n) => o ? o[n] : '';
            const descape = (s) => s?.replace(/\\/g,'');
            const tsvReady = (s) => s?.replace(/\t|\u0009|&#9;/g, ' ').replace(/[\r\n]+/g, '↵').replace(/\u2029|\u2028|\x85|\x1e|\x1d|\x1c|\x0c|\x0b/g,'↵').replace(/"/g, "'");
            const xc = /"end_cursor":"(.+?)","has_next_page":(\w+)/;
            const xcg = /"end_cursor":"(.+?)","has_next_page":(\w+)/g;
            const xg = /\{"__typename":"CometFeedStoryMessageContainerRenderingStrategy","__isICometStorySection":"CometFeedStoryMessageContainerRenderingStrategy","is_prod_eligible":true,"story":\{"message":\{"text":"(.+?)\"\}.+?"__isActor":"User","id":"(\d+)","__isEntity":"User","url":"(.+?)".+?"url":".+?"name":"(.+?)".+?\{"creation_time":(\d+),"url":"(.+?)"/g;
            const x = /\{"__typename":"CometFeedStoryMessageContainerRenderingStrategy","__isICometStorySection":"CometFeedStoryMessageContainerRenderingStrategy","is_prod_eligible":true,"story":\{"message":\{"text":"(.+?)\"\}.+?"__isActor":"User","id":"(\d+)","__isEntity":"User","url":"(.+?)".+?"url":".+?"name":"(.+?)".+?\{"creation_time":(\d+),"url":"(.+?)"/
            const matches = text.match(xg);
            const posts = matches ? Array.from(matches).map(t=> {
                let r = x.exec(t);
                let timestamp = parseInt(reg(r,5)) * 1000;
                return { text: tsvReady(descape(reg(r,1))), user_id: reg(r,2), user_url: descape(reg(r,3)), full_name: reg(r,4), timestamp: timestamp, date_posted: dateString(timestamp) post_url: descape(reg(r,6)),};
            }) : [];
            const cursors = text.match(xcg);
            const cursor = cursors ? Array.from(cursors).map(r=> {
                return {next_cursor: reg(xc.exec(r),1), has_nex_cursor: reg(xc.exec(r),2) === 'true' ? true : false}
            }).filter(r=> r.has_nex_cursor) : [];
            const next_cursor = cursor.length ? cursor[cursor.length-1] : {}
            return {...next_cursor,...{posts: posts}};
        }
        async function loopThroughGroupPosts(group_name){
            var current_cursor_is = '';
            const tokens = await getFBSearchTokens(group_name);
    console.log(tokens);
            const contain_arr = [];
            for(let i=0; i<13; i++){
                let res = await getGroupPosts(current_cursor_is,tokens);
                if(res.has_nex_cursor){
                    current_cursor_is = `%22cursor%22%3A%22${encodeURIComponent(res.next_cursor)}%3D%22%2C`;
                }
                contain_arr.push(res.posts);
                await delay(rando(666)+666);
    console.log(res);
            }
            return contain_arr.flat();
        }

        const posts = await loopThroughGroupPosts(group_name);
        console.log(posts);
        return posts;
    }
    const posts = await getPostsFromGroup(group_name);
    if(search_string){
        const xarr = convertBoolSearch(search_string);
        const filtered_posts = posts.filter(p=> xarr.every(x=> x.test(p.text)));
        convert2TsvAndDownload(filtered_posts,`${filtered_posts.length} posts from ${group_name} - ${new Date().getTime()}.tsv`);
    }else{
        convert2TsvAndDownload(posts,`${posts.length} posts from ${group_name} - ${new Date().getTime()}.tsv`);
    }
}

var search_query_object = {
    group_name: `SourceCon`,
    search_string: `(contact~find OR email~find OR phone~find OR contact~tool OR extension~phone OR extension~email OR extension~contact)`
}

initGroupPostsDownloadAndSearch(search_query_object)
