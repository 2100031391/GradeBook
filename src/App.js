import React, { useState } from 'react';
import './App.css';

// Sample data
const studentsData = [
  { id: 1, name: "Raju", ticketNumber: 12345, ticketTopic: "Topic A", examGrade: 4.5, ratingGrade: 3.5, comments: "Good effort" },
  { id: 2, name: "Ramu", ticketNumber: 54321, ticketTopic: "Topic B", examGrade: 3.7, ratingGrade: 4.2, comments: "Excellent work" },
  { id: 3, name: "Seeta", ticketNumber: 4567, ticketTopic: "Topic A", examGrade: 5, ratingGrade: 4, comments: "Good" },
 
];

const App = () => {
  const [students, setStudents] = useState(studentsData);
  const [showStatistics, setShowStatistics] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterOption, setFilterOption] = useState("all"); // Default to show all students
  const [sortingOption, setSortingOption] = useState(null);

  const calculateFinalGrade = (examGrade, ratingGrade) => {
    return 0.6 * examGrade + 0.4 * ratingGrade;
  };

  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student.id === selectedStudent ? null : student.id);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  const filteredStudents = () => {
    if (filterOption === "passed") {
      return students.filter(student => calculateFinalGrade(student.examGrade, student.ratingGrade) > 4);
    } else if (filterOption === "failed") {
      return students.filter(student => calculateFinalGrade(student.examGrade, student.ratingGrade) <= 4);
    }
    return students;
  };

  const sortedStudents = () => {
    if (sortingOption === "alphabetic") {
      return [...filteredStudents()].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortingOption === "finalGradeAsc") {
      return [...filteredStudents()].sort((a, b) => calculateFinalGrade(a.examGrade, a.ratingGrade) - calculateFinalGrade(b.examGrade, b.ratingGrade));
    } else if (sortingOption === "finalGradeDesc") {
      return [...filteredStudents()].sort((a, b) => calculateFinalGrade(b.examGrade, b.ratingGrade) - calculateFinalGrade(a.examGrade, a.ratingGrade));
    }
    return filteredStudents();
  };

  const Statistics = () => {
    const totalStudents = students.length;
    const passedStudents = students.filter(student => calculateFinalGrade(student.examGrade, student.ratingGrade) > 4).length;
    const failedStudents = students.filter(student => calculateFinalGrade(student.examGrade, student.ratingGrade) <= 4).length;
    const grades = students.map(student => calculateFinalGrade(student.examGrade, student.ratingGrade));
    const minGrade = Math.min(...grades);
    const maxGrade = Math.max(...grades);
    const averageGrade = grades.reduce((acc, curr) => acc + curr, 0) / totalStudents;return (
      <div className="statistics">
        <h2>Statistics</h2>
        Total Students: {totalStudents} || 
         Passed Students: {passedStudents} || 
        Failed Students: {failedStudents}  || 
        Min Grade: {minGrade} || 
        Max Grade: {maxGrade} || 
        Average Grade: {averageGrade.toFixed(2)}
      </div>
    );
  };

  return (
    <div className="App">
      <header>
        <center>
          <h2>GradeBook Project</h2>
          <h3>Exam Information</h3>
        </center>
        Title: FrontEnd Exam || Date: April 6, 2024 || Professor's Name: John Smith ||
       College: KL University  || Department: Computer Science || Semester: EVEN SEM 2024 || Group: Group 1
      </header>
      <main>
        <div className="options">
          <label>Show:</label>
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="passed">Passed</option>
            <option value="failed">Failed</option>
          </select>
          <label>Sort By:</label>
          <select value={sortingOption} onChange={handleSortingChange}>
            <option value="">None</option>
            <option value="alphabetic">Alphabetic</option>
            <option value="finalGradeAsc">Final Grade Ascending</option>
            <option value="finalGradeDesc">Final Grade Descending</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>Name</th>
              <th>Ticket's Number</th>
              <th>Rating Grade</th>
              <th>Exam Grade</th>
              <th>Final Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedStudents().map((student, index) => (
              <tr key={student.id} onClick={() => handleRowClick(student)} style={{ backgroundColor: selectedStudent === student.id ? 'lightblue' : 'transparent' }}>
                <td>{index + 1}</td>
                <td>{selectedStudent === student.id ? student.name.toUpperCase() : student.name}</td>
                <td>{student.ticketNumber}</td>
                <td>{student.ratingGrade}</td>
                <td>{student.examGrade}</td>
                <td>{calculateFinalGrade(student.examGrade, student.ratingGrade)}</td>
                <td>{calculateFinalGrade(student.examGrade, student.ratingGrade) > 4 ? 'Passed' : 'Failed'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="show-statistics" onClick={toggleStatistics}>{showStatistics ? 'Hide Statistics' : 'Show Statistics'}</button>
        {showStatistics && <Statistics />}
      </main>
      <footer>
        <p>Signature: A.T.R.Nandini</p>
        <p>Date: April 6, 2024</p>
      </footer>
    </div>
  );
};

export default App;