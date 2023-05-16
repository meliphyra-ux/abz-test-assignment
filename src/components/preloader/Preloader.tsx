import styles from './preloader.module.scss'

const Preloader = () => {
  return (
    <img className={styles.preloader} src='/images/Preloader.svg' alt="Preloader" width={48} height={48}/>
  )
}

export default Preloader