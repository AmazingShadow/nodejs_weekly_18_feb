const http = require('http')
const URL = require('url')
const queryString = require('querystring')


const sever = http.createServer((req, res) => {
    const url = URL.parse(req.url)

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })

    if (url.pathname === '/') {
        return res.end(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tính toán cơ bản</title>
        </head>
        
        <body>
            <form action="calculator" method="GET">
                <table>
                    <tr>
                        <td>Số hạng 1</td>
                        <td><input type="text" name="numberOne" placeholder="Số hạng 1"></td>
                    </tr>
                    <tr>
                        <td>Số hạng 2</td>
                        <td><input type="text" name="numberTwo" placeholder="Số hạng 2"></td>
                    </tr>
                    <tr>
                        <td>Phép tính</td>
                        <td>
                            <select name="operation" id="">
                                <option value="">Chọn phép tính</option>
                                <option value="+">Cộng</option>
                                <option value="-">Trừ</option>
                                <option value="*">Nhân</option>
                                <option value="/">Chia</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><button type="submit">Tính</button></td>
                    </tr>
                </table>
            </form>
        </body>
        
        </html>`);
    }
    if (url.pathname === '/calculator') {
        let input = queryString.decode(url.query)
        let operation = ['+', '-', '*', '/']
        if (!input.numberOne) return res.end('Thiếu tham số thứ nhất')
        if (!input.numberTwo) return res.end('Thiếu tham số thứ hai')
        if (!input.operation) return res.end('Thiếu phép tính')
        if (!operation.includes(input.operation)) {
            console.log('Phép toán không hợp lệ')
        }
        let numberOne = parseInt(input.numberOne)
        let numberTwo = parseInt(input.numberTwo)
        let result = numberOne + numberTwo
        if (input.operation === '-') result = numberOne - numberTwo
        if (input.operation === '*') result = numberOne * numberTwo
        if (input.operation === '/') result = numberOne / numberTwo

        return res.end(`Kết quả của phép tính: ${numberOne} ${input.operation} ${numberTwo} = ${result}`)
    }
    return res.end('Đường dẫn không hợp lệ')
})

sever.listen(8080, () => {
    console.log('Sever is running at http://localhost:8080');
})