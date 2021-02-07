const http = require('http')
const spawn = require('child_process').spawn
const path = require('path')

let MEMORY = {
    MAX: "2G",
    MIN: "1G"
}
let SERVER_FILE = "server.jar"

let server = http.createServer((req,res) => {
    if(req.url=='/') {
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write('<html><body><h1>Still Alive.</h1></body></html>')
        res.end()
    }
    else if(req.url=='/start') {
        let script = spawn("java", [`-Xms${MEMORY.MIN}`, `-Xmx${MEMORY.MAX}`, `-XX:+UseG1GC`, `-jar`, SERVER_FILE, `nogui`], {
            cwd: path.join(__dirname, "minecraft")
        })
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(`<html><body><h1>Executed.</h1></body></html>`)
        res.end()
    }
    else res.end('Invalid Request!')

})

server.listen(1481)
