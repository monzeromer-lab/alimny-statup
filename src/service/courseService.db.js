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

module.exports.createCourse = async function({category_id, cover_path, subcategory, name, level, intro_path, description, status, price, badge, congratulate_msg, salute_msg}){
 let sql = ` INSERT INTO course (category_id, cover, subcategory, name, level, intro, description, status, price, badge, congratulate_msg, salute_msg) values
  (${category_id}, "${cover_path}", ${subcategory}, "${name}", "${level}", "${intro_path}", "${description}", ${status}, ${price}, "${badge}", "${congratulate_msg}", "${salute_msg}")`
 
    try {
       let [state, fields] = await database.execute(sql)
       return state
    } catch (error) {
        throw new Error(error)
    }
    
}
