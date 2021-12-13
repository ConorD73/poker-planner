const connection = require('./knexfile')[process.env.NODE_ENV || 'development']
const database = require('knex')(connection)

module.exports = {
    getAll() {
        return database('sessions');
    },

    getSession(sessionId) {
        return database('sessions').where('id', sessionId).first();
    },

    getMembers(sessionId) {
        return database('members').where('session_id', sessionId);
    },
    getStories(sessionId) {
        return database('stories').where('session_id', sessionId);
    },

    createSession(data) {
        return database('sessions').insert({
            session_name: data['sessionName'],
            deck: data['deck']
        }).then(function (result) {
            return result;
        })
    },

    addMember(data) {
        return database('members').insert({
            name: data['name'],
            role: data['role'],
            session_id: data['session_id']
        }).then(function (result) {
            return result;
        })
    },

    deleteSession(sessionId) {
        return database('sessions').where('id', sessionId).delete().then({
            if(data) {
                return database('members').where('session_id', sessionId).delete()
            }
        })

    },

    getMember(sessionId, memberId) {
        return database('members').where('session_id', sessionId).where('id', memberId).first();
    },

    addStory(sessionId, story) {
        return database('stories').insert({
            story_name: story['story_name'],
            description: story['description'],
            vote_count: '0',
            status: 'pending',
            session_id: story['session_id']
        }).then(data => {
            return database('stories').where('id', data[0]).first()
        })
    },

    updateStory(sessionId, storyId, story) {
        return database('stories').where('session_id', sessionId).where('id', storyId).update({
            story_name: story['storyName'],
            description: story['storyDescription'],
            status: story['status'],
        }).then(data => {
            console.log(data);
            return database('stories').where('id', storyId).first();
        })
    }

}
