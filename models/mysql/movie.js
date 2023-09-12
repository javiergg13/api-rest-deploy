import myswl from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'XXXX',
  password: 'XXXX',
  database: 'XXXX'
}

const connection = await myswl.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate from movie;'
    )

    return movies
  }

  static async getById({ id }) {

  }

  static async create({ input }) {

  }

  static async delete({ id }) {

  }

  static async update({ id, input }) {

  }
}
