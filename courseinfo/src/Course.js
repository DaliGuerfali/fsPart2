const Header = ({ course }) => {
    return (
      <h1>{course}</h1>
    );
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>{name} {exercises}</p>
    );
  }
  
  
  
  const Content = ({ parts }) => {
  
    return (
      <div>
        {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </div>
      );
    }
  
  const Total = ({ parts }) => {
    return (
      <p>total of exercises {parts.reduce((t, e) => t + e.exercises,0)}</p>
    );
}

const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    );
}


export default Course;