import { Model } from 'objection'
import knex from '../config/database'

Model.knex(knex)

class User extends Model {
  static get tableName() {
    return 'users'
  }
}

// static get relationMappings() {
//   return {
//     articles: {
//       relation: Posts.HasManyRelation,
//       modelClass: Posts,
//       join: {
//         from: 'users.id',
//         to: 'Posts.user_id'
//       }
//     }
//   }
// }

export default User