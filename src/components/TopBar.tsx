import logo from '../assets/pc-logo-color.svg'

export default function TopBar() {
  return (
    <div className="top-bar">
      <img src={logo} alt="Pampered Chef" className="top-bar__logo" />
    </div>
  )
}
