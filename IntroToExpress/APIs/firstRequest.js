const request = require('request');

request('https://www.reddit.com', (error, response, body) => {
    if (error)
    {
        console.log("Something went wrong: " + error);
    }
    else if (response.statusCode == 200)
    {
        console.log(body);
    }
});