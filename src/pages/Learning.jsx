import { useParams, useNavigate } from 'react-router-dom';
import courses from '../data/courses';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import Quiz from './Quiz';

const lessonContent = {
  1: {
    Introduction: "Learn what React is and why it is used to build modern user interfaces.",
    Components: "Learn how to create reusable React components.",
    Props: "Learn how data is passed from one component to another using props.",
    State: "Learn how React state works and how it changes the UI.",
    Hooks: "Learn how React Hooks such as useState and useEffect work.",
    JSX: "Learn how JSX allows you to write HTML-like syntax inside JavaScript."
  },
  2: {
    Introduction: "Learn what Python is and how it is used for programming and problem solving.",
    Variables: "Learn how variables store and work with different values in Python.",
    "Data Types": "Learn about strings, numbers, lists, tuples, dictionaries and other Python data types.",
    Functions: "Learn how to create reusable functions and pass data using parameters.",
    "Lists & Dictionaries": "Learn how to store and work with collections of data in Python.",
    OOP: "Learn the fundamentals of object-oriented programming using Python."
  },
  3: {
    Introduction: "Learn the fundamentals of databases and understand SQL and MongoDB.",
    "SQL Basics": "Learn tables, databases, rows, columns and basic SQL concepts.",
    "SELECT Queries": "Learn how to retrieve data from a database using SELECT queries.",
    "WHERE & Filtering": "Learn how to filter database records using WHERE conditions.",
    "MongoDB Basics": "Learn how MongoDB stores data using databases, collections and documents.",
    "CRUD Operations": "Learn how to create, read, update and delete data."
  },
  4: {
    Introduction: "Learn what JavaScript is and how it adds behavior and interactivity to web pages.",
    "Variables & Data Types": "Learn variables and the main data types available in JavaScript.",
    Functions: "Learn how to create and use reusable JavaScript functions.",
    "Arrays & Objects": "Learn how to store and work with collections and structured data.",
    "DOM Manipulation": "Learn how JavaScript can access and modify elements on a webpage.",
    Events: "Learn how JavaScript responds to user actions such as clicks and form submissions."
  }
};

function Learning() {
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState("Introduction");
  const [showQuiz, setShowQuiz] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(null);

  const course = courses.find((course) => course.id === Number(id));

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/enrollments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const enrolled = response.data.enrollments.some(
          (enrollment) => enrollment.courseId === Number(id)
        );
        setIsEnrolled(enrolled);
        if (!enrolled) {
          navigate(`/courses/${id}`);
        }
      } catch (error) {
        console.error(error);
        navigate('/courses');
      }
    };
    checkEnrollment();
  }, [id, navigate]);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress_${id}`);
    if (savedProgress) {
      setCompletedLessons(JSON.parse(savedProgress));
    }
  }, [id]);

  // Guard clause if the course doesn't exist in local data array
  if (!course) {
    return <p className="text-center mt-10 text-red-500">Course not found.</p>;
  }

  if (isEnrolled === null) {
    return <p className="text-center mt-10">Checking enrollment...</p>;
  }

  const Lessons = course.lessonList || [];
  const progress = Lessons.length > 0 ? (completedLessons.length / Lessons.length) * 100 : 0;
  const currentIndex = Lessons.indexOf(selectedLesson);

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4">
      <Sidebar 
        lessons={Lessons} 
        selectedLesson={selectedLesson} 
        setSelectedLesson={setSelectedLesson} 
      />
      
      <main className="flex-1">
        <h1 className="text-4xl font-bold text-blue-600 text-center">
          {course.title}
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mt-6">
          {course.description}
        </p>

        <div className="max-w-3xl mx-auto mt-8">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700">Course Progress</span>
            <span className="text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transitions-all" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-8 space-y-3">
          {Lessons.map((lesson) => (
            <button
              key={lesson}
              onClick={() => setSelectedLesson(lesson)}
              className={`w-full p-4 rounded-lg shadow-sm text-left transition ${
                completedLessons.includes(lesson)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-white hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {lesson} {completedLessons.includes(lesson) && '✓'}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-gray-800">{selectedLesson}</h2>
          <p className="text-gray-600 mt-3 leading-7">
            {lessonContent[course.id]?.[selectedLesson] || "Content loading..."}
          </p>

          <div className="mt-6 bg-gray-900 h-64 rounded-xl flex items-center justify-center">
            <p className="text-white text-lg">🎥 {selectedLesson} Tutorial</p>
          </div>

          <button
            onClick={() => {
              if (!completedLessons.includes(selectedLesson)) {
                const updatedLessons = [...completedLessons, selectedLesson];
                setCompletedLessons(updatedLessons);
                localStorage.setItem(`progress_${course.id}`, JSON.stringify(updatedLessons));
              }
            }}
            className="mt-6 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
          >
            Mark as Complete
          </button>


         <button
  onClick={() => setShowQuiz(true)}
  className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
>
  Take Quiz
</button>


          <div className="flex justify-between mt-6">
            <button
              onClick={() => setSelectedLesson(Lessons[currentIndex - 1])}
              disabled={currentIndex === 0}
              className="bg-gray-200 px-5 py-2 rounded-lg disabled:opacity-50"
            >
              ← Previous
            </button>
            <button
              onClick={() => setSelectedLesson(Lessons[currentIndex + 1])}
              disabled={currentIndex === Lessons.length - 1}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>

        <Modal isOpen={showQuiz} onClose={() => setShowQuiz(false)}>
          <Quiz courseId={course.id} onClose={() => setShowQuiz(false)} />
        </Modal>
      </main>
    </div>
  );
}

export default Learning;
