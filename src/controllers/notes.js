const noteServices = require('../services/note.services');


exports.getNotes = async (req,res,next) => {
	try {
		const notes = await noteServices.getNotes(req.params.lectureId);
		res.status(200).json({ success:true, data: notes })
	}catch(error) {
		console.log(error)
	}
}

exports.getNote = async (req,res,next) => {
	try {
		const note = await noteServices.getNote(req.params.id);
		res.status(200).json({ success:true, data: note })
	}catch(error) {
		console.log(error)
	}
}

exports.createNote = async (req,res,next) => {
	try {
		req.body.LectureId = req.params.lectureId
		req.body.userId = req.user.id
		const note = await noteServices.store(req.body);
		res.status(200).json({ success:true, data: note })
	}catch(error) {
		console.log(error)
	}
}


exports.updateNote = async (req,res,next) => {
	try {
		const note = await noteServices.update(req.params.id,req.body);
		res.status(200).json({ success:true, data: note })
	}catch(error) {
		console.log(error)
	}
}

exports.deleteNote = async (req,res,next) => {
	try {
		await noteServices.delete(req.params.id);
		res.status(200).json({ success:true })
	}catch(error) {
		console.log(error)
	}
}