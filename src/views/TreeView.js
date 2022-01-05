import React, {useEffect, useState, useRef} from 'react';
import 'bulma/css/bulma.min.css';
import {useList} from "react-firebase-hooks/database";
import ReactLoading from "react-loading";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import NameField from "./NameField";
import {flattenData} from "../services/firebaseService";
import {Button} from "react-bulma-components";


// const nodes = [{
//     value: 'mars',
//     label: 'Mars',
//     children: [
//         { value: 'phobos', label: 'Phobos' },
//         { value: 'deimos', label: 'Deimos' },
//     ],
// }];

let dataNodes = [
    {
        value: 'root',
        label: 'root',
        children: []
    }
]

const initDataNodes = ()=>{
    dataNodes = [
        {
            value: 'root',
            label: 'root',
            children: []
        }
    ]
}


const addToNodes = (snapshot,path) => {

    let root = dataNodes[0];
    let nodePath = "."
    path.forEach(p=>{
        nodePath = nodePath + p;
        let obj = root.children.filter(n=>{
            return p === n.value
        })
        if(obj.length === 0){
            let newNode = {
                value: nodePath,
                label: nodePath,
                children: [],
            }
            root.children.push(newNode);
            root = newNode
        }else{
            root = obj[0]
        }

    })
    let dataArr = Object.values(snapshot)

    let map = {}
    dataArr.forEach(d=>{

        let testName = d.test_name ||d.testName || "default"
        testName = nodePath + "." + testName
        if(!map[testName] || Object.keys(d).length>map[testName].length){
          map[testName] = []
          Object.keys(d).forEach(k=>{
              map[testName].push({label: k, value: testName+"." + k})
          })
        }
    })
    for(const [key,value] of Object.entries(map))
    root.children.push(
        {
            value: key,
            label: key,
            children:value
        }
    )

}

const generateNodes = (snapshot,path) => {

    if(Object.keys(snapshot)[0].charAt(0) === "-")
        addToNodes(snapshot,path)
    else if(snapshot && snapshot.length>0){
        snapshot.forEach( sp => {
            generateNodes(sp.val(),[...path,sp.key])
        })
    }

}

export default function TreeView(props) {
    const [snapshots, loading, error] = useList(props.database.ref(props.databaseRef));

    const [checked,setChecked] = useState([])
    const [expanded,setExpanded] = useState([])
    const [dataload,setDataload] = useState(false)
    const [selected, setSelected] = useState(new Map())
    const [testname, setTestname] = useState(new Set())
    const downloadBTN = useRef(null)
    useEffect(() => {
        initDataNodes();
        if(snapshots && snapshots.length>0){
            generateNodes(snapshots,[])
            setDataload(true)
        }

    },[snapshots]);

    const boxChecked = (check) => {
        setChecked(check)

        const newSelected = new Map()
        const newSelectedTestName = new Set()
        check.forEach((c)=>{
            let attributeNames = c.split('.')
            let attribute = attributeNames[attributeNames.length-1]
            newSelected.set(attribute, selected.get(attribute)||attribute)
        })
        //set attributes name and alt attributes name map
        setSelected(new Map(newSelected))
        //set test name set
        check.forEach( c => {
            let path = c.split('.')
            newSelectedTestName.add(path[path.length-2])
        })
        setTestname(newSelectedTestName)

    }

    const setAltName = (originname,altname)=> {
        setSelected(new Map(selected.set(originname,altname)));

    }

    const downloadTSV = () => {
        let tableNameChain = checked[0].split('.')
        let sp;
        //last two name is testName and attributes name
        for(let i=1;i<tableNameChain.length-2;i++){
            sp = snapshots.filter( s => s.key===tableNameChain[i])[0]
        }

        const res = flattenData(Object.values(sp.val()),testname,selected)
        download(res,"download.tsv")
    }


    function download(csv,filename){

        let data,link;
        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/tsv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();

    }

    return (
        <div>

            <p>
                {error && <strong>Error: {error}</strong>}
                {!loading && snapshots && (
                    <React.Fragment>
            <span>
              {/*List:{' '}*/}
              {/*  {snapshots.map((v) => (*/}
              {/*      <React.Fragment key={v.key}>{v.key}, </React.Fragment>*/}
              {/*  ))}*/}
                {dataload &&   <CheckboxTree
                    nodes={dataNodes}
                    checked={checked}
                    expanded={expanded}
                    onCheck={checked => boxChecked(checked)}
                    onExpand={expanded => setExpanded(expanded)}
                />}
            </span>
                    </React.Fragment>
                )}
            </p>
            {
                    Array.from(selected.entries()).map((entry) => {
                    const [key, value] = entry;
                    let obj = {
                        origin:key,
                        alt: value
                    }
                    return (<NameField name={obj} setAltName={setAltName} />);
                })
            }
            <Button
                color="info"
                renderAs="span"
                onClick={downloadTSV}
                className={"download-btn"}
                domRef={downloadBTN}
            >
                Download
            </Button>
            {loading && <ReactLoading type={"bars"} color="orange" width={200} className={"center"}/>}
        </div>
    );
}