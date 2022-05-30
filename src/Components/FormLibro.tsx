import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Libro } from "../Interfaces/Libro";

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
        axios.post<Libro>("http://localhost:4000/libreria/addLibro", libro).then((risultato) => {console.log(risultato)})  
        evt.target.inputAutore.value = ""
        evt.target.inputTitolo.value = ""
        evt.target.inputDescrizione.value = ""
    }
    
    return (
        <form onSubmit={inserimentoLibro}>
            <Form.Group>
                <Form.Label className="mt-2">Autore</Form.Label>
                <Form.Control type="text" id="inputAutore" placeholder="Inserisci l'autore"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label className="mt-2">Titolo</Form.Label>
                <Form.Control type="text" id="inputTitolo" placeholder="Inserisci il titolo"></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label className="mt-2">Descrizione</Form.Label>
                <Form.Control type="text" id="inputDescrizione" placeholder="Inserisci la descrizione"></Form.Control>
            </Form.Group>
            <button type="submit" className=" mt-2 btn btn-primary">Inserisci</button>
        </form>
    )
}