var request = require('request');
var fs = require('fs');

var username = '40m4mku7tneb6ibakdpk8701i7vurz',
    password = 'walmart123',
    url;


var browsers = ['chrome', 'firefox', 'ie']
var urlNumbers = ['1533', '15028', '15738', '14956', '13969', '13969', '14164', '15718', '14166', '15719', '14678', '15135', '15740']

urlNumbers.forEach(function(speedcurveUrlNumber) {
	console.log("speedcurve url :" + speedcurveUrlNumber);
    browsers.forEach(function(browser) {
        url = 'https://' + username + ':' + password + '@api.speedcurve.com/v1/urls/'+speedcurveUrlNumber+'?days=365&browser=';
        url = url + browser;
        console.log("Url  : " + url);
        request({
            url: url
        }, function(error, response, body) {
            //console.log(body);

            fs.writeFile("speedcurve_export_" + browser + "_url_" + "_"+speedcurveUrlNumber+".json", body, function(err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        });
    });
})
