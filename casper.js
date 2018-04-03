var set = ['bts', 'mbk', 'cpn']

var casper = require('casper').create();
casper.start()
console.log(set)
for (i = 0; i < set.length; i++) {
    var uri = 'https://marketdata.set.or.th/mkt/stockquotation.do?symbol=' + set[i] + '&ssoPageId=1&language=th&country=TH'
    casper.thenOpen(uri, function () {
        this.echo(this.fetchText('#maincontent > div > div:nth-child(8) > div.col-xs-12.col-md-12.col-lg-6.float-right > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)').replace(/\s/g,''));
        var a = this.evaluate(function() {
            return document.querySelector('#maincontent > div > div:nth-child(8) > div.col-xs-12.col-md-12.col-lg-6.float-right > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2)').className
        })
        this.echo(a)
    });
}
casper.run()