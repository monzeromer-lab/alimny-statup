const noteServices = require('../services/note.services');
const asyncHandler = require('../middleware/async')

exports.getNotes = asyncHandler(async (req, res, next) => {
	const notes = await noteServices.getNotes(req.params.lectureId);
	res.status(200).json({
		success: true,
		data: notes
	})
});

exports.getNote = asyncHandler(async (req, res, next) => {
	const note = await noteServices.getNote(req.params.id);
	res.status(200).json({
		success: true,
		data: note
	})
});

exports.createNote = asyncHandler(async (req, res, next) => {
	req.body.LectureId = req.params.lectureId
	req.body.userId = req.user.id
	const note = await noteServices.store(req.body);
	res.status(200).json({
		success: true,
		data: note
	})
});


exports.updateNote = asyncHandler(async (req, res, next) => {
	const note = await noteServices.update(req.params.id, req.body);
	res.status(200).json({
		success: true,
		data: note
	})
});

exports.deleteNote = asyncHandler(async (req, res, next) => {
	await noteServices.delete(req.params.id);
	res.status(200).json({
		success: true
	})
});