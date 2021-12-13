
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('members', (table) => {
        table.increments('id').primaryKey;
        table.string('name');
        table.string('role');
        table.string('session_id');
    })
};

exports.down = function(knex) {
  
};
