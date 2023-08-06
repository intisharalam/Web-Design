import styles from "../styles/home.module.scss"
import Image from "next/image";
import PFP from "/public/PFP.jpg";
import HelloWorld from "/public/helloWorld.jpg"
import EERover from "/public/EERover.jpg"

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
              Currently a 2<sup className={styles.sup}>nd</sup> Year Electronics and Information Engineering (EIE)
              student at Imperial College London.<br></br>
              I am based in Whitechapel, London. 📍
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
              A dedicated engineering student
            </h2>
            <p>
              As a highly motivated 2nd-year EIE student at Imperial College London, I bring a diverse skill set encompassing Python, C++, C#, HTML, CSS, and Javascript. My passion for programming, web development, and hardware integration drives me to undertake innovative projects.
              <br></br>
              <br></br>
              I have demonstrated my expertise in building websites, creating games using Unity, and working on exciting electronics projects. Notably, I championed a science fair with a Java-based sonar radar system, showcasing my technical proficiency.
              <br></br>
              <br></br>
              Beyond technical abilities, I am multilingual in English, Bengali, and Italian, which enables effective communication and collaboration with people from various backgrounds.
              <br></br>
              <br></br>
              I am eager to contribute my technical skills, creativity, and problem-solving abilities to projects and organizations, striving to make a meaningful impact. A team player by nature, I enjoy collaborating with cross-functional teams to achieve outstanding results in web development.
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
              Each projects is a unique learning experience
            </h2>
          </div>

          <div className={`${styles.card1} ${styles.eeRover}`}>
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
                The rover was meant to be controlled using a self-hosted web page.
                I was incharge of designing the chassis body, the arm (hosted sensors)
                and creating and designing the web server and the web page.
              </p>
              <div className={styles.skills}>
                <h4>C#</h4>
                <h4>Fusion 360</h4>
              </div>
              <div>
                <h5>Links to source coming soon...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}