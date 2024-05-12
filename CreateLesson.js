import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { fetchLessons } from '../App';

function CreateLesson(props) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    setStudentId(props.userId || "");
  }, [props.userId]);

  const handleCreateLesson = async () => {
    if (!date || !startTime || !studentId) {
      console.error('Následující pole jsou povinná:');
      console.error('Datum:', date);
      console.error('Čas začátku:', startTime);
      console.error('ID studenta:', studentId);
      return;
    }

    const formattedDate = formatDateForSchema(date);

    const lessonData = {
      date: formattedDate,
      start_time: startTime,
      student_id: studentId,
      validity: null
    };

    console.log('Odesílání dat:', lessonData);

    try {
      const response = await fetch('http://localhost:3000/lesson/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lessonData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const lessonCreated = await response.json();
      console.log("Lesson created:", lessonCreated);

      setShowCreateModal(false);
      props.fetchLessons(); // Načtení seznamu jízd z backendu po úspěšném vytvoření jízdy
    } catch (error) {
      console.error('Error creating lesson:', error);
    }
  };

  const handleCancelCreate = () => {
    setShowCreateModal(false);
  };

  const formatDateForSchema = (inputDate) => {
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
      console.error('Nesprávný formát data:', inputDate);
      return inputDate;
    }
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>Vytvořit jízdu</Button>
      
      <Modal show={showCreateModal} onHide={handleCancelCreate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Vytvoření nové lekce</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="lessonDate">
              <Form.Label>Datum</Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="lessonStartTime">
              <Form.Label>Čas začátku</Form.Label>
              <Form.Control type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </Form.Group>
            <Form.Control type="hidden" value={studentId} readOnly />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelCreate}>Zrušit</Button>
          <Button variant="success" onClick={handleCreateLesson}>Vytvořit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateLesson;
