import { Route, Routes } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import NoteDetailPage from './pages/NoteDetailPage'

const App = () => {
  return (
    <div data-theme='forest' className='relative h-full w-full'>

      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/create' element={<CreatePage />}></Route>
        <Route path='/note/:id' element={<NoteDetailPage />}></Route>
      </Routes>
    </div>
  )
}

export default App