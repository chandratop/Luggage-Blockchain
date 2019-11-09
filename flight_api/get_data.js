var request = new XMLHttpRequest()
request.open(GET, 'https://aerodatabox.com/docs/public-v1/flights/SG788/2019-11-09', true)
request.onload = function() {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.forEach(departure => {
            console.log(departure.scheduledTimeLocal)
        })
    } else {
        console.log('error')
    }
}