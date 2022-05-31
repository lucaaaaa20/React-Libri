import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Libro } from "../Interfaces/Libro";
import { ListaLibri } from "./ListaLibri";

export const FormLibro = () => {

    const inserimentoLibro = (evt: any) => {
        evt.preventDefault()
        let autore = evt.target.inputAutore.value
        let titolo = evt.target.inputTitolo.value
        let descrizione = evt.target.inputDescrizione.value
        let libro = {
            autore: autore,
            titolo: titolo,
            descrizione: descrizione
        }
        axios.post<Libro>("http://localhost:4000/libreria/addLibro", libro).then((risultato) => { console.log(risultato) })
        setAggiorna(true)
        evt.target.inputAutore.value = ""
        evt.target.inputTitolo.value = ""
        evt.target.inputDescrizione.value = ""
    }
    const [aggiorna, setAggiorna] = useState<boolean>(false)

    return (
        <>
            <div className="row">
                <div className="col-lg-3">
                </div>
                <div className="col-lg-6">
                    <form onSubmit={inserimentoLibro} className="form-aggiunta p-4 mb-5">
                        <Form.Group>
                            <Form.Label className="mt-2">Autore</Form.Label>
                            <Form.Control type="text" id="inputAutore" placeholder="Inserisci l'autore"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mt-2">Titolo</Form.Label>
                            <Form.Control type="text" id="inputTitolo" placeholder="Inserisci il titolo"></Form.Control>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className="mt-2">Descrizione</Form.Label>
                            <Form.Control type="text" id="inputDescrizione" placeholder="Inserisci la descrizione"></Form.Control>
                        </Form.Group>
                        <button type="submit" className=" mt-4 btn btn-form mb-3 px-5 btn-block invio text-white">Inserisci</button>
                    </form>
                </div>
            </div>
        </>
    )
}
