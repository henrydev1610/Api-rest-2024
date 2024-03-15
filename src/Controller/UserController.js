const { hash, compare } = require("bcryptjs");
const AppError = require("../Utils/AppError");
const sqlConnection = require("../Database/sqlite");

class userController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await sqlConnection();
    const checkOutUsers = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkOutUsers) {
      throw new AppError("Este Email já está em uso! ");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password)VALUES(?,?,?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password} = req.body;
    const { id } = req.params;

    const database = await sqlConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuário nao encontrado");
    }

    const userUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userUpdatedEmail && userUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso.  ");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    //user.password = password

    if (password && !old_password) {
      throw new AppError(
        "você precisa informar a senha antiga para criar uma nova senha"
      );
    }
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("a senha antiga não confere.");
      }

      user.password = await hash(password, 8); 
      
   


     } 

    await database.run(
      `UPDATE users SET
        name = ?,
        email = ?, 
        password = ?,
        updated_at = DATETIME('now'),
        WHERE id = ? `,
      [user.name, user.email, user.password, id]
    );

    return res.json();
  }
}

module.exports = userController;
