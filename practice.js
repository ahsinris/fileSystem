// const fs = require('fs/promises')

// async function readFile(file) {
//     try {

//         const data = await fs.readFile(file, 'utf-8')
//         return data
//     }
//     catch (e) {
//         throw e
//     }
// }


// function formatconverter() {
//     const data = fs.readFileSync('pipeline.txt', 'utf-8')

//     let result = {};

//     let uniqueLines = data.split("\n");


//     for (let i = 0; i < uniqueLines.length; i++) {

//         let urlValues = uniqueLines[i].split(",");
//         // console.log(urlValues)

//         let baseUrl = urlValues[0].split('=')[0]
//         // console.log(baseUrl)


//         for (let i = 0; i < urlValues.length; i++) {


//             // let values = urlValues[i]
//             // console.log(values[0])

//             let equal;
//             if (i == 0 && urlValues[i].length > 1) {
//                 equal = urlValues[i].split('=')

//                 // if (!equal[1]) console.log(urlValues[i], i)

//                 equal[1] = equal[1] ? equal[1].split(':')[1] : 0
//             }

//             else
//                 if (urlValues[i].length > 1) equal = urlValues[i].split(':')

//             // console.log(equal[0])

//             // console.log(equal.length)
//             // let value2

//             // if (equal.length > 2) {
//             //     if (equal[1] && typeof (equal[1] === 'string')) {

//             //         value2 = equal[1].split(':')[1]

//             //     }

//             // }


//             // console.log(value2)

//             if (result[baseUrl]) {
//                 if (baseUrl == equal[0])
//                     result[baseUrl].sum = Number(result[baseUrl].sum) + Number(equal[1])
//                 if (baseUrl != equal[0]) {
//                     if (result[baseUrl].domains[equal[0]]) {
//                         result[baseUrl].domains[equal[0]].sum = Number(result[baseUrl].domains[equal[0]].sum) + Number(equal[1])
//                     }
//                     else {
//                         result[baseUrl].domains[equal[0]] = { sum: Number(equal[1]) }
//                     }
//                 }


//             }
//             else {
//                 if (baseUrl == equal[0] && equal.length > 1) {
//                     result[baseUrl] = { sum: Number(equal[1]), domains: {} }
//                 }
//             }

//         }
//     }
//     return result

// }

// console.log(JSON.stringify(formatconverter()))

// // const fs = require('fs/promises')

// // async function read(file) {
// //     try {
// //         const data = await fs.readFile(file, 'utf-8')
// //         return data
// //     }
// //     catch (e) {
// //         throw e
// //     }
// // }

// // async function main(file) {
// //     const data = await read(file)
// //     return data
// // }
// // main('pipeline.txt').then(data => {
// //     console.log(data)
// // })
// //     .catch(e => {
// //         console.log("error", e)
// //     })

// function formatconverter() {
//     const data = fs.readFileSync('pipeline.txt', 'utf-8')

//     let result = {};

//     let uniqueLines = data.split("\n");


//     for (let i = 0; i < uniqueLines.length; i++) {

//         let urlValues = uniqueLines[i].split(",");
//         // console.log(urlValues)

//         let baseUrl = urlValues[0].split('=')[0]
//         // console.log(baseUrl)


//         for (let i = 0; i < urlValues.length; i++) {


//             // let values = urlValues[i]
//             // console.log(values[0])

//             let equal;
//             if (i == 0 && urlValues[i].length > 1) {
//                 equal = urlValues[i].split('=')

//                 // if (!equal[1]) console.log(urlValues[i], i)

//                 equal[1] = equal[1] ? equal[1].split(':')[1] : 0
//             }

//             else
//                 if (urlValues[i].length > 1) equal = urlValues[i].split(':')

//             // console.log(equal[0])

//             // console.log(equal.length)
//             // let value2

//             // if (equal.length > 2) {
//             //     if (equal[1] && typeof (equal[1] === 'string')) {

//             //         value2 = equal[1].split(':')[1]

//             //     }

//             // }


//             // console.log(value2)

//             if (result[baseUrl]) {
//                 if (baseUrl == equal[0])
//                     result[baseUrl].sum = Number(result[baseUrl].sum) + Number(equal[1])
//                 if (baseUrl != equal[0]) {
//                     if (result[baseUrl].domains[equal[0]]) {
//                         result[baseUrl].domains[equal[0]].sum = Number(result[baseUrl].domains[equal[0]].sum) + Number(equal[1])
//                     }
//                     else {
//                         result[baseUrl].domains[equal[0]] = { sum: Number(equal[1]) }
//                     }
//                 }


//             }
//             else {
//                 if (baseUrl == equal[0] && equal.length > 1) {
//                     result[baseUrl] = { sum: Number(equal[1]), domains: {} }
//                 }
//             }

//         }
//     }
//     return result

// }
// console.log(JSON.stringify(formatconverter())
// const fs = require('fs')

// const data = fs.readFileSync('pipeline.txt')
