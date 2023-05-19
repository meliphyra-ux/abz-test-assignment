import Typography from "../typography/Typography"
import styles from './success.module.scss'

const Success = () => {
  return (
    <section className={styles['success--container']}>
      <Typography type='heading'>User successfully registered</Typography>
      <img src={process.env.PUBLIC_URL + '/images/success-image.svg'} alt="Success" width={328} height={290}/>
    </section>
  )
}

export default Success