import styles from "../styles/home.module.scss"
import Image from "next/image";
import PFP from "/public/PFP.jpg";
import HelloWorld from "/public/helloWorld.jpg"
import ImageSlider from '../components/imageSlider';
import VideoPlayer from '../components/videoPlayer';

const RadioCtrlImg = [
  '/Simi/Proj_1/proj_1_1.jpg',
  '/Simi/Proj_1/proj_1_2.jpg',
  '/Simi/Proj_1/proj_1_3.jpg',
  '/Simi/Proj_1/proj_1_4.jpg',
  '/Simi/Proj_1/proj_1_5.jpg',
  '/Simi/Proj_1/proj_1_6.jpg',
  '/Simi/Proj_1/proj_1_7.jpg',
  '/Simi/Proj_1/proj_1_8.png',
  '/Simi/Proj_1/proj_1_9.jpg',
];
const EERoverImg = [
  '/Simi/Proj_2/proj_2_1.jpg',
  '/Simi/Proj_2/proj_2_2.jpg',
  '/Simi/Proj_2/proj_2_3.jpg',
  '/Simi/Proj_2/proj_2_4.jpg',
  '/Simi/Proj_2/proj_2_5.jpg',
  '/Simi/Proj_2/proj_2_6.jpg',
];
const TurbineImg = [
  '/Simi/Proj_3/proj_3_1.jpg',
  '/Simi/Proj_3/proj_3_2.jpg',
  '/Simi/Proj_3/proj_3_3.jpg',
  '/Simi/Proj_3/proj_3_4.jpg',
  '/Simi/Proj_3/proj_3_5.jpg',
  '/Simi/Proj_3/proj_3_6.jpg',
  '/Simi/Proj_3/proj_3_7.jpg',
  '/Simi/Proj_3/proj_3_8.jpg',
  '/Simi/Proj_3/proj_3_9.jpg',
];

const videos = [
  '/videos/proj_4_10.mp4',
  '/videos/Block_print.mp4',
];

export default function Home() { 
  return (
    <>
      <div className={`${styles.welcomeSect}`}>
        <div className={`${styles.container} ${styles.sectionB}`}>
          <div className={styles.welcomeIntro}>
            <h2>
              3<sup className={styles.sup}>rd</sup> Year EEE Student
            </h2>
            <p>
              Hi, I'm Intishar Alam Misbahul. An ardent learner and maker.<br></br>
              Currently a 3<sup className={styles.sup}>rd</sup> Year Electrical and Electronic Engineering (EEE)
              student at Imperial College London.<br></br>
              I am based in East London, UK. 📍
            </p>
            <div className={styles.social_links}>
              <a href="https://wa.me/447928189195"><i className={"fab fa-whatsapp"}></i></a>
              <a href="https://www.instagram.com/misbahulintishar.inti/"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com/in/intisharalam"><i className="fab fa-linkedin-in"></i></a>
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
              As a highly motivated 3rd-year EIE student at Imperial College London, I bring a diverse skill set encompassing Python, C family, HTML, CSS, and ReactJs. My passion for programming, web development, and hardware integration drives me to undertake innovative projects.
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
            <div className={styles.projText}>
              <h1>
                Smart Grid System - 2<sup>nd</sup> Yr
              </h1>
              <p> As part of the Smart Power Grid Project at Imperial College London, I collaborated with my team to develop an innovative solar energy system.
                I utilized my CAD skills to design the hardware and played a key role in characterizing the photovoltaic array and Battery Management System, achieving a 25% increase in efficiency.
                Our project demonstrated our ability to apply theoretical knowledge to practical applications in energy management. </p>
              <div className={styles.skills}>
                <h4>Embedded Systems</h4>
                <h4>Python</h4>
                <h4>Web Design</h4>
              </div>
            </div>

            <div className={`${styles.imgCard}`}>
              <ImageSlider slides={RadioCtrlImg} />
            </div>
          </div>

          <div className={`${styles.card} ${styles.projCard}`}>
        
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

                        <div className={`${styles.imgCard}`}>
            <div className={styles.video_container}>
              <VideoPlayer
                videoSrc={videos[1]}
              />
            </div>
            </div>
          </div>


          <div className={`${styles.card} ${styles.projCard}`}>
            <div className={`${styles.imgCard}`}>
              <ImageSlider slides={EERoverImg} />
            </div>

            <div className={styles.projText}>
              <h1>
                EERover - 1<sup>st</sup> Yr
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

            <div className={`${styles.imgCard}`}>
              <ImageSlider slides={TurbineImg} />
            </div>

          </div>

          <div className={`${styles.card} ${styles.projCard}`}>
            
            <div className={`${styles.imgCard}`}>
            <div className={styles.video_container}>
              <VideoPlayer
                videoSrc={videos[0]}
              />
            </div>
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

          {/* <div className={styles.projGallLink}>
            <button><a href="/projGallery"> 👉 Click here to see my Portfolio 👈 </a></button>
          </div> */}

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
                  <a href="mailto:shumaita.alam@outlook.com">
                    shumaita.alam@outlook.com
                  </a>
                </h3>
              </div>
            </div>

                        <div className={styles.item}>
              <i class="material-icons">description</i>
              <div>
                <h2>CV</h2>
                <h3>
                  <a href="/Simi/CV_Shumaita.pdf" target="_blank">
                    Shumaita Alam Misbahul
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
