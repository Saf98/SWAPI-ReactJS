import logo from "../images/logo.png";
const Header = () => {
  return <header>
    <div className={"header"}>
      <img srcSet={logo} />
    </div>
  </header>
}
export default Header;