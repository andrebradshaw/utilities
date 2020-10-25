chrome.runtime.onMessage.addListener((msg, sender, response) => {
    requestFromClient(msg).then(response);
    return true;
})

async function requestFromClient(data){
    const output = {this_is_a_test: {testdata:'we gottem', request: data}};
    console.log(output);
    return output;
}
