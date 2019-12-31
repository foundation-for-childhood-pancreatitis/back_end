
exports.up = function(knex) {
  return (
      knex.schema
      // Admin Table
      .createTable("admin",tbl =>{
          tbl.increments();
          tbl.string('name');
          tbl.string('email').unique();
          tbl.string('password')
      })
      
      // Donations Table

      .createTable("donations",tbl =>{
          tbl.increments();
          tbl.string("name");
          tbl.string("email");
          tbl.integer("amount");
          tbl.boolean("onLine").defaultsTo(true);
          tbl.string("stripe_id");
          tbl.string("date");
      })
      
      // Mailing List Table

      .createTable("mailing_list",tbl => {
          tbl.increments();
          tbl.string("email");
          tbl.string("name")
      })
  )
};

exports.down = function(knex) {
   return (
       dropTableIfExists("mailing_list"),
       dropTableIfExists("donations"),
       dropTableIfExists("admin")

   )
};
