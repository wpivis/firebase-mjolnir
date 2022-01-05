import React, {useEffect, useRef, useState} from 'react';
import 'bulma/css/bulma.min.css';
import {Button, Container, Form, Icon} from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopHouse,faKey } from '@fortawesome/free-solid-svg-icons'
import DataView from "./DataView";
 import {getRoot} from "../services/firebaseService";
import { useParams } from "react-router-dom";

export default function Dashboard() {
    const params = new URLSearchParams(window.location.search)
    let databaseurl = params.get('databaseurl')
    let databasekey = params.get('databasekey')

    const [url,setUrl] = useState(databaseurl || '')
    // const [authdomain, setAuthdomain] = useState('')
    const [apikey, setApikey] = useState(databasekey || '')
    const [root,setRoot] = useState('')


    const checkData = () => {
        const FirebaseConfig = {
            databaseURL: url,
            authDomain: url,
            apiKey: apikey,
            projectId: "reversing-pilot"
        }
        const dbroot = getRoot(FirebaseConfig)
        console.log(dbroot)
        setRoot(dbroot)
    }

    return (
        <div>
            <Container
                breakpoint="desktop"
            >
            <form>
            <Form.Field>
                <Form.Label>URL</Form.Label>
                <Form.Control>
                    <Form.Input placeholder="URL" name="url" value={url} onChange={(evt)=>{setUrl(evt.target.value)}} />
                    <Icon align="left">
                        <FontAwesomeIcon icon={faLaptopHouse} />
                    </Icon>
                </Form.Control>
            </Form.Field>
                <Form.Field>
                    <Form.Label>API Key</Form.Label>
                    <Form.Control>
                        <Form.Input placeholder="API Key" name="key" value={apikey} onChange={(evt)=>{setApikey(evt.target.value)}} />
                        <Icon align="left">
                            <FontAwesomeIcon icon={faKey} />
                        </Icon>
                    </Form.Control>
                </Form.Field>
            <Button.Group>
                <Button type={"button"} fullwidth rounded color="primary" onClick={checkData}>Check</Button>
            </Button.Group>
            </form>
            </Container>
            { root !=='' &&
                <Container>
                    <DataView database={root}>

                    </DataView>
                </Container>
            }
        </div>


    );
}