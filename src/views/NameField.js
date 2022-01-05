import React, {useEffect, useState} from 'react';
import 'bulma/css/bulma.min.css';
import {Container, Form} from 'react-bulma-components';



export default function NameField(props) {


    const [originname,setOriginame] = useState(props.name.origin)
    const [altname,setAltname] = useState(props.name.alt)

    useEffect(() => {
        setOriginame(props.name.origin)
        setAltname(props.name.alt)

    },[props]);

    const changeName = (evt) => {

        props.setAltName(props.name.origin,evt.target.value)
        setAltname(evt.target.value)
    }
    return (
        <div>
            <Container size={4}>

            <Form.Field>
                <Form.Label>Origin: {originname}</Form.Label>
                <Form.Control>
                    <Form.Input placeholder="URL" name="url" value={altname} onChange={changeName} />
                    {/*<Icon align="left">*/}
                    {/*    <FontAwesomeIcon icon={faLaptopHouse} />*/}
                    {/*</Icon>*/}
                </Form.Control>
            </Form.Field>
                ----------------------------------------------------------------------------------
            </Container>

        </div>


    );
}