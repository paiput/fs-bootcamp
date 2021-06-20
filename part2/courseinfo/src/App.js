const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <li>{part} {exercises}</li>
  )
}

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => (
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </ul>
  )
}

const Total = ({ parts }) => {
  return (
    <p>Complete later</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total exercises={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4
      }
    ]
  }
  
  return <Course course={course} />
}

export default App;

