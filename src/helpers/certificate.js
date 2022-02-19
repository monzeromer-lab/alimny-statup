const PDFdocument = require("pdfkit")
const fs = require("fs")

class Certificate {
    constructor(title, creator, code) {
        this.Title = title
        this.Creator = creator
        this.Code = code
    }
    doc = new PDFdocument()
    generate() {


        let {
            Title = this.Title,
                Creator = this.Creator,
                // CreationDate = new Date().getDate(),
                Author = "Alimny"
        } = this.doc.info

        this.doc.text("sup", 11, 11).fontSize(188).fillColor("black", 8)

        return this

    }

    response(ExpressResponse) {
        try {
            this.doc.pipe(ExpressResponse)
            this.doc.end()
        } catch (error) {
            console.log(error)
        }

    }

    saveAndResponse(ExpressResponse) {
        try {
            this.doc.pipe(fs.createWriteStream(`./public/files/${this.Code}.pdf`))
            this.doc.pipe(ExpressResponse)
            this.doc.end()
        } catch (error) {
            console.log(error)
        }

    }

    save() {
        try {
            this.doc.pipe(fs.createWriteStream(`./public/files/${this.Code}.pdf`))
            this.doc.end()
        } catch (error) {
            console.log(error)
        }

    }

}

let sup = new Certificate("backend", "monzer", "r3i")
module.exports = Certificate