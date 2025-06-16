import "./Loading.scss"

interface LoadingProps {
  message?: string
}

const Loading = ({ message = "Loading..." }: LoadingProps) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  )
}

export default Loading
