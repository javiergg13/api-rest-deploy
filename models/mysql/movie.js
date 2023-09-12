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
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
      )

      if (genres.length === 0) return []

      const [{ id }] = genres

      return []
    }

    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;'
    )

    return movies
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);', [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create({ input }) {
    const { title, year, director, duration, poster, rate, genre } = input

    const [uuidResult] = await connection.query('SELECT UUID();')
    const [{ uuid }] = uuidResult

    try {
      const result = await connection.query(
        'INSERT INTO movies (title, year, director, duration, poster, rate) VALUES (?, ?, ?, ?, ?, ?);', [title, year, director, duration, poster, rate]
      )

      console.log(result)
    } catch (error) {
      throw new Error('Error creating movie')
    }

    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);', [uuid]
    )

    return movies[0]
  }

  static async delete({ id }) {

  }

  static async update({ id, input }) {

  }
}
