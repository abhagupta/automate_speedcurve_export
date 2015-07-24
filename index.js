var request = require('request');
var fs = require('fs');

require("songbird");

var username = '40m4mku7tneb6ibakdpk8701i7vurz',
    password = 'walmart123',
    url;


var browsers = ['chrome', 'firefox', 'ie'];

var urlN = getUrlsFromSpeedcurve('Walmart Production');

//var urlNumbers =['1533', '15028', '15738', '14956', '13969', '13969', '14164', '15718', '14166', '15719', '14678', '15135', '15740']

var urlNumbers=[ 1533,
  15028,
  15738,
  14956,
  13969,
  14164,
  15718,
  14166,
  15719,
  14678,
  15135,
  15740,
  15741,
  15742,
  15507,
  15905,
  15520,
  15904,
  15522,
  15717,
  15720,
  15721,
  15723,
  15726,
  15729,
  15734,
  15733,
  15736,
  15928,
  16032,
  16375,
  16419,
  16421,
  16428,
  9094,
  14964,
  13969,
  14164,
  16519,
  14166,
  14306,
  14678,
  15136,
  15135,
  15147,
  15148,
  15149,
  15150,
  16344,
  15714,
  15521,
  15716,
  15551,
  14306,
  15722,
  15727,
  15728,
  15730,
  15732,
  15735,
  15739,
  16017,
  16373,
  16374,
  16418,
  16420,
  16426  ]

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

            var text = JSON.stringify(JSON.parse(body), null, '\t');

            fs.writeFile("speedcurve_export_" + browser + "_url_" + "_"+speedcurveUrlNumber+".json", text, function(err) {
                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        });
    });
})

function getUrlsFromSpeedcurve(speedCurveSite){

	var speedCurveSiteurl = 'api.speedcurve.com/v1/sites'
	var url = "https://"+ username + ':' + password + '@'+speedCurveSiteurl
		console.log("calling url" + url);
	var siteUrls =[];
	request({url:url}, function(error, response, body){
		var sites = JSON.parse(body).sites;
		sites.forEach(function(site){
			if(site.name === speedCurveSite){
				console.log("Found the required site :" + site.name);
				var urls = site.urls;
				urls.forEach(function(url){
					siteUrls.push(url.id);
				})
			}
		})
		console.log(siteUrls);
	})

}