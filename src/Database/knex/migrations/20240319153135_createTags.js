
exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.integer("user_id").references("id").inTable("users");
   
    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  
  


})

exports.down = knex => knex.schema.dropTable("tags")

// depois de montar a migrate, "igual" a que está em sqlite, executar o comando abaixo
// npx knex migrate:latest -> par arodar a migration no banco de dados 


