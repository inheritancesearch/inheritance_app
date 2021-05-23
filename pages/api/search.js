import path from 'path'

const fs = require('fs');
const pdf = require('pdf-parse');
let value1 = ''
let value2 = ''
let value3 = ''
let value4 = ''
let value5 = ''

let result = ''

let resultarray = []

let array = []

let dataBuffer = fs.readFileSync(path.resolve(__dirname, "../../../.././pages/api/4.json"))
let data = JSON.parse(dataBuffer);

export default async function handler(req, res) {

	console.log(req.body.search)
  var searcharray = req.body.search
  value1 = searcharray[0]
  if(searcharray[1] != undefined)
  {
    value2 = searcharray[1]
  }
  else value2 = value1
  if(searcharray[2] != undefined)
  {
    value3 = searcharray[2]
  }
  else value3 = value1
  if(searcharray[3] != undefined)
  {
    value4 = searcharray[3]
  }
  else value4 = value1
  if(searcharray[4] != undefined)
  {
    value5 = searcharray[4]
  }
  else value5 = value1
	
	data.forEach(findPhrase)
  res.send({ resp: resultarray })
}

function findPhrase(item, index) {
  if ((item.text.includes(value2)) && (item.text.includes(value1)) && (item.text.includes(value3)) && (item.text.includes(value4)) && (item.text.includes(value5))) 
  {
    console.log(value1+' '+value2+' '+value3+' '+value4+' '+value5)
    //var stringarray = []
    //stringarray = data.slice(index, index+2)
  	//var string = stringarray.join(' ')
  	result = data[index]
    result.text = result.text.replace(/(\n\n|\n|\r)/gm, " ")
    resultarray.push(result)
  	//console.log(result)
    
  }
}