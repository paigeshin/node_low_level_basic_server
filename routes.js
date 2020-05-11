const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></form></body>');
        res.write('</html>');
        return res.end(); //end() 를 호출 한 뒤에는 write을 다시 호출 하면 안된다.
    }

// process.exit();, process 끝내기

    /*** request 정보 가져오기 ***/
    console.log(req.url, req.method, req.headers);

    /*  result:
        url - `/`
        method = `/GET`
        headers = { a bunch of information }
    */

    /*** response 후에 redirect하기 ***/
    if (url === '/message' && method === 'POST') {

        const body = [];  //array in const means, it will never reassign some new value to it.

        req.on('data', (chunk) => { //register event listener `on()` listens to a certain event
            console.log(chunk);
            body.push(chunk); //chunk로 들어오는 모든 데이터를 어레이에 넣는다.
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString(); //Buffer - Bus Stop for incoming data
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (error) => { //write file
                res.statusCode = 302; //302 means `redirection`
                res.setHeader('Location', '/'); //Redirect
                return res.end();
            });
        });
    }

    /*** HTML response 보내기 ***/
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end(); //end() 를 호출 한 뒤에는 write을 다시 호출 하면 안된다.
};

module.exports = requestHandler;


/*** Module Export 방법들 ***/

/*
* module.exports = `원하는 것`
* module.exports = { key : pair }
* module.exports.handler = `원하는 것`  (중복으로 사용 가능하다.)
* */