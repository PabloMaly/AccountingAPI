const express = require('express');
const cors = require('cors');
const app = express();
var fs = require('fs');

app.use(cors());

app.use(express.static('public'));

app.get('/', function (req, res) {
    var filePath = 'db.json';
    
    if (fs.existsSync(filePath)) {
        // load file
        try {
            content = fs.readFileSync(filePath, 'utf-8');
            data = JSON.parse(content)
            deferred.resolve(data);
        } catch (err) {
            console.log('Example app listening on port 3000!')
        }
    } else {
          deferred.reject();
    }
    res.status(200);
    res.json(data);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
