import styles from "../styles/projgallery.module.scss"
import { useEffect } from 'react';
import ImageSlider from '../components/imageSlider';
import VideoPlayer from '../components/videoPlayer';
import Image from "next/image";
import portfolioImg from '/public/PortfolioWebPage.jpeg';



const RadioCtrlImg = [
  '/Radio_Controller/RadioCtrl1.jpg',
  '/Radio_Controller/RadioCtrl2.jpg',
  '/Radio_Controller/RadioCtrl3.jpg',
  '/Radio_Controller/RadioCtrl4.jpg',
  '/Radio_Controller/RadioCtrl5.jpg',
  '/Radio_Controller/RadioCtrl6.jpg',
  '/Radio_Controller/RadioCtrl7.jpg',
  // Add more image URLs here
];

const videos = [
  '/videos/sunnyLand.mp4',
  '/videos/cubeRun.mp4',
  // Add more video paths here
];

export default function ProjectGallery() {

  useEffect(() => {
    const tabs = document.querySelectorAll(`.${styles.tab_btn}`);
    const all_content = document.querySelectorAll(`.${styles.content}`);

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Remove 'active' class from all tabs and contents
        tabs.forEach(t => t.classList.remove(styles.active));
        all_content.forEach(content => content.classList.remove(styles.active));

        // Add 'active' class to the clicked tab
        tab.classList.add(styles.active);

        // Add 'active' class to the corresponding content based on index
        all_content[index].classList.add(styles.active);
      });
    });
  }, []);

  return (
    <>
      <div className={styles.headerSect}>
        <section>
          <h2>Project Portfolio</h2>
          <div></div>
          <p>
            Welcome to my Project Portfolio!<br></br><br></br>
            Here you will find most of my works, old and new,
            the tabs below sectioned them based on their theme.<br></br><br></br>
            Some are old projects from many years back
            before I made this website. Hence, some may lack in documentation.<br></br><br></br>
            <strong>NOTE: Click the tabs below to see my projects!!!</strong>
          </p>
        </section>
      </div>

      <div className={styles.projGallSect}>

        <div className={styles.tabSect}>
          <button className={styles.tab_btn}>Electronics</button>
          <button className={styles.tab_btn}>Programming</button>
          <button className={styles.tab_btn}>Events</button>
        </div>

        <div className={styles.contentSect}>

          <div className={styles.content}>

            <section className={styles.projCard}>
              <div className={styles.projDescr}>
                <h2>Radio Controller</h2>
                <p>
                  In this project I used Arduino Nano and nRF24L01 module to make a radio transmitter.
                  The Arduino Nano takes in digital and analog inputs components on board and packages them
                  in a data structure that is  sent to receiver that decodes it and uses it as needed.
                  What made this different from my other projects is the use of PCB which I designed using
                  CircuitMaker 2 (Altium).
                </p>
                <div className={styles.links}>
                  <a href="/Radio_Controller/RadioCtrl_Schematic.pdf" download>Schematic</a>
                  <a href="/Radio_Controller/nRF24_Universal_Controller.zip" download>Gerber File</a>
                  <a href="/Radio_Controller/Ctrl_Case.zip" download>Chassis File</a>
                </div>
              </div>

              <ImageSlider slides={RadioCtrlImg} />
            </section>

          </div>

          <div className={styles.content}>
            <section className={styles.projCard}>
              <div className={styles.projDescr}>
                <h2>NextJS Web App</h2>
                <p>
                  After being rejected for a Full-Stack Developer role for an internship,
                  I decided to make this web site to showcase my skills following the constructive
                  feedback given to me by the employer. I used industry used libraries such as NextJS
                  for the development of the website to implement my designed site that I wireframed.
                  <br></br><br></br>
                  Click/Hover the image below for a cool animation!
                </p>
                <div className={styles.links}>
                  <a href="https://github.com/intisharalam/Web-Design/tree/main/ProjectShowcaseSite/project-portofolio" download>
                    <img src="github_logo.svg" className={styles.logo}></img>
                    Github Link
                  </a>
                </div>
              </div>
              <div className={styles.siteImgContainer}>
                <div className={styles.screenshot}>
                  <Image src={portfolioImg} alt="Website Screenshot" />
                </div>
              </div>
            </section>

            <section className={styles.projCard}>
              <div className={styles.projDescr}>
                <h2>CubeRun 3D Game</h2>
                <p>
                During my early high school years in Bangladesh, faced with a lack of engaging activities, I turned to self-taught programming. 
                As I progressed, I embraced game development as a way to apply my skills. 
                Guided by a tutorial, I created my first game, "CubeRun," which marked the beginning of my journey into the world of game design. 
                <br></br><br></br>
                This experience ignited a passion for coding and motivated me to take on more complex projects.
                </p>
                <div className={styles.links}>
                  <a href="https://github.com/intisharalam/Web-Design/tree/main/ProjectShowcaseSite/project-portofolio" download>
                    <img src="github_logo.svg" className={styles.logo}></img>
                    Github Link
                  </a>
                </div>
              </div>
              
              <div className={styles.video_container}>
                <VideoPlayer 
                videoSrc={videos[1]}
                />
              </div>
            
            </section>

            <section className={styles.projCard}>
              <div className={styles.projDescr}>
                <h2>Sunny Land 2D Platformer Game</h2>
                <p>
                Back in my early high school days in Bangladesh, I was often bored due to a lack of engaging activities. 
                To counter this, I taught myself programming, and soon, I decided to delve into game development. 
                My first game, "CubeRun," was completed with the help of a tutorial. 
                Encouraged by this, I set my sights on a more challenging project – "Sunny Land."
                <br></br>
                This journey has been about transforming my boredom into creativity and growth.
                </p>
                <div className={styles.links}>
                  <a href="https://github.com/intisharalam/Web-Design/tree/main/ProjectShowcaseSite/project-portofolio" download>
                    <img src="github_logo.svg" className={styles.logo}></img>
                    Github Link
                  </a>
                </div>
              </div>
              
              <div className={styles.video_container}>
                <VideoPlayer 
                videoSrc={videos[0]}
                />
              </div>
            
            </section>
          </div>

          <div className={styles.content}>

          </div>
        </div>

      </div>
    </>
  );
}
