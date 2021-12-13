exports.up = function (knex) {
    return knex.schema.createTableIfNotExists('sessions', (table) => {
        table.increments('id').primaryKey;
        table.string('session_name');
        table.string('deck');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('sessions');
};
