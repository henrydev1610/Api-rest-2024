
exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id");
    table.text("text");
    table.text("description");
    table.interger("user_id").references("id").inTable("users");
});
  


exports.down = knex => knex.schema.dropTable("notes");