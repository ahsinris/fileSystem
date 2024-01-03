const CoreFunctions = require('./utils/helper')

if (process.argv.length != 3) {
    // console.log(process.argv)
    console.log('structure: node app.js {"format":"html||css||excel","filePath":"pipeline.txt"}')
    process.exit(1)
}


try {

    const argument = process.argv.slice(2)

    const options = JSON.parse(argument)

    // console.log(options.filePath)

    if (!options.format || !options.filePath) {
        console.log("need to pass the format and filepath arguments in a json format")
        process.exit(1)
    }

    async function main() {

        const data = await CoreFunctions.readfile(options.filePath)
        // console.log('jjkk', data)
        const result = CoreFunctions.formatconverter(data)
        if (options.format == `html`) {

            const htmlReport = CoreFunctions.htmlReportGenarator(result)

            await CoreFunctions.writeFile('outputfile.html', htmlReport)

        }
        else if (options.format == `csv`) {

            const csvReport = CoreFunctions.csvReportGenrator(result)

            await CoreFunctions.writeFile('outputfile.csv', csvReport)



        }
        else if (options.format == `excel`) {

            const excelReport = await CoreFunctions.excelReportGenrator(result)
            // console.log(excelReport)

            // await excelReport.xlsx.writeFile('exceljs.xlsx')
        }



    }



    main()

}

catch (e) {
    console.log('----e---', e)
    process.exit(1)
}

// (async () => {
//     console.log('----fgfgfg----')
//     await main()
// })

