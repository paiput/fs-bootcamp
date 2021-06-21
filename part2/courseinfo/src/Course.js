const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part, exercises }) => <li>{part} {exercises}</li>

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
  const courseExercises = parts.map(part => part.exercises)
  const totalExercises = courseExercises.reduce((acc, cur) => acc + cur)

  return (
    <p>
      <strong>total of {totalExercises} exercises</strong>      
    </p>
  )
}

const Course = ({ name, parts }) => {
  return (
    <div>
      <Header course={name} />
      <Content parts={parts}/>
      <Total parts={parts} />
    </div>
  )
}

export default Course