const fs = require('fs')

const content = fs.readFileSync('./readFile.txt', 'utf-8')
console.log(content)