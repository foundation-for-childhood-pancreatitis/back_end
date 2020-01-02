
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
              /** Your_story */
       .createTable("your_story",tbl=>{
           tbl.increments();
           tbl.string("email");
           tbl.string("name");
           tbl.string("phone_number")
           tbl. string("street_address")
            tbl.string("city")
            tbl.string("state")
            tbl.integer("zip_code")
            tbl.string("child_name");
            tbl.string("child_age");
            tbl.enu("cause",["PRSS1 Mutation or variant","SPINK1 Mutation or variant","CFTR (Cystic Fibrosis) Mutation",'Sphincter of Oddi Dysfunction'
                            , "Annular Pancreatitis", "Idiopathic Pancreatitis",'Injury to Pancreas','Other' ])
             tbl.string('other');
             tbl.string('diagnosis_date');
             tbl.enu("other_diagnoses",['Lactose Intolerance','Constipation','Flu or other virus bug','Gluten Intolerance','Acid Reflux','Gallbladder Dysfunction','IBS','Other'])
              tbl.string('other_diagnoses_2');
              tbl.text("story",5000);
              tbl.boolean('approved').defaultsTo(false)
       })

  )}
     
exports.down = function(knex) {
   return ( 
       knex.schema
       .dropTableIfExists('your_story')
       .dropTableIfExists("mailing_list")
       .dropTableIfExists("donations")
       .dropTableIfExists("admin") )
   
   }
   
