## Pre-request Script

const limit = pm.collectionVariables.get("limit");
let offsets = pm.collectionVariables.get("offsets");

if(!offsets) {
    offsets = [];
    for(let i=0; i<100; i++){
        offsets.push(i * limit)
    }
}

const currentOffset = offsets.shift();
pm.collectionVariables.set("offset", currentOffset);
pm.collectionVariables.set("offsets", offsets);



## Tests

const offsets = pm.collectionVariables.get("offsets");

if(offsets && offsets.length>0) {
    postman.setNextRequest("request");
}
else {
 postman.setNextRequest(null);
}


et pour la sauvegarde dans un dossier en local:

let opts = {
    requestName: request.name || request.url,
    fileExtension: 'json',
    mode: 'writeFile', // Change this to any function of the fs library of node to use it.
    uniqueIdentifier: false,
    responseData: pm.response.text()
};

pm.sendRequest({
    url: 'http://localhost:3000/write',
    method: 'POST',
    header: 'Content-Type:application/json',
    body: {
        mode: 'raw',
        raw: JSON.stringify(opts)
    }
}, function (err, res) {
    console.log(res);
});