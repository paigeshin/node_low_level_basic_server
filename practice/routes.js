/*
* 1. Spin up a Node.js-driven Server (on port 3000)
* 2. Handle Two Routes: "/" and "/users"
*   - return some greeting text on "/"
*   - return a list of dummy users (e.g. <ul><li>User 1</li></ul>)
* 3. Add a form with a "username" <input> to the "/" page and submit a POST request to "/create-user" upon a button click
* 4. Add the "/create-user" route and parse the incoming data (i.e. the username) and simply log it to the console
* */

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>My First Page</title></head>');
        res.write('<body>');
        res.write('<h1>Hello!</h1>');
        res.write('<ul>');
        res.write('<li>user1</li>');
        res.write('<li>user2</li>');
        res.write('<li>user3</li>');
        res.write('<li>user4</li>');
        res.write('</ul>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/create-user' && method === 'POST') {

        const body = [];

        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        })

    }


};

module.exports = requestHandler;