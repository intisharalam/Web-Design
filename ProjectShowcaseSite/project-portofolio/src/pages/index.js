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
              2<sup className={styles.sup}>nd</sup> Year Fashion Design:Print Student
            </h2>
            <p>
              Hi, I'm Shumaita Alam Misbahul. Curious, collaborative and adaptable creative print designer.<br></br>
              Currently studing Fashion Design Print (FDP) at CSM.
              <br></br>
              I am based in East London, UK. 📍
            </p>
            <div className={styles.social_links}>
              <a href="https://wa.me/447897371857"><i className={"fab fa-whatsapp"}></i></a>
              <a href="https://www.instagram.com/shumaitamisbahul/"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/in/shumaita-misbahul-33934a219/"><i className="fab fa-linkedin-in"></i></a>
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
              An inquisitive, team-oriented and flexible designer.
            </h2>
            <p>
              I’m a Fashion Design Print student at Central Saint Martins, combining traditional craft with digital innovation. With experience in inclusive print workshops and hands-on fashion projects, I bring skills in pattern cutting, garment construction, and cross-cultural collaboration to a creative and technically grounded design practice.
              <br></br>
              <br></br>
             Multidisciplinary digital creator skilled in Adobe Creative Suite, Clo3D, Blender, and Unreal Engine. Fluent in English, Bengali, and Italian, enabling effective intercultural collaboration in creative projects.
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
               Displaced Impression 
              </h1>
              <p> This project reinterprets the traditional art of block printing through digital media, disrupting the act of imprinting to question authenticity, memory, and reproduction. </p>
              <div className={styles.skills}>
                <h4>Sublimation Print</h4>
                <h4>Repeat Print</h4>
                <h4>Adobe Ilustrator</h4>
              </div>
            </div>

            <div className={`${styles.imgCard}`}>
              <ImageSlider slides={RadioCtrlImg} />
            </div>
          </div>

          <div className={`${styles.card} ${styles.projCard}`}>
        
            <div className={styles.projText}>
              <h1>
               Future Blocks: Reimagining Block Printing in Digital Space
              </h1>
              <p>
                 This video showcases a creative reinterpretation of traditional block printing through cutting-edge digital media. Using Clo3D, Blender, and Unreal Engine, the project transforms handcrafted textile techniques into dynamic, immersive 3D visuals, blending heritage craftsmanship with futuristic design technology.
              </p>
              <div className={styles.skills}>
                <h4>Clo3D</h4>
                <h4>Blender</h4>
                <h4>Unreal Engine 5</h4>
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
               Roots of Silence
              </h1>
              <p>
                This project draws from observations of paddy fields under threat,using the landscape as a metaphor for cultural and environmental erasure.

              </p>
              <div className={styles.skills}>
                <h4>Research</h4>
                <h4>Textiles and Materiality</h4>
                <h4>Pattern Cutting</h4>
                
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.projCard}`}>
            <div className={styles.projText}>
              <h1>
                The Seat of Expression
              </h1>
              <p>
                The Seat of Expression investigates how a static object — a chair — can become a site of tension, resistance, and embodiment in performance.
              </p>
              <div className={styles.skills}>
                <h4>Screen Printing</h4>
                <h4>Drawing</h4>
                <h4>Monoprinting</h4>
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
                Unbound Shundori
              </h1>
              <p>
                This is a video featuring model Heeva Raza, shot and edited by Sandra Dileep. The concept, script, direction, and garment design were all created by me, exploring the duality of navigating identity within South Asian society. The film delves into themes of intersectionality and the complex layers of existence in this cultural context.
               </p>
              <div className={styles.skills}>
                <h4>Unconventional Garment construction</h4>
                <h4>Direction</h4>
                <h4>Design and Communication</h4>
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
                  <a href="mailto:samisbahul@gmail.com">
                    samisbahul@gmail.com
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
