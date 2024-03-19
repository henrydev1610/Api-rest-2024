
exports.up = knex => knex.schema.createTable("links", table => {
    table.increments("id");
    table.text("url").notNullable();
   
    table.integer("user_id").references("id").inTable("notes").onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now())
  


})

exports.down = knex => knex.schema.dropTable("links")


// depois de montar a migrate, "igual" a que está em sqlite, executar o comando abaixo
// npx knex migrate:latest -> par arodar a migration no banco de dados 