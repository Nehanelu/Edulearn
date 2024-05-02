exports.courseEnrollmentEmail = (courseName, name) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
    <h1>
    Congratulation ${name}, you are successfully enrolled in ${courseName} course
    </h1>
    </body>
    </html>`
}