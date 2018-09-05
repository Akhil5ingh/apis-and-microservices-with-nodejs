# Apis and Microservices Projects
Simple Microservices with node.js and express. Created in [Glitch](https://glitch.com).
Technologies used: Node.js, Express.js, Mongodb, mongoose.js, javaScript, HTML, CSS



- ## API Project No1: Timestamp Microservice for FCC

### url: [https://timestra.glitch.me](https://timestra.glitch.me)

### User stories :

1. The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
2. A date string is valid if can be successfully parsed by `new Date(date_string)` (JS) . Note that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**. In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
3. If the date string is **valid** the api returns a JSON having the structure 
`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`.
5. If the date string is **invalid** or **empty** the api returns a JSON having the structure `{"unix": null, "utc" : "Invalid Date" }`. It is what you get from the date manipulation functions used above.

#### Example usage:
* https://timestra.glitch.me/api/timestamp/:2015-12-15
* https://timestra.glitch.me/api/timestamp/:20151215
#### Example output:
* { "unix": 1450137600, "utc": "December 15, 2015" }
* { "unix": null, "utc": "Invalid Date" }


<br>

- ## API Project No2: Request Header Parser Microservice for freeCodeCamp

### url: [https://headerpars.glitch.me](https://headerpars.glitch.me)

### User stories:
1. I can get the IP address, preferred languages (from header `Accept-Language`) and system infos (from header `User-Agent`) for my device.

#### Example usage:
* [base_url]/api/

#### Example output:
* `{"ipaddress":"headerpars.glitch.m","language":"el-GR","software":"Windows NT 10.0; WOW64"}`

<br>


- ## API Project No3: URL Shortener Microservice for freeCodeCamp

### url: [https://urlshorte.glitch.me](https://urlshorte.glitch.me)

### User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. *HINT*: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.
3. When I visit the shortened URL, it will redirect me to my original link.


#### Creation Example:

POST [project_url]/api/shorturl/new - body (urlencoded) :  url=http://forum.freecodecamp.com

#### Usage:

[this_project_url]/api/shorturl/1

#### Will redirect to:

https://www.google.com


<br>

- ## API Project No4: File Metadata Microservice for freeCodeCamp

### url: [https://filemetada.glitch.me](https://filemetada.glitch.me)

###    User stories:
1. I can submit a form that includes a file upload.
2. The from file input field  has the "name" attribute set to "upfile". We rely on this in testing.
3. When I submit something, I will receive the file name and size in bytes within the JSON response

### Usage :
* Go to the main page, and upload a file using the provided form.

### Hint:
* To handle the file uploading you should use the [multer](https://www.npmjs.com/package/multer) npm package.

<br>

- ## API Project No5: Exercise Tracker

### url: [https://trackerexe.glitch.me](https://trackerexe.glitch.me)

###    User stories:
1. I can create a new user in my database.
2. I can create a new exercise for a selected user in my database.
3. I can retrieve a users exercises.

