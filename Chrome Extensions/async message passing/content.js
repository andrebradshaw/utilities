
async function requestFromBackground(obj){
    return new Promise((res,rej) => {
        chrome.runtime.sendMessage(obj, response=> {
            res(response)
        })
    })
  }
  
async function doSomeTestSend(){
    const response_from_bg = await requestFromBackground({tester: true});
    console.log(response_from_bg);
}
doSomeTestSend()
