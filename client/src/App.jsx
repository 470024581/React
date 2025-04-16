import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import ItemList from './components/ItemList'
import AddItem from './components/AddItem'
import EditItem from './components/EditItem'
import ItemDetail from './components/ItemDetail'

function App() {
  return (
    <>
      <Header />
      <Container className="py-4">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/edit/:id" element={<EditItem />} />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
      </Container>
    </>
  )
}

export default App