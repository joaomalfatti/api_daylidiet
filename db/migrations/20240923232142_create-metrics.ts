import type { Knex } from "knex";

// Function to apply migrations (create the 'metrics' table)

export async function up(knex: Knex): Promise<void> {
  try{
    //Table metrics
    await knex.schema.createTable('metrics', (table) => {
      table.uuid('id').primary();
      table.uuid('users_id').notNullable().references('id').inTable('users').onDelete('CASCADE'); //Foreign key referencing the 'user' table
      table.integer('total_meals').defaultTo(0).notNullable();// Total meals, starting at 0
      table.integer('total_in_diet').defaultTo(0).notNullable();// Total meals in diet, starting at 0
      table.integer('total_off_diet').defaultTo(0).notNullable();// Total meals off diet, starting at 0
      table.integer('date_update').defaultTo(knex.fn.now()).notNullable(); // Timestamp for the las update
    })
  }
  catch (error) {
    console.error(" Error creating tables: ",error);
    throw error; // Rethrow the error to ensure migration fails if there's an issue
  }
}

//Function to revert migrations (drop the 'metrics' tables)
export async function down(knex: Knex): Promise<void> {
  try{
    await knex.schema.dropTableIfExists('metrics');
  }
  catch (error) {
    console.error(" Error dropping tables: ",error);
    throw error; // Rethrow the error to ensure migration fails if there's an issue
  }
}


