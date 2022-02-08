const Course = require('../models/4-course');

module.exports = class CourseServices {
	// get all Courses
	static async getCourses() {
		try{
			const courses = await Course.findAll();
			return courses;
		}catch(error) {
			console.log(error);
		}
	}

	// get a single Course
	static async getCourse(courseId) {
		try{
			const course = await Course.findByPk(courseId);
			if(!course) {
				console.log('no Course with that id');
				return false;
			}
			return course;
		}catch(error) {
			console.log(error);
		}
	}

	//store a Course
	static async store(data) {
		try{
			const course = await Course.create(data);
			return Course;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Course
	static async update(courseId,data) {
		try{
			console.log(data)
			const oldCourse = await Course.findByPk(courseId)
			if(!oldCourse) {
				return  false;
			}
			const updatedCourse = await oldCourse.update(data);
			return updatedCourse;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Course
	static async delete(courseId) {
		try{
			const course = await Course.findByPk(courseId);
			console.log(course)
			if(!course) {
				return false;
			}
			await course.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}
	
}