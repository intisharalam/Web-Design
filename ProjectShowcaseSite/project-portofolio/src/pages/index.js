import styles from "../styles/home.module.scss"
import Image from "next/image";
import PFP from "/public/PFP.jpg";
import HelloWorld from "/public/helloWorld.jpg"
import EERover from "/public/EERover.jpg"
import WindTurbine from "/public/windTurbine.jpg"
import comingSoon from "/public/comingSoon.png"
import RadioController from "/public/RadioCtrl.jpg"

export default function Home() {
  return (
    <>
      <div className={`${styles.welcomeSect}`}>
        <div className={`${styles.container} ${styles.sectionB}`}>
          <div className={styles.welcomeIntro}>
            <h2>
              2<sup className={styles.sup}>nd</sup> Year EIE Student
            </h2>
            <p>
              Hi, I'm Intishar Alam Misbahul. An ardent learner and maker.<br></br>
              Currently a 2<sup className={styles.sup}>nd</sup> Year Electronic and Information Engineering (EIE)
              student at Imperial College London.<br></br>
              I am based in East London, UK. 📍
            </p>
            <div className={styles.social_links}>
              <a href="https://wa.me/447928189195"><i className={"fab fa-whatsapp"}></i></a>
              <a href="https://www.instagram.com/misbahulintishar.inti/"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com/in/intishar-alam-misbahul-b10a42222"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className={styles.imgContainer}>
            <Image
              className={styles.logoImg}
              src={PFP}
              alt="logo">
            </Image>
          </div>
        </div>
      </div>

      <div className={`${styles.aboutMeSect}`} id="about">
        <div className={`${styles.container} ${styles.sectionW}`}>

          <div className={styles.imgContainer}>
            <Image
              className={styles.logoImg}
              src={HelloWorld}
              alt="logo">
            </Image>
          </div>

          <div className={styles.aboutMe}>
            <h1>
              About Me
            </h1>
            <h2>
              A dedicated engineering student 🎓
            </h2>
            <p>
              As a highly motivated 2nd-year EIE student at Imperial College London, I bring a diverse skill set encompassing Python, C family, HTML, CSS, and ReactJs. My passion for programming, web development, and hardware integration drives me to undertake innovative projects.
              <br></br>
              <br></br>
              I have demonstrated my expertise in building websites (such as this one), creating games using Unity, and working on exciting electronics projects. Notably, I championed a science fair with a Java-based sonar radar system, showcasing my technical proficiency.
              <br></br>
              <br></br>
              Beyond technical abilities, I am multilingual in English, Bengali, and Italian, which enables effective communication and collaboration with people from various backgrounds.
            </p>
          </div>

        </div>
      </div>

      <div className={`${styles.projectSect}`}>
        <div className={`${styles.container} ${styles.sectionB}`}>
          <div className={`${styles.sectHeading}`}>
            <h1>
              Top Projects
            </h1>
            <h2>
              Each project is a unique learning experience
            </h2>
          </div>

          <div className={`${styles.card} ${styles.projCard}`}>
            <div className={`${styles.imgCard}`}>
              <Image
                src={EERover}
                alt=""
              >
              </Image>
            </div>

            <div className={styles.projText}>
              <h1>
                EERover 1<sup>st</sup> - Year Project
              </h1>
              <p>
                EERover is a project I did in a team at the end of my 1st-Year.
                The rover was designed to be controlled using a self-hosted web page.
                I was incharge of designing the chassis body, the arm (hosted sensors)
                and creating and designing the web server and the web page.
              </p>
              <div className={styles.skills}>
                <h4>Front-End</h4>
                <h4>Fusion 360</h4>
                <h4>Arduino</h4>
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.projCard}`}>
            <div className={styles.projText}>
              <h1>
                Makerspace Turbine Project 2<sup>nd</sup> Place
              </h1>
              <p>
                As a participant in Imperial's Makerspace turbine project, I worked with Antonio (on the right) to design our own turbine blade.
                I used my CAD skills to design the blade while Antonio helped tweak it to make it more aerodynamic.
                <br></br>
                We came second only losing 1st place by 0.001 in power coefficient of our blade.
              </p>
              <div className={styles.skills}>
                <h4>Fusion 360</h4>
              </div>
            </div>

            <div className={`${styles.imgCard}`}>
              <Image
                src={WindTurbine}
                alt=""
              >
              </Image>
            </div>
          </div>

          <div className={`${styles.card} ${styles.projCard}`}>
          <div className={`${styles.imgCard}`}>
              <Image
                src={RadioController}
                alt="Coming Soon"
              >
              </Image>
            </div>

            <div className={styles.projText}>
              <h1>
                Arduino & nRF24 Radio Controller
              </h1>
              <p>
              In this project I used Arduino Nano and nRF24L01 module to make a radio transmitter. 
              The Arduino Nano takes in digital and analog inputs components on board and packages them in a 
              data structure that is sent to receiver that decodes it and uses it as needed. What made this 
              different from my other projects is the use of PCB which I designed using CircuitMaker 2 (Altium).
              </p>
              <div className={styles.skills}>
                <h4>Arduino</h4>
                <h4>Soldering</h4>
                <h4>Altium CircuitMaker 2</h4>
              </div>
            </div>
          </div>

          <div className={styles.projGallLink}>
            <button><a href="/projGallery"> 👉 Click here to see my Portfolio 👈 </a></button>
          </div>

        </div>
      </div>

      <div className={`${styles.contactSect}`} id="contact">
        <div className={`${styles.container} ${styles.sectionW}`}>
          <div className={styles.contactTitle}>
            <h3>Contact</h3>
            <h1>Get in touch!👇</h1>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.item}>
              <i className="material-icons">map</i>
              <div>
                <h2>Location</h2>
                <h3>London, UK</h3>
              </div>
            </div>

            <div className={styles.item}>
              <i className="material-icons">local_post_office</i>
              <div>
                <h2>Email</h2>
                <h3>
                  <a href="mailto:intisharalam@outlook.com">
                    intisharalam@outlook.com
                  </a>
                </h3>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </>
  )
}