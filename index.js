const fs = require("fs");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(express.json());
app.use(fileUpload());
const port = 5001;

// const home = path.join(__dirname, '/files');
const home = 'C:/files'; // aqui fica o seu diretorio. tem que estar previamente criado.
var currentPosition;

app.get('/home', (req, res) => {

    var file = new Array;
    var directories = new Array;
    var dir = fs.readdirSync(home);

    for (var count = 0; count < dir.length; count++) {
        var stats = fs.statSync(`${home}/${dir[count]}`);
        if (stats.isFile() === true) {
            file.push({name: dir[count],size: stats.size,creation: stats.birthtime});
        } else if (stats.isDirectory() === true) {
            directories.push({name: dir[count],size: stats.size,creation: stats.birthtime});
        }
    }

    currentPosition = home;
    res.send({file, directories});
});

app.post('/upfolder', (req, res) => {

    var file = new Array;
    var directories = new Array;

    if ( req.body.folder != undefined ) {
        currentPosition = path.join(currentPosition, `/${req.body.folder}`);
    }
    var dir = fs.readdirSync(currentPosition);

    for (var count = 0; count < dir.length; count++) {
        var stats = fs.statSync(`${currentPosition}/${dir[count]}`);
        if (stats.isFile() === true) {
            file.push({name: dir[count],size: stats.size,creation: stats.birthtime});
        } else if (stats.isDirectory() === true) {
            directories.push({name: dir[count],size: stats.size,creation: stats.birthtime});
        }
    }
    
    res.send({file, directories});
});

app.get('/downdir', (req, res) => {
    try {
        var file = new Array;
        var directories = new Array;
    
        currentPosition = path.join(currentPosition, '..');
        var dir = fs.readdirSync(currentPosition);
    
        for (var count = 0; count < dir.length; count++) {
            var stats = fs.statSync(`${currentPosition}/${dir[count]}`);
            if (stats.isFile() === true) {
                file.push({name: dir[count],size: stats.size,creation: stats.birthtime});
            } else if (stats.isDirectory() === true) {
                directories.push({name: dir[count],size: stats.size,creation: stats.birthtime});
            }
        }

        res.status(200).send({file, directories});
        } catch (err) {
            res.status(405).end();
        }
});

app.get('/download', (req, res) => {
    var stream = fs.createReadStream(currentPosition+`/${req.query.filename}`);
    stream.pipe(res);
});

app.delete('/deldir', (req, res) => {
    fs.rmSync(currentPosition+`/${req.query.dir}`, {recursive: true, force: true});
    res.end();
});

app.delete('/delfile', (req, res) => {
    fs.rmSync(currentPosition+`/${req.query.file}`);
    res.end();
});

app.post('/upload', (req, res) => {
    try {
        const data = req.files.data;
        if (data.length >= 2) {
            for (var count = 0; count < data.length; count++) {
                data[count].mv(currentPosition+`/${data[count].name}`, (err) => {
                    if (err) {console.log(err)}
                });
                res.end();
            }
        } else if (data != null) {
            data.mv(currentPosition+`/${data.name}`, (err) => {
                if (err) {console.log(err)}
            });
            res.end();
        }
    } catch (err) {
        res.status(500).end("restart");
        console.log(err);
    }
});

app.post('/newfolder', (req, res) => {
    fs.mkdir(`${currentPosition}/${req.body.folder}`, (err) => {
        if (err) {
            res.status(500).end();
        } else {
            res.end();
        }
    });
});

app.listen(port, () => {
    console.log(`Porta aberta em ${port}`);
});