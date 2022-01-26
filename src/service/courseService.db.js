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

function student_learnQuery(list, course_id) {
    let temp = ""
    for (let index = 0; index < list.length; index++) {
        if (index < list.length - 1)
            temp += `("${list[index].body}", ${course_id}), `
        else
            temp += `("${list[index].body}", ${course_id})`
    }
    return temp
}

function course_requiermentsQuery(list, course_id) {
    let temp = ""
    for (let index = 0; index < list.length; index++) {
        if (index < list.length - 1)
            temp += `("${list[index].body}", ${course_id}), `
        else
            temp += `("${list[index].body}", ${course_id})`
    }
    return temp
}

module.exports.createCourse = async function (body, user_id) {
    let {
        category,
        sub_category,
        course_name,
        price,
        level,
        salutatory_msg,
        congratulate_msg,
        badge,
        description
    } = body

    let sql = ` INSERT INTO course (user_id, category_id, subcategory, name, level, description, status, price, badge, congratulate_msg, salute_msg) values
  (${user_id}, ${category}, ${sub_category}, "${course_name}", "${level}", "${description}", 0, ${price}, "${badge}", "${congratulate_msg}", "${salutatory_msg}")`

    try {
        let [state, fields] = await database.execute(sql)
        return state
    } catch (error) {
        throw new Error(error)
    }

}

module.exports.createCoupon = async function ({
    course_id,
    code,
    discount_per,
    exp
}) {
    try {
        let [state, fields] = await database.execute(`INSERT INTO coupon (course_id, code, discount_per, exp) VALUES (${course_id}, "${code}", ${discount_per}, "${exp}")`)
        return state

    } catch (error) {
        throw new Error(error)
    }
}

module.exports.studentWill_learn = async function (stuff, courseId) {
    try {
        let [state, fields] = await database.execute(`INSERT INTO studentwilllearn (body, course_id) VALUES ${student_learnQuery(stuff, courseId)}`)
        return state

    } catch (error) {
        throw new Error(error)
    }
}

module.exports.course_req = async function (stuff, courseId) {
    try {
        let [state, fields] = await database.execute(`INSERT INTO courserequirements (body, course_id) VALUES ${course_requiermentsQuery(stuff, courseId)}`)
        return state

    } catch (error) {
        throw new Error(error)
    }
}

module.exports.postIntro = async function(intro_path, course_id){
    try {
        let [state, fields] = await database.execute(`UPDATE course SET intro = "${intro_path}" WHERE id = ${course_id}`)
        return state

    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getCourseOwner = async function(course_id){
    try {
        let [state, fields] = await database.execute(`SELECT user_id FROM course WHERE id = ${course_id}`)
        return state

    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getCourseIntro = async function(course_id){
    try {
        let [state, fields] = await database.execute(`SELECT intro FROM course WHERE id = ${course_id}`)
        return state

    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getCourseCover = async function(course_id){
    try {
        let [state, fields] = await database.execute(`SELECT cover FROM course WHERE id = ${course_id}`)
        return state

    } catch (error) {
        throw new Error(error)
    }
}

module.exports.updateCourseCover = async function(intro_path, course_id){
    try {
        let [state, fields] = await database.execute(`UPDATE course SET cover = "${intro_path}" WHERE id = ${course_id}`)
        return state

    } catch (error) {
        throw new Error(error)
    }
}