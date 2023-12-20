import { useEffect, useState } from 'react'
import { MdDeleteForever, MdUpdate } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'

const App = () => {

  const [focus, setFocus] = useState(1)
  const [isActive, setIsActive] = useState({
    title: '',
    description: '',
  })
  const [allToDo, setAllToDo] = useState([])
  const [completedTodo, setCompletedTodo] = useState([])
  const [isCompletedScreen, setIsCompletedScreen] = useState(false)


  const handleButtonClick = (buttonNumber) => {
    setFocus(buttonNumber === focus ? null : buttonNumber)
    if (buttonNumber === 1) {
      setIsCompletedScreen(false)
    }
    if (buttonNumber === 2) {
      setIsCompletedScreen(true)
    }
  }


  const handleChange = (e) => {
      setIsActive({ ...isActive, [e.target.name]: e.target.value })
  }


  const handleAdd = () => {

if(isActive.title.trim()===''){
  alert('Please enter a Title for the Todo.')
  return;
}

    let updatedTodoArr = [...allToDo]
    updatedTodoArr.push(isActive)
    setAllToDo(updatedTodoArr)
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))


    setIsActive({title:'', description:''})

    document.getElementById('titleInput').value = ''
    document.getElementById('descriptionInput').value = ''
  }


  const handleDelete = (index) => {
    let reducedTodo = [...allToDo]
    reducedTodo.splice(index, 1)

    localStorage.setItem('todolist', JSON.stringify(reducedTodo))
    setAllToDo(reducedTodo)
  }

  const handleDeleteCompleted = (index) =>{
    let reduceTodo = [...completedTodo]
    reduceTodo.splice(index,1)

    localStorage.setItem('completedTodo', JSON.stringify(reduceTodo))
    setCompletedTodo(reduceTodo)
  }


  const handleCompleted = (index) => {
    let now = new Date()
    let dd = now.getDate()
    let mm = now.getMonth() + 1
    let yyyy = now.getFullYear()
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s

    let filteredItem = {
      ...allToDo[index],
      completedOn: completedOn,
    }


    let updatedCompletedArr = [...completedTodo, filteredItem]
    setCompletedTodo(updatedCompletedArr)

    handleDelete(index)

    localStorage.setItem('completedTodo', JSON.stringify(updatedCompletedArr))
  }



  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'))
    if (savedTodo) {
      setAllToDo(savedTodo)
    }
    if(savedCompletedTodo){
      setCompletedTodo(savedCompletedTodo)
    }
  }, [])


  return (


    <div className="text-white overflow-auto bg-nearBlack min-h-screen h-full flex flex-col">
      <h1 className="text-center text-5xl mt-[5%] font-bold">To Do List</h1>

      <div className="to_do_wrapper flex flex-col self-center bg-nearBlackish w-screen md:w-fit md:ml-auto md:mr-auto mt-[3%] overflow-y-auto shadow-3xl p-12">

        <div className="input md:grid md:grid-cols-3 gap-4 border-b border-gray-400">

          <div className="flex flex-col">

            <label className=" p-2 text-2xl font-semibold">Title</label>
            <input
              type="text"
              name="title"
              id='titleInput'
              onChange={handleChange}
              className="p-1 ml-2 mb-5 focus:outline-beautifulGreen w-[70%] md:w-[200px] text-black focus"
              placeholder="What's the title?"
            />

          </div>

          <div className="flex flex-col ">
            
            <label className=" p-2 text-2xl font-semibold">Description</label>
            <input
              type="text"
              id='descriptionInput'
              name="description"
              onChange={handleChange}
              className="p-1 ml-2 mb-5 focus:outline-beautifulGreen w-[70%] md:w-[200px] text-black"
              placeholder="What's the description?"
            />

          </div>

          <button
            className="w-[50%] ml-2 bg-beautifulGreen self-center hover:bg-darkBeautifulGreen md:ml-[20%] mb-5"
            onClick={handleAdd}
          >
            Add
          </button>

        </div>

        <div className="button_area flex flex-row my-5">

          <button
            className={`to_do_button w-fit px-2  md:w-32 ${
              focus === 1 ? 'bg-beautifulGreen' : 'bg-gray-500'
            }`}
            onClick={() => handleButtonClick(1)}
          >
            Todo
          </button>
          <button
            className={`to_do_button w-fit px-2  md:w-32 ${
              focus === 2 ? 'bg-beautifulGreen' : 'bg-gray-500'
            }`}
            onClick={() => handleButtonClick(2)}
          >
            Completed
          </button>

        </div>

        <div>

          {isCompletedScreen === false && allToDo.length > 0 ? (
            allToDo.map((todo, index) => {
              return (
                <div
                  className="to_do_list bg-someGray p-5 flex flex-row justify-between  "
                  key={index}
                >
                  <div>
                    <h3 className=" text-xl font-semibold mb-2 text-beautifulGreen">
                      {todo.title}
                    </h3>

                    <p className="text-lg text-gray-400">{todo.description}</p>
                  </div>
                  <div className="flex flex-row">
                    <MdDeleteForever
                      className="text-3xl hover:text-red-500 cursor-pointer"
                      onClick={() => handleDelete(index)}
                    />
                    <FaCheck
                      className="text-3xl hover:text-beautifulGreen ml-4 cursor-pointer"
                      onClick={() => handleCompleted(index)}
                    />
                  </div>
                </div>
              )
            })
          ) : isCompletedScreen === false ? (
            <p className="text-white text-center">No task to Todo</p>
          ) : null}
          

          {isCompletedScreen === true && completedTodo.length > 0 ? (
            completedTodo.map((todo, index) => {
              return (
                <div
                  className="to_do_list bg-someGray p-5 flex flex-row justify-between  "
                  key={index}
                >
                  <div>
                    <h3 className=" text-xl font-semibold mb-2 text-beautifulGreen">
                      {todo.title}
                    </h3>

                    <p className="text-lg text-gray-400">{todo.description}</p>
                    <p className="text-lg text-gray-400">
                      {' '}
                      <small>Completed on: {todo.completedOn}</small>
                    </p>
                  </div>
                  <div className="flex flex-row">
                    <MdDeleteForever
                      className="text-3xl hover:text-red-500 cursor-pointer"
                      onClick={() => handleDeleteCompleted(index)}
                    />

                  </div>

                </div>
              )
            })
          ) : isCompletedScreen === true ? (
            <p className="text-white text-center">There is no Completed task</p>
          ) : null}

        </div>

      </div>

    </div>

  )
}
export default App
