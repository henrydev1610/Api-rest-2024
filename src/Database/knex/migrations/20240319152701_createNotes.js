exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id");
    table.text("title")
    table.text("description")
    table.integer("user_id").references("id").inTable("users")
    
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
  
})

exports.down = knex => knex.schema.dropTable("notes")


// depois de montar a migrate, "igual" a que está em sqlite, executar o comando abaixo
// npx knex migrate:latest -> par arodar a migration no banco de dados