import React from "react";
import Lesson from "./Lesson";

function LessonList(props) {

  
  // Funkce pro smazání lekce
  const handleLessonDeleted = (lessonId) => {
    props.onLessonDeleted(lessonId);
  };

  // Funkce pro schválení nebo zamítnutí lekce
  const handleLessonStatusChange = async (lessonId, approved) => {
    if (approved) {
      console.log("Lesson approved in LessonList: ", lessonId);
      props.onLessonApproved(lessonId);
    } else {
      console.log("Lesson disapproved in LessonList: ", lessonId);
      props.onLessonDisapproved(lessonId); // Předat prop onLessonDisapproved
    }
  };
 

  function getLessonList(lessonList) {
    return lessonList.map((lesson) => {
      return (
        <Lesson
          key={lesson.id}
          lesson={lesson}
          onLessonDeleted={handleLessonDeleted}
          onLessonStatusChange={handleLessonStatusChange}  // Předáváme jednotnou funkci pro změnu stavu lekce
        />
      );
    });
  }

  return <div>{getLessonList(props.lessonList)}</div>;
}

export default LessonList;
