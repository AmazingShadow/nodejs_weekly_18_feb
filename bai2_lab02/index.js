const http = require('http')
const URL = require('url')
const queryString = require('querystring')
const path = require('path')
const fs = require('fs')

const sever = http.createServer((req, res) => {
    const url = URL.parse(req.url)

    if (url.pathname === '/') {
        let html = fs.readFileSync(path.join(__dirname, 'views/login.html'))
        return res.end(html)
    }

    if (url.pathname === '/login') {
        return postLogin(req, res)
    }

    let html = fs.readFileSync(path.join(__dirname, 'views/fail.html')).toString()
    html = html.replace('xxxxxxxxxx', 'Đường dẫn không hợp lệ')
    return res.end(html)
})

function postLogin(req, res) {
    let html = fs.readFileSync(path.join(__dirname, 'views/fail.html')).toString()
    if (req.method !== 'POST') {
        html = html.replace('xxxxxxxxxx', `Phương thức ${req.method} không được hỗ trợ`)
        return res.end(html)
    }
    let body = ''
    req.on('data', d => body += d.toString())
    req.on('end', () => {
        let input = queryString.decode(body)
        if (!input.email) {
            return res.end(html.replace('xxxxxxxxxx', `Vui lòng nhập email`))
        }

        if (!input.email) {
            return res.end(html.replace('xxxxxxxxxx', `Vui lòng nhập email`))
        }

        if (!input.email.includes('@')) {
            return res.end(html.replace('xxxxxxxxxx', `Email của bạn không hợp lệ`))
        }

        if (!input.password) {
            return res.end(html.replace('xxxxxxxxxx', `Vui lòng nhập password`))
        }

        if (input.password.length < 6) {
            return res.end(html.replace('xxxxxxxxxx', `Mật khẩu phải có tối thiểu 6 ký tự`))
        }

        if (input.email !== 'admin@gmail.com' || input.password !== '123456') {
            return res.end(html.replace('xxxxxxxxxx', `Sai thông tin email hoặc mật khẩu`))
        }

        let success = fs.readFileSync(path.join(__dirname, 'views/success.html'))
        return res.end(success)
    })
}

sever.listen(8080, () => {
    console.log('Sever is running at http://localhost:8080');
})