import { useNavigate } from 'react-router-dom'
export default function NotFound () {
  const navigate = useNavigate()
  const navigateToHome = () => {
    navigate('/todos')
  }
  return (
    <>
      <div>Page not found click on button for home page</div>
      <div>
        <button onClick={navigateToHome}>Click Here</button>
      </div>
    </>
  )
}
