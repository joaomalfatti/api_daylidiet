import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  
  /* Users Table
        id: Unique users identifier (primary key).
        name: Users name.
        email: Users email (for login and identification).
        password: Password (stored securely).
  */

  //Error Handling
  try {
    //Up Table Users
    await knex.schema.createTable('users',(table) => {
      table.uuid('id').primary();
      table.string('name').notNullable(); // name is users
      table.string('mail').notNullable().unique(); // mail unic
      table.string('password').notNullable(); // password is users
    });
  }
  catch (error) {
    console.error(" Error create table: ",error);
    throw error;
  }
}


export async function down(knex: Knex): Promise<void> {
  //Drop table users
  try{
    await knex.schema.dropTableIfExists('users');
  }
  catch (error) {
    console.error(" Error drop tables: ",error);
    throw error;
  }
}

