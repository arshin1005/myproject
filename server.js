var express = require('express');
var bp = require('body-parser'); // For post data
var _ = require('underscore');

var app = express();
app.use(bp.json()); // For post data


app.use(express.static('public'));
var nextId = 1;
var todoTask = [
    {
        description: 'Go to office in morning',
        completed: true
    },
    {
        description: 'seeing a movie',
        completed: false
    },
    {
        description: 'Going for lunch',
        completed: true
    }
]

app.get('/getmytasks', function (req, res) {
    res.json(todoTask);
});

app.get('/getmytasks/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);

    //var matchedTodo;
    //todoTask.forEach(function (todo) {
    //    if (todoId === todo.id) {
    //        matchedTodo = todo;
    //    }
    //});
    var matchedTodo=_.findWhere(todoTask,{id:todoId}); // instead of above commented lines

    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
});

app.post('/postmytasks', function (req, res) {
    var data = req.body;
    data.id = nextId++;
    todoTask.push(data);
    res.json(data);
});

app.delete('/deletedata/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todoTask, { id: todoId });
    if (!matchedTodo) {
        res.status(404).json({"error":"id not found"});
    } else {
        todoTask = _.without(todoTask, matchedTodo);
        res.json(matchedTodo);
    }
});

app.listen(3000, function () {
    console.log('Server is running');
});
