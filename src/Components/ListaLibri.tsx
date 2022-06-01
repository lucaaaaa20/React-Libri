//COMPONENTE CHE GESTISCE TUTTA LA PARTE DELLE CARD, PERCIO' LA MODIFICA E L'ELIMINAZIONE

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Col, Row, Modal, Form } from "react-bootstrap";
import { Libro } from "../Interfaces/Libro";
import { FormLibro } from "./FormLibro";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faFloppyDisk, faRotateLeft } from '@fortawesome/free-solid-svg-icons'

export const ListaLibri = () => {
    const [libri, setLibri] = useState<Libro[]>()
    const [libro, setLibro] = useState<any>()

    const[aggiorna, setAggiorna] = useState<boolean>(false)

    useEffect(() => {  //USE EFFECT FA SI CHE OGNI VOLTA CHE UNA CARD VENGA MODIFICATA O ELIMINATA VENGA AGGIORNATA LA LISTA
        axios.get<Libro[]>("http://localhost:4000/libreria/lista").then((Risultato) => { //PRENDO TUTTE LA LISTA DI LIBRI DAL DB
            setLibri(Risultato.data)        //VADO A SALVARE LA LISTA DI LIBRI NELLA VARIABILE LIBRI
            console.log("stampa libri")
            setAggiorna(false)
        })
    }, [aggiorna]) //ALLA MODIFICA DI AGGIORNA VIENE ESEGUITO L'useEffect

    const elimina = (id: any): void => {
        axios.delete(`http://localhost:4000/libreria/elimina/${id}`).then((Risultato) => {
            console.log("eliminato")
            setAggiorna(true) //MODIFICA VIENE SETTATO A TRUE
        })
    }

    const modifica = (event: any) => { //AL CLICK DEL TASTO MODIFICA NELLA MODALE
        event.preventDefault()         //PRENDO TUTTI I VALORI DEL FORM GRAZIE A EVENT.TARGET CHE RESTITUISCE TUTTO IL FORM HTML
        let autoreMod = event.target.autore.value //L'ID PERMETTE DI PRENDERE I VALORI
        let titoloMod = event.target.titolo.value
        let descrizioneMod = event.target.descrizione.value
        let libroModificato = { //LIBRO DEL FORM NELLA MODALE
            autore: autoreMod,
            titolo: titoloMod,
            descrizione: descrizioneMod
        }
        let id = libro?.isbn    //PRENDO L'ID DEL LIBRO IN BASE ALLA CARD APPENA CLICCATA
        //INSERISCO IL LIBRO CREATO DAL FORM DELLA MODALE COME BODY DEL MESSAGGIO, COSI' POSSO ANDARE AD AGGIORNARE IL LIBRO
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
            setLibro(risultato.data[0])     //AL CLICK DELL'APERTURA DELLA MODALE VADO A SETTARE LA VARIABILE LIBRO ALLA CARD APPENA CLICCATO
        })                                  //QUESTO PERMETTERA' ANCHE DI MOSTRARE NEI PLACEHOLDER DELL'INPUT DELLA MODALE IL VALORE DEL LIBRO APPENA CLICCATO
        setShow(true);
    }

    const prova = (evt: any) => {
        evt.preventDefault()
    }

    return (
        <Row>
            {/* VADO A CREARE LE CARD IN BASE A QUANTI ELEMENTI CI SONO NELLA VARIABILE LIBRI (CHE E' STATA SETTATA ALL'APERTURA)*/}
            {libri?.map((elemento: any, indice: any) =>
                <><Col className=" col-lg-4 col-md-6 col-sm-12 col-12 mb-3 col-index text-white">
                    <form onSubmit={prova}> 
                        <Card className="border border-dark p-2" key={indice}>
                            <Card.Title className="mt-3"><strong>Titolo</strong></Card.Title>
                            <div className="card-body-text"> {elemento.titolo ? elemento.titolo : "Non definito"}</div>
                            {/* <hr className="hr"></hr> */}
                            <Card.Title><strong>Autore</strong></Card.Title>
                            <div className="card-body-text">{elemento.autore ? elemento.autore : "Non definito"}</div>
                            {/* <hr className="hr"></hr> */}
                            <Card.Title ><strong>Descrizione:</strong></Card.Title>
                            <div className="mb-4 card-footer-text">{elemento.descrizione ? elemento.descrizione : "Non definito"}</div>
                            <Card.Body> <button className="btn me-1 btn-card btn-delete" onClick={() => elimina(elemento.isbn)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                {/* ALLA CREAZIONE DELLE CARD PASSO L'ID DEL LIBRO APPENA LETTO ALLA FUNZIONE apriModale(isbn) */}
                                <Button type="submit" variant="primary" onClick={() => apriModale(elemento.isbn)} className="btn-card"><FontAwesomeIcon icon={faPencil} /></Button>
                            </Card.Body>
                        </Card>
                    </form>
                </Col>
                </>
            )
            }
            <>
                <Modal className="p-4 text-white" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifica</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={modifica}>
                            <Form.Group>
                                <Form.Label className="mt-2">Autore</Form.Label>
                                {/* IMPOSTO IL PLACEHOLDER DELLA MODALE IN BASE ALLA VARIABILE LIBRO (CHE E' STATA SETTATA A RIGA 56) */}
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
                                <FontAwesomeIcon icon={faRotateLeft} />
                            </Button>
                            <Button className="mt-2 w-100" type="submit" onClick={handleClose}>
                                <FontAwesomeIcon icon={faFloppyDisk} />
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </>
        </Row >
    )
}
