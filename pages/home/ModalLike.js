import React, { useEffect, useState } from 'react';
import { Button, Nav, Navbar, NavDropdown, Form, Modal } from 'react-bootstrap';

export default function ModalLike(props) {
    const [show, setShow] = useState(props.show);
    useEffect(() => {
        setShow(props.show)
    }, [props.show])
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Danh sách yêu thích</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                123
            </Modal.Body>
        </Modal>
    )
}