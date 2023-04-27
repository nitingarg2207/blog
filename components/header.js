import styles from '../styles/header.module.css'

const header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.overlay}>
          <h1 className={styles.h1}>Beyond The Blog</h1>
          {/* <h3 className={styles.h3}>Reasons for Choosing US</h3> */}
          {/* <p className={styles.p}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
            nostrum quis, odio veniam itaque ullam debitis qui magnam
            consequatur ab. Vero nostrum quis, odio veniam itaque ullam debitis
            qui magnam consequatur ab.
          </p> */}
          <br />
          <button className={styles.button}>READ MORE</button>
        </div>
      </header>
    </>
  );
};

export default header;
