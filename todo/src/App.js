import {
  useState,
  useEffect,
} from 'react';

function App() {

  // input state
  const [task, setTask] =
    useState('');

  // task list state
  const [tasks, setTasks] =
    useState([]);

  // useEffect
  useEffect(() => {

    console.log(
      'Task Updated:',
      tasks
    );

  }, [tasks]);

  // add task
  const addTask = () => {

    if (task.trim() === '')
      return;

    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
    };

    setTasks([
      ...tasks,
      newTask,
    ]);

    setTask('');
  };

  // delete task
  const deleteTask = (id) => {

    const filtered =
      tasks.filter(
        item => item.id !== id
      );

    setTasks(filtered);
  };

  const deleteAll = () => {

    setTasks([]);
  }

  // toggle complete
  const toggleTask = (id) => {

    const updated =
      tasks.map(item => {

        if (item.id === id) {

          return {
            ...item,
            completed:
              !item.completed,
          };
        }

        return item;
      });

    setTasks(updated);
  };

  const [filter, setFilter] =
  useState('all');

  const filteredTasks = tasks.filter(item => {

    if (filter === 'all')
      return true;

    if (filter === 'completed')
      return item.completed;

    if (filter === 'pending')
      return !item.completed;

    return true;
  });

  const editTask = (id, newTitle) => {

    const updated = tasks.map(item => {

      if (item.id === id) {

        return {
          ...item,
          title: newTitle,
        };
      }

      return item;
    });

    setTasks(updated);
  }

  const [dark, setDark] =
  useState(false);

  return (
  <div
    style={{
      backgroundColor: dark
        ? '#333'
        : 'white',

      color: dark
        ? 'white'
        : 'black',

      minHeight: '100vh',
      padding: '20px',
    }}
  >
    <button
      onClick={() =>
        setDark(!dark)
      }
      style={{
        ...styles.addBtn,
        marginBottom: '20px',
      }}
    >
      Toggle {dark ? 'Light' : 'Dark'} Mode
    </button>


    <div style={styles.container}>

      <h1>
        Todo Hook App
      </h1>

      <p>
        Total Tasks:
        {tasks.length}
      </p>
      
      
     {
  tasks.length === 0 ? (

    <p>
      No tasks added yet.
    </p>

  ) : (

    <p>
      Completed Tasks:
      {
        tasks.filter(
          item => item.completed
        ).length
      }
    </p>

  )
}

      <div style={styles.inputBox}>

        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) =>
            setTask(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (e.key === 'Enter')
              addTask();
          }}
          style={styles.input}
        />

        <button
          onClick={addTask} 
          style={styles.addBtn}
        >
          Add
        </button>
        
        <button
          onClick={deleteAll} 
          style={{
            ...styles.addBtn,
            backgroundColor: 'red',
          }}
        >
          Delete All
        </button>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }
          style={{
            ...styles.input,
            maxWidth: '120px',
          }}
        >
          <option value="all">
            All
          </option>
          <option value="completed">
            Completed
          </option>
          <option value="pending">
            Pending
          </option>
        </select>
          
      </div>

      {
        filteredTasks.map(item => (

          <div
            key={item.id}
            style={styles.taskBox}
          >
          
            <span
              onClick={() =>
                toggleTask(
                  item.id
                )
              }
              style={{
                ...styles.taskText,

                textDecoration:
                  item.completed
                    ? 'line-through'
                    : 'none',

                color:
                  item.completed
                    ? 'gray'
                    : 'black',
              }}
            >
              {item.title}
            </span>

            <button
              onClick={() =>
                deleteTask(
                  item.id
                )
              }
              style={styles.deleteBtn}
            >
              Delete
            </button>
            
            <button
              onClick={() => {
                const newTitle = prompt(
                  'Edit Task',
                  item.title
                );

                if (newTitle) {
                  editTask(
                    item.id,
                    newTitle
                  );
                }
              }} 
              style={{
                ...styles.editBtn,
              }}
            >
              Edit
            </button>

          </div>
        ))
      }

    </div>
  </div>
  );
}
const styles = {

  container: {
    width: '400px',
    margin: '50px auto',
    fontFamily: 'Arial',
  },

  inputBox: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },

  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
  },

  addBtn: {
    padding: '10px 20px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },

  taskBox: {
    display: 'flex',
    alignItems: 'center',

    backgroundColor:
      '#f2f2f2',

    padding: '10px',
    marginBottom: '10px',
  },

  taskText: {
    cursor: 'pointer',
  },

  deleteBtn: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px',
    cursor: 'pointer',
    marginLeft: 'auto',
  },

  editBtn: {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '8px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};


export default App;