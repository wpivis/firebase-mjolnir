import Firebase from 'firebase';

const NA = 'NA'
export  function getRoot(config){
    if (!Firebase.apps.length)
        Firebase.initializeApp(config)
    // return Firebase.database().ref(path);
    return Firebase.database()
}

function attatch(str, column,backup, delimiter){
    if(column == undefined)
        str += backup + delimiter
    else
        str += column + delimiter

    return str;
}

export function flattenData(database,testName, attributes){
    console.log(database,"database")
    console.log(attributes,"attributes")
    console.log(testName,"test name")

    //to array
    let records = Object.values(database)
    // filter by testname
    records = records.filter(r => {
        let testname = r.test_name || r.testName || 'default'
        return testName.has(testname)
    })


    let columnDelimiter = '\t'
    let lineDelimiter = '\n'
    let originAttr= [...attributes.keys()]
    let altAttr = [...attributes.values()]
    //TODO flat nested obj function goes here


//////////////////////Build TSV/////////////////////////////////
    let result = ""
    const df = []
    df.push('uid')
    altAttr.forEach( altName => {
        df.push(altName)

    })

    //add df
    df.forEach(d=>{
        result += d;
        result += columnDelimiter
    })
    result = result.slice(0,-1);
    result += lineDelimiter;
//add data
    records.forEach(record => {
        const uniqID = (record["experimentID"] || 'default') + "-" + (record["pid"] || "NoID")
        result = attatch(result, uniqID,NA,columnDelimiter)

        originAttr.forEach( (attr,index) => {
            let delimiter = index == originAttr.length-1?lineDelimiter:columnDelimiter
            result = attatch(result, record[attr],NA, delimiter)
        })

    })
    return result

}