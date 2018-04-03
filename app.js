var request = require('request')
var CronJob = require('cron').CronJob
function getDataFromSource() {
    return new Promise((resolve, reject) => {
        var exec = require('child_process').exec;
        var shellescape = require('shell-escape');

        var args = [
            'casperjs',
            'casper.js'
        ];

        var cmd = shellescape(args);

        exec(cmd, function (error, stdout) {
            if (error) console.log(error);
            let result = stdout.split('\n')
            // console.log(result)
            let set = result[0].split(',')
            let jsonList = []
            for (i = 0; i < set.length; i++) {
                let json = {}
                json["setName"] = set[i]
                json["value"] = result[i * 2 + 1]
                json["status"] = result[i * 2 + 2]
                jsonList.push(json)
            }
            let jsonResult = {}
            jsonResult['data'] = JSON.stringify(jsonList)
            jsonResult['ts'] = new Date().getTime()
            resolve(jsonResult)
        });
    })
}

function postDataToUserConnectorManagement(data){
    var options = {
        method: 'POST',
        url: 'https://api.smartcity.kmitl.io/api/v1/connectorDataManagement',
        // url: 'http://192.168.1.167:3000',
        headers:
            {
                'Content-Type': 'application/json',
                'user': 'SET-connector',
                'Authorization': '40d7e4b5dca0d75b45a963173094eabc19a9cfe4878f05f7552740f637d7081b',
                'collectionId': 'sc-593b722a-7307-436d-9dd3-c2f858841589'
            },
        body: data ,
        json: true
    }

    request(options, function (error, response, body) {
        console.log(body)
    })
    .on('error', function (err) {
        console.log(err)
    });
}

function main() {
    // console.log(cron)
    new CronJob('*/1 * * * * ', function () {
        getDataFromSource().then((data) => {
            postDataToUserConnectorManagement(data)
        })
    }, null, true, "Asia/Bangkok");
}

main()

