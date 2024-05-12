import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import Button from 'react-bootstrap/Button';
import { mdiCalendarClock, mdiProgressQuestion, mdiClockTimeTwelveOutline, mdiIdentifier, mdiCheckDecagram, mdiCloseOctagon } from "@mdi/js";
import DeleteLesson from "./DeleteLesson";
import ApproveLesson from "./ApproveLesson";
import DisapproveLesson from "./DisapproveLesson";
import CreateLesson from "./CreateLesson";

function Lesson(props) {
  const [validity, setValidity] = useState(props.lesson.validity); // Stav schválení se načítá ze props

  const handleApproveLesson = () => {
    setValidity(true);
    props.onLessonApproved(props.lesson.id);
  };

  const handleDisapproveLesson = () => {
    setValidity(false); // Nastaví validity na false
    console.log("Lesson disapproved: ", props.lesson.id); // Záznam o zamítnutí lekce
    props.onLessonStatusChange(props.lesson.id, false);
  };


  const handleLessonDeleted = () => {
    props.onLessonDeleted(props.lesson.id);
  };

  const getValidityStatus = () => {
    if (validity === true) {
      return {
        text: "Schváleno",
        color: "green",
        icon: mdiCheckDecagram
      };
    } else if (validity === false) {
      return {
        text: "Zamítnuto",
        color: "blue",
        icon: mdiCloseOctagon
      };
    } else {
      return {
        text: "Čeká na schválení",
        color: "grey",
        icon: mdiProgressQuestion
      };
    }
  };

  const { text, color, icon } = getValidityStatus();

  return (
    <Card>
      <Card.Header style={{ backgroundColor: '#f0f0f0' }}>Zamluvený termín</Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td style={{ width: '30%' }}><Icon path={mdiCalendarClock} size={1} color="grey" title="Datum zahájení jízdy" /> <span title="Datum zahájení jízdy">Datum: {props.lesson.date}</span></td>
                <td><Icon path={mdiIdentifier} size={1} color="grey" title="ID lekce" /> <span title="ID lekce">lekce: {props.lesson.id}</span></td>
              </tr>
              <tr>
                <td><Icon path={mdiClockTimeTwelveOutline} size={1} color="grey" title="Čas zahájení jízdy" /> <span title="Čas zahájení jízdy">Čas: {props.lesson.start_time}</span></td>
                <td><Icon path={mdiIdentifier} size={1} color="grey" title="ID učitele" /> <span title="ID učitele">učitele: {props.lesson.tutor_id}</span></td>
              </tr>
              <tr>
                <td><Icon path={icon} size={1} color={color} title="Stav schválení lekce" /> <span title="Stav schválení lekce">{text}</span></td>
                <td><Icon path={mdiIdentifier} size={1} color="grey" title="ID studenta" /> <span title="ID studenta">studenta: {props.lesson.student_id}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between">
          {validity === true ? (
            <Button variant="success" size="sm" disabled>Schváleno</Button>
          ) : (
            <ApproveLesson lessonId={props.lesson.id} onLessonApproved={handleApproveLesson} />
          )}
          <DisapproveLesson lessonId={props.lesson.id} onLessonDisapproved={handleDisapproveLesson} />
          <DeleteLesson lessonId={props.lesson.id} onLessonDeleted={handleLessonDeleted} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default Lesson;
