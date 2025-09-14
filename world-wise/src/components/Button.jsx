import style from './Button.module.css'

const Button = ({children , onClick , type}) => {
  return (
    <button className={`${style.btn} ${style[type]}`} onClick={onClick}>{children}</button>
  )
}

export default Button