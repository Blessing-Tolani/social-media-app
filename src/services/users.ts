import { readFile } from 'fs/promises'
import users from '../../db/users.json'
const path = require('path')
require('dotenv').config()
const bcrypt = require('bcrypt')
const fs = require('fs').promises
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env
const usersFilePath = path.join(__dirname, '../../db/users.json')

const getUsers = async () => {
  const Users = JSON.parse(await fs.readFileSync(usersFilePath))
  return Users
}

const findUser = async (id: number, email: string) => {
  const Users: any = await getUsers()
  return Users.find((user) => user.id === id || user.email === email)
}

const authenticate = async (id: number, email: string, password: string) => {
  const user = await findUser(id, email)
  const isPasswordValid = bcrypt.compare(password, user.password)

  const token = jwt.sign(
    { id: user.id, JWT_SECRET },
    {
      expiresIn: 24 * 60 * 60,
    }
  )

  return { token }
}

module.exports = {
  getUsers,
  findUser,
}
