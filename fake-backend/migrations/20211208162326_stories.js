exports.up = function (knex) {
    return knex.schema.createTableIfNotExists('stories', (table) => {
        table.increments('id').primaryKey;
        table.string('story_name');
        table.string('description');
        table.string('vote_count');
        table.string('status');
        table.string('session_id');
    })
};

exports.down = function (knex) {

};
