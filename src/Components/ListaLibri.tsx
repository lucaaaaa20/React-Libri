import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Row, Modal, Form } from "react-bootstrap";
import { Libro } from "../Interfaces/Libro";

interface Props {
    aggiorna: boolean,
    setAggiorna: any
}

export const ListaLibri = (props: Props) => {
    const [libri, setLibri] = useState<Libro[]>()
    const [libro, setLibro] = useState<any>()
    
    let aggiorna = props.aggiorna
    let setAggiorna = props.setAggiorna
    
    useEffect(() => {
        axios.get<Libro[]>("http://localhost:4000/libreria/lista").then((Risultato) => {
            setLibri(Risultato.data)
            console.log("stampa libri")
            setAggiorna(false)
        })
    }, [aggiorna])
    
    const elimina = (id: any): void => {
        axios.delete(`http://localhost:4000/libreria/elimina/${id}`).then((Risultato) => {
            console.log("eliminato")
            setAggiorna(true)
        })
    }
    
    const modifica = (event: any) => {
        event.preventDefault()
        let autoreMod = event.target.autore.value
        let titoloMod = event.target.titolo.value
        let descrizioneMod = event.target.descrizione.value
        let libroModificato = {
            autore: autoreMod,
            titolo: titoloMod,
            descrizione: descrizioneMod
        }
        let id = libro?.isbn
        axios.put<any>(`http://localhost:4000/libreria/modifica/${id}`, libroModificato).then((Risultato) => {
            console.log(Risultato)
            setAggiorna(true)
        })  
    }
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () =>
        setShow(true);
        
    
    const apriModale = (isbn: any) => {
        axios.get<any>(`http://localhost:4000/libreria/libro/${isbn}`).then((risultato) => {
            setLibro(risultato.data[0])
        })
        setShow(true);
    }

    const prova = (evt: any) => {
        evt.preventDefault()
        console.log(evt.target)
    }

    return (
        <Row>
            {libri?.map((elemento: any, indice: any) =>
                <><Col className=" col-lg-4 col-md-6 col-sm-12 col-12 mb-3">
                    <form onSubmit={prova}>
                        <Card className="border border-dark p-2" key={indice}>
                            <Card.Title className="mt-3">{elemento.autore}</Card.Title>
                            <hr className="hr"></hr>
                            <Card.Body>{elemento.titolo}</Card.Body>
                            <hr className="hr"></hr>
                            <Card.Body className="mb-4">{elemento.descrizione}</Card.Body>
                            <Card.Body> <button className="btn me-1 btn-card btn-delete" onClick={() => elimina(elemento.isbn)}>elimina</button>
                                <Button type="submit" variant="primary" onClick={() => apriModale(elemento.isbn)} className="btn-card">Modifica</Button>
                            </Card.Body>
                        </Card>
                    </form>
                </Col>
                </>
            )
            }
            <>
                <Modal className="p-4" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifica</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={modifica}>
                            <Form.Group>
                                <Form.Label className="mt-2">Autore</Form.Label>
                                <Form.Control type="text" id="autore" placeholder={libro?.autore}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="mt-2">Titolo</Form.Label>
                                <Form.Control type="text" id="titolo" placeholder={libro?.titolo}></Form.Control>
                            </Form.Group>
                            <Form.Group >
                                <Form.Label className="mt-2">Descrizione</Form.Label>
                                <Form.Control type="text" id="descrizione" placeholder={libro?.descrizione}></Form.Control>
                            </Form.Group>
                            <Button className="me-2 mt-3 w-100" variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button className="mt-2 w-100" type="submit" onClick={handleClose}>
                                Salva
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </>
        </Row >
    )
}
