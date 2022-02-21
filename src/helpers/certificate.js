const PDFdocument = require("pdfkit")
const fs = require("fs")

class Certificate {
    constructor(title, creator, code) {
        this.Title = title
        this.Creator = creator
        this.Code = code
    }

    doc = new PDFdocument({
        autoFirstPage: false,
        permissions: {
            modifying: false,
            documentAssembly: false
        }
    })

    generate() {

        // is there's a better way of doing this instead of this waste of memory?
        let {
            Title = this.Title,
                Creator = this.Creator,
                CreationDate = new Date().getFullYear(),
                Author = "Alimny"
        } = this.doc.info
        

        this.doc.addPage({
            layout: "landscape",
        })

        this.doc.on("pageAdded", () => {
            this.doc.text("sup how r u?", 11, 11).fontSize(188).fillColor("black", 8)
            this.doc.image("../../public/images/alimnyCert.png")
        })


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
            this.doc.pipe(fs.createWriteStream(`../../public/files/${this.Code}.pdf`))
            this.doc.end()
        } catch (error) {
            console.log(error)
        }

    }

}

let sup = new Certificate("backend", "monzer", "r3i").generate().save()
module.exports = Certificate