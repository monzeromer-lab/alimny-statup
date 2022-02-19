const Note = require('../models/913-Note');

module.exports = class NoteServices {
	// get all Notes
	static async getNotes(lectureId) {
		try {
			const Notes = await Note.findAll({
				where: {
					lectureId: lectureId
				}
			});
			return Notes;
		} catch (error) {
			console.log(error);
		}
	}

	// get a single Note
	static async getNote(NoteId) {
		try {
			const note = await Note.findByPk(NoteId);
			if (!note) {
				console.log('no Note with that id');
				return false;
			}
			return note;
		} catch (error) {
			console.log(error);
		}
	}

	//store a Note
	static async store(data) {
		try {
			const note = await Note.create(data);
			return note;
		} catch (error) {
			console.log(error);
		}
	}

	// update a Note
	static async update(NoteId, data) {
		try {
			const oldNote = await Note.findByPk(NoteId)
			if (!oldNote) {
				return false;
			}
			const updatedNote = await oldNote.update(data);
			return updatedNote;

		} catch (error) {
			console.log(error);
		}
	}

	// delete a Note
	static async delete(NoteId) {
		try {
			const note = await Note.findByPk(NoteId);
			if (!note) {
				return false;
			}
			await note.destroy();
			return true;
		} catch (error) {
			console.log(error);
		}
	}

}