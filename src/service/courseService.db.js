const database = require("../database/connection")

// [
//     'category_id',
//     'subcategory', 'cover',
//     'intro',       'name',
//     'description', 'level',
//     'price',       'status',
//     'badge',       'congratulate_msg',
//     'salute_msg'
//   ]

module.exports.createCourse = async function({category_id, subcategory, name, level, description, status, price, badge, congratulate_msg, salute_msg}, user_id){
 let sql = ` INSERT INTO course (user_id, category_id, subcategory, name, level, description, status, price, badge, congratulate_msg, salute_msg) values
  (${user_id}, ${category_id}, ${subcategory}, "${name}", "${level}", "${description}", ${status}, ${price}, "${badge}", "${congratulate_msg}", "${salute_msg}")`
 
    try {
       let [state, fields] = await database.execute(sql)
       return state
    } catch (error) {
        throw new Error(error)
    }
    
}
