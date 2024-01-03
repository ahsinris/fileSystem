const fs = require('fs')
const ExcelJS = require('exceljs');

class CoreFunctions {
    readfile(file) {
        // console.log('Indide fn')
        // console.log("ddd", file)
        return new Promise((resolve, rejects) => {
            fs.readFile(file, 'utf-8', (err, result) => {
                if (err) {
                    rejects(err)
                } else {
                    resolve(result)
                }
            })


        })

    }

    writeFile(file, content) {
        return new Promise((resolve, rejects) => {
            fs.writeFile(file, content, 'utf-8', (err, data) => {
                if (err) {
                    rejects(err)
                } else {
                    resolve(data)
                }
            })
        })

    }



    formatconverter(data) {


        let result = {};

        let uniqueLines = data.split("\n");


        for (let i = 0; i < uniqueLines.length; i++) {

            let urlValues = uniqueLines[i].split(",");
            // console.log(urlValues)

            let baseUrl = urlValues[0].split('=')[0]
            // console.log(baseUrl)


            for (let i = 0; i < urlValues.length; i++) {


                // let values = urlValues[i]
                // console.log(values[0])

                let equal;
                if (i == 0 && urlValues[i].length > 1) {
                    equal = urlValues[i].split('=')

                    // if (!equal[1]) console.log(urlValues[i], i)

                    equal[1] = equal[1] ? equal[1].split(':')[1] : 0
                }

                else
                    if (urlValues[i].length > 1) equal = urlValues[i].split(':')


                if (result[baseUrl]) {
                    if (baseUrl == equal[0])
                        result[baseUrl].sum = Number(result[baseUrl].sum) + Number(equal[1])
                    if (baseUrl != equal[0]) {
                        if (result[baseUrl].domains[equal[0]]) {
                            result[baseUrl].domains[equal[0]].sum = Number(result[baseUrl].domains[equal[0]].sum) + Number(equal[1])
                        }
                        else {
                            result[baseUrl].domains[equal[0]] = { sum: Number(equal[1]) }
                        }
                    }


                }
                else {
                    if (baseUrl == equal[0] && equal.length > 1) {
                        result[baseUrl] = { sum: Number(equal[1]), domains: {} }
                    }
                }

            }
        }
        return result

    }

    htmlReportGenarator(result) {
        let table = `
        <HTML>
        <table>
        <tr>
             <style>
          th{
            border: 1px solid black;
            background-color:yellow;
            padding:20px ;
            font-size:30px
          }
          td {
            border: 1px solid black;
            text-align:center;
            font-size:25px
          }
          table{
            width:100%;
            background-color:blue;
            border :1px  solid red;
          }
             </style>
             <th>SI.NO</th>
            <th>LIBRARYURL</th>
            <th>DOCCOUNT</th>
            <th>SUBDOMAINS</th>
        </tr>
        `;
        let i = 1;

        for (let r in result) {
            table += `<tr>`;
            table += `<td>${i++}</td>`
            table += `<td>` + r + `</td>`;
            table += `<td>` + result[r].sum + `</td>`;
            table += `<td>`;

            for (let d in result[r].domains) {

                table += d + ' :' + result[r].domains[d].sum + '<br>';
            }
            table += `</td>`;
            table += `</tr>`;
        }
        table += `</table>
            </body>
            </HTML>`;

        return table
    }

    // csvReportGenrator(result) {

    //     let csv = `SI.NO,LIBRARYURL,DOCCOUNTS,SUBDOMAINS\n`
    //     let i = 1

    //     for (let r in result) {


    //         csv += `${i++}, ${r}, ${result[r].sum}, `

    //         for (let d in result[r].domains) {

    //             csv += `${d}:${result[r].domains[d].sum} `
    //         }
    //         csv += `\n`

    //     }
    //     return csv

    // }


    csvReportGenrator(result) {

        let csv = `SI.NO,LIBRARYURL,DOCCOUNTS`;
        const libraryUrls = Object.keys(result)
        // console.log(libraryUrls)

        let rules = new Set()
        libraryUrls.forEach(url => {
            const domains = Object.keys(result[url].domains)
            domains.forEach(rule => {
                rules.add(rule)
            })
        })
        rules = Array.from(rules)

        rules.forEach(rule => {
            csv += `,${rule}`
        })

        csv += `\n`
        libraryUrls.forEach((url, i) => {

            const library = result[url]
            csv += `${i++},${url},${library.sum}`
            rules.forEach(rule => {
                csv += `,${library.domains[rule]?.sum || 0}`
            })
            csv += `\n`
        })
        return csv
    }

    // async excelReportGenrator(result) {

    //     const workBook = new ExcelJS.Workbook()

    //     const workSheet = workBook.addWorksheet('report')

    //     workSheet.columns = [
    //         {
    //             header: 'LIBRARYURL', width: 80
    //         },
    //         {
    //             header: 'DOCCOUNT', width: 10
    //         },
    //         {
    //             header: 'SUBDOMAINS', width: 300
    //         }
    //     ]
    //     let subdomains = ''
    //     let i = 1;
    //     let resultData = []
    //     for (let r in result) {

    //         for (let d in result[r].domains) {
    //             subdomains += `${d} : ${result[r].domains[d].sum}`
    //         }

    //         resultData.push([r, result[r].sum, subdomains])
    //     }

    //     workSheet.addRows(resultData)

    //     // return workBook
    //     await workBook.xlsx.writeFile(`exceljs3.xlsx`)

    // }

    async excelReportGenrator(result) {

        const workBook = new ExcelJS.Workbook()

        const workSheet = workBook.addWorksheet('report')

        let headerColumns = [
            { header: 'LIBRARYURL', width: 80 },
            { header: `DOCOUNT`, width: 10 },
        ]

        let rules = new Set()

        for (let url in result) {
            for (let rule in result[url].domains) {
                rules.add(rule)
            }
        }

        rules = Array.from(rules)
        rules.forEach(rule => {
            headerColumns.push({
                header: rule,
                width: 15,
            })
        })
        workSheet.columns = headerColumns


        let resultData = []

        let rowNumber = 1

        for (let url in result) {
            let library = result[url]
            let rowData = {
                libraryUrl: url,
                docCounts: library.sum
            }
            for (let rule in rules) {
                rowData[rule] = library.domains[rule]?.sum || 0
            }
            resultData.push(rowData)
            rowNumber++
        }

        workSheet.addRows(resultData)

        await workBook.xlsx.writeFile(`excelReport.xlsx`)


    }
}








module.exports = new CoreFunctions()