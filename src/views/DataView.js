import React, {useEffect, useRef, useState} from 'react';
import 'bulma/css/bulma.min.css';
import {useList} from "react-firebase-hooks/database";
import ReactLoading from "react-loading";
import {Container,Form} from "react-bulma-components";
import TreeView from "./TreeView";




export default function DataView(props) {
    const [snapshots, loading, error] = useList(props.database.ref('/'));

    const [options,setOptions] = useState(['/'])
    const [option, setOption] = useState('/')
    useEffect(() => {
        let op  = ['/']
        if(!loading){
            snapshots.forEach(sp => {
                op.push('/'+sp.key)
            })
        }
        setOptions(op)

    },[loading]);
    return (
        <div>
            <Form.Field>
                <Form.Label>
                    Select a experiment
                </Form.Label>
                <Form.Control>
                    <Form.Select
                        onChange={(evt)=>{setOption(evt.target.value)}}
                        value={option}
                    >
                        {
                            options.map((o)=>
                                <option value={o}>
                                    {o}
                                </option>
                            )
                        }

                    </Form.Select>
                </Form.Control>
            </Form.Field>
          <TreeView database={props.database} databaseRef={option}/>


        </div>
    );
}