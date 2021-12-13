const express = require('express')
const app = express()
const port = process.env.PORT || 9000
const queries = require('./queries')
const multer = require('multer');
const upload = multer();
const cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(upload.array());
app.use(express.static('public'));
app.use(cors())


app.get('/session/:sessionId', function (req, res) {
    queries.getSession(req.params.sessionId).then(response => res.json(response));
})

app.post('/session', function (req, res) {
    let session = '';
    let user_id = '';
    queries.createSession(req.body).then(data => {
        session = data[0];
        const user = {
            'name': 'Admin',
            'role': 'admin',
            'session_id': session
        }
        queries.addMember(user).then(data => {
            user_id = data[0]
            const response = {
                'id': user_id,
                'role': 'admin',
                'sessionId': session
            }
            res.send(response);
        })
    });
})

app.get('/session/:sessionId/members', function (req, res) {

    queries.getMembers(req.params.sessionId).then(data => res.json(data))
});

app.get('/session/:sessionId/stories', function (req, res) {
    queries.getStories(req.params.sessionId).then(data => {
        res.json(data)
    })
});

app.post('/session/:sessionId/join', function (req, res) {
    const addUser = {
        'name': req.body.username,
        'session_id': req.params.sessionId,
        'role': 'viewer'
    }
    queries.addMember(addUser).then(data => {
        res.json({'id': data[0], 'session_id': req.params.sessionId, 'role': 'viewer'})
    })
})

app.post('/session/:sessionId/stories', function (req, res) {
    const addStory = {
        'story_name': req.body.storyName,
        'description': req.body.storyDescription,
        'session_id': req.params.sessionId
    }
    queries.addStory(req.params.sessionId, addStory).then(data => {
        res.json(data);
    });
})

app.post('/session/:sessionId/stories/:storyId', function (req, res){
    queries.updateStory(req.params.sessionId, req.params.storyId, req.body).then(data => {
        res.json(data);
    })
});

app.post('/session/:sessionId/stories/:storyId', function (req, res) {

})

app.delete('/session/:sessionId', function (req, res) {
    queries.deleteSession(req.params.sessionId).then(data => {
        res.json({'message': 'session deleted'});
    })
})

app.get('/session/:sessionId/members/:memberId', function (req, res) {
    queries.getMember(req.params.sessionId, req.params.memberId).then(data => {
        res.json(data);
    })
})
app.listen(port, () => console.log(`listening on port: ${port}`))
