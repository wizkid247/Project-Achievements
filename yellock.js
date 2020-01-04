const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'COMP322-Yellock';
const client = new MongoClient(url);


router.get('/', function (req, res) {
    res.send('Goofy')
});
router.post('/', function (req, res) {
    res.send('Got a POST request')
});


/************************************************************************************************************/
// class route
router.get('/class', function (req, res) {
    client.connect(function (err) {
        if (err) throw err;
        const db = client.db(dbName);
        var cT = req.query.classTitle;
        var cId = req.query.classId;
        var cursor;
        if (Object.keys(cT).length === 0 && Object.keys(cId).length === 0) {
            console.log("You need input in the form");

        } else if (Object.keys(cT).length > 0 || Object.keys(cId).length > 0) {

            if (Object.keys(cT).length > 0 && Object.keys(cId).length === 0) {
                cursor = {classTitle: cT};
            } else if (Object.keys(cId).length > 0 && Object.keys(cT).length === 0) {
                cursor = {classId: cId};
            } else {
                cursor = {
                    classTitle: cT,
                    classId: cId
                }
            }
            db.collection("class").find(cursor, {projection: {"_id": 0}}).toArray(function (err, result) {
                if (err) throw err;
                if (result.length > 0) {
                    console.log("Found Document(s)");
                    console.log(result);
                    res.send(result);
                } else {
                    console.log("Don't exist in the DB");
                    res.send(result);

                }
            });
        }
    });
});
/************************************************************************************************************/

router.post('/class', function (req, res) {

    var postObj = req.body;
    client.connect(function (err, client) {
        if (err) throw err;
        const db = client.db(dbName);
        db.collection("class").insertOne(postObj, function (err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            res.send(result);
        });
    });
});

/************************************************************************************************************/
router.put('/class', function (req, res) { // PUT
    var use = req.body.classId;
    client.connect(function (err) {
        if (err) throw err;
        const db = client.db(dbName);
        const query = {classId: use};
        const newvalues = {
            $set: {
                classTitle: req.body.classTitle,
                classSch: req.body.classSch,
                classDes: req.body.classDes,
                classCred: req.body.classCred,
            }
        };
        db.collection("class").updateOne(query, newvalues, function (err, result) {
            if (err) throw err;
            console.log("1 document updated");
            res.send(result);
            console.log(result);
        });
    });
});
/************************************************************************************************************/
router.delete('/class', function (req, res) { // Delete
    client.connect(function (err) {
        if (err) throw err;
        const db = client.db(dbName);
        const query = {
            classTitle: req.body.classTitle
        };
        db.collection("class").deleteMany(query, function (err, result) {
            if (err) throw err;
            console.log("Document(s) deleted");
            res.send(result);
        });
    });
});
/************************************************************************************************************/
// student route
router.get('/student', function (req, res) {
    client.connect(function (err) {
        if (err) throw err;
        const db = client.db(dbName);
        var name = req.query.studentName;
        var ident = req.query.studentId;
        var cursor;
        if (Object.keys(name).length === 0 && Object.keys(ident).length === 0) {
            console.log("You need input in the form");

        } else if (Object.keys(name).length > 0 || Object.keys(ident).length > 0) {

            if (Object.keys(name).length > 0 && Object.keys(ident).length === 0) {
                cursor = {studentName: name};
            } else if (Object.keys(ident).length > 0 && Object.keys(name).length === 0) {
                cursor = {studentId: ident};
            } else {
                cursor = {
                    studentName: name,
                    studentId: ident
                }
            }
            db.collection("student").find(cursor, {projection: {"_id": 0}}).toArray(function (err, result) {
                if (err) throw err;
                if (result.length > 0) {
                    console.log("Found Document(s)");
                    console.log(result);
                    res.send(result);
                } else {
                    console.log("Don't exist in the DB");

                }
            });
        }
    });
});
/************************************************************************************************************/

router.post('/student', function (req, res) {

    var postObj = req.body;
    client.connect(function (err, client) {
        if (err) throw err;
        const db = client.db(dbName);
        db.collection("student").insertOne(postObj, function (err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            res.send(result);
        });
    });
});

/************************************************************************************************************/
router.put('/student', function (req, res) { // PUT
    var use = req.body.studentId;
    client.connect(function (err) {
        if (err) throw err;
        const db = client.db(dbName);
        const query = {studentId: use};
        const newValues = {
            $set: {
                studentName: req.body.studentId,
                studentLast: req.body.studentLast,
                mailAddy: req.body.mailAddy,
                phoneNum: req.body.phoneNum,
                studentEmail: req.body.studentEmail,
            }
        };
        db.collection("student").updateOne(query, newValues, function (err, result) {
            if (err) throw err;
            console.log("1 document updated");
            res.send(result);
        });
    });
});
/************************************************************************************************************/
router.delete('/student', function (req, res) { // Delete
    client.connect(function (err) {
        if (err) throw err;
        const db = client.db(dbName);
        var objName = req.body;
        var query;
        if (objName.studentName === "" && objName.studentId === "") {
            console.log("You need input in the form");
        }else if (objName.studentName !== "" || objName.studentId !== ""){
            console.log("cool");
              if (objName.studentName !== "" && objName.studentId === "") {
                    query = {studentName:objName.studentName};
                } else if (objName.studentId !== "" && objName.studentName === "") {
                    query = {studentId: objName.studentId};
                } else {
                    query = {
                        studentName: objName.studentName,
                        studentId: objName.studentId
                    }
                }
                db.collection("student").deleteMany(query, function (err, result) {
                    if (err) throw err;
                    console.log("Document(s) deleted");
                    res.send(result);
                });
        }
    });
});
/************************************************************************************************************/

module.exports = router;