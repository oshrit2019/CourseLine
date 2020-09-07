const createError = require('http-errors');
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const branchesRouter = require('./routes/branches');
const coursesRouter = require('./routes/courses');

app.use(bodyParser.json());


app.use(cors());
//app.use(router);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/modules", express.static('node_modules'));

app.use("/", express.static(path.join(__dirname, "client", "build")));
app.use("/SignUp", express.static(path.join(__dirname, "client", "build")));
app.use("/SignIn", express.static(path.join(__dirname, "client", "build")));
app.use("/Join/*", express.static(path.join(__dirname, "client", "build")));
app.use("/chat", express.static(path.join(__dirname, "client", "build")));
app.use("/Market/*", express.static(path.join(__dirname, "client", "build")));
app.use("/Cart/*", express.static(path.join(__dirname, "client", "build")));
app.use("/AboutUs/*", express.static(path.join(__dirname, "client", "build")));
app.use("/ContactUs/*", express.static(path.join(__dirname, "client", "build")));
app.use("/Users/*", express.static(path.join(__dirname, "client", "build")));
app.use("/SavedItems/*", express.static(path.join(__dirname, "client", "build")));
app.use("/Branches/*", express.static(path.join(__dirname, "client", "build")));
app.use("/SignOut/*", express.static(path.join(__dirname, "client", "build")));
app.use("/Courses/*", express.static(path.join(__dirname, "client", "build")));
app.use("/Gallery/*", express.static(path.join(__dirname, "client", "build")));
app.use("/GoogleMaps/*", express.static(path.join(__dirname, "client", "build")));

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', branchesRouter);
app.use('/', coursesRouter);


io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
});

app.listen(8080, function() {
    console.log('Listening on port 8080!');
});
module.exports = app;
