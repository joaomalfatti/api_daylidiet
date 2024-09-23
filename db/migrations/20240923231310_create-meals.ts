import type { Knex } from "knex";

// Function to create the 'meals' table in the database.
// This table stores information about users' meals.
export async function up(knex: Knex): Promise<void> {
  
  // Structure of the 'meals' table:
  // - id: unique identifier of the meal (UUID).
  // - user_id: reference to the user id (UUID), cannot be null.
  // - name: name of the meal, cannot be null.
  // - description: description of the meal, cannot be null.
  // - created_at: timestamp of the meal creation, defaults to the current time.
  // - inside_diet: boolean indicating whether the meal is within the user's diet.

  try{
    // Create Table meals
    await knex.schema.createTable('meals', (table) => {
      table.uuid('id').primary();
      table.uuid('users_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      table.boolean('inside_diet').notNullable();
    });
  }
  catch (error) {
    // if an error occurs while creating the table, log t he error and rethrow.
    console.error(" Error create table meals: ",error);
    throw error;
  }
}


export async function down(knex: Knex): Promise<void> {
  // Function to drop the 'meals' table from the database.
  // This operation is used during the migration rollback process.
  try {
    await knex.schema.dropTableIfExists('meals');
  } catch (error) {
    // if an error occurs while removing the table, log the error and rethrow.
    console.error("Error dropping table meals: ", error);
    throw error;
  }
}

