import { Model } from 'objection'
import knex from '../config/database'

Model.knex(knex)

class Posts extends Model {
  static get tableName() {
    return 'Posts'
  }
}

export default Posts