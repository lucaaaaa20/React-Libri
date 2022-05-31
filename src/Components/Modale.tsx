import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Row, Modal, Form } from "react-bootstrap";
import { Libro } from "../Interfaces/Libro";

// interface Props {
//     libro: any,
//     setLibro: any,
//     aggiorna: boolean,
//     setAggiorna: boolean,
//     handleShow: any,
//     handleClose: any,
// }

export const Modale = () => { //props: Props
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () =>
        setShow(true);
    // let handleClose = props.handleClose
    // let handleShow = props.handleShow
    // let libro = props.libro
    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <Form.Group>
                            <Form.Label className="mt-2">Autore</Form.Label>
                            <Form.Control type="text" id="autore" placeholder="{libro.autore}"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-2">Titolo</Form.Label>
                            <Form.Control type="text" id="titolo" placeholder="{libro.titolo}"></Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className="mt-2">Descrizione</Form.Label>
                            <Form.Control type="text" id="descrizione" placeholder="{libro.descrizione}"></Form.Control>
                        </Form.Group>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" onClick={handleClose}>
                            ee
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}