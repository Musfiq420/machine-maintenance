import './App.css'
import RegisterForm from './components/RegisterForm/RegistrationForm'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-green-500 text-4xl font-bold">Fast Tracker</h1>
      <RegisterForm />
    </div>
  )
}

export default App
