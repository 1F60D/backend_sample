module.exports = {
    "accessControl" : {
      "allowMethods" : "GET, POST, PUT, DELETE, PATCH", 
      "allowHeaders" : "X-PINGOTHER", 
      "allowOrigin" : [
        "http://localhost:3000", 
        "https://localhost:3000", 
        "http://127.0.0.1:3000", 
        "https://127.0.0.1:3000", 
        "http://localhost:3333/", 
        "https://localhost:3333/", 
        "http://127.0.0.1:3333", 
        "https://127.0.0.1:3333", 
      ]
    }, 
    "databases" : {
      "mongodb" : {
        "username": "", 
        "password": "", 
        "address" : "", 
        "port" : 27017, 
        "database" : "" 
      }, 
      "mysql" : {
        'host' : 'localhost', 
        'user' : 'letstewbie', 
        'password' : 'letstewbie2018', 
        'port' : 3306, 
        'database' : 'letstewbie',
        'connectTimeout' : 10000
      }, 
      "redis" : {

      }
    }, 
    "api" : {
      "facebook" : {
        "client_id" : "", 
        "client_secret" : "",
        "callback_url": "" 
      }, 
      "naver" : {
        "client_id" : "", 
        "client_secret" : "", 
        "callback_url" : ""
      }, 
      "google" : {
        "client_id" : "", 
        "client_secret" : "", 
        "callback_url" : ""
      }, 
      "kakao" : {
        "native" : "", 
        "rest" : "", 
        "js" : "", 
        "admin" : "", 
        "callback_url" : "" 
      }
    }, 
    "aws" : {
      "s3" : {
        
      }
    }, 
    "imgServer" : {

    }, 
    "sms" : {
      "user" : "", 
      "password" : "", 
      "from" : "", 
      "key" : "", 
      "secret" : ""
    }, 
    "mailer" : {
      "from" : "", 
      "info" : {
        "service" : "gmail", 
        "auth" : {
          "user" : "", 
          "pass" : "" 
        }
      }
    }
}