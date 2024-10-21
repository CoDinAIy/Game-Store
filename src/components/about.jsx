import '../styles/about.css'
import Github from '../assets/GitHub.png'
import LinkedIn from '../assets/LinkedIn.png'
import css from '../assets/css.png'
import vue from '../assets/vue.png'
import react from '../assets/react.png'
import js from '../assets/js.png'
import html from '../assets/html.png'


export default function About() {

    const goToGithub = () => {
        window.location.href = 'https://github.com/CoDinAIy'
    }

    return (
        <div className="about-container">
            <div className="about-me-title">About Me</div>
            <div className="about-me-description">
                <div className="question-answer">
                    <div className="question">Who am I?</div>
                    <div className="answer">
                        My name is Dinay Halai, a recent biosciences graduate turned self-taught full stack engineer. I’ve spent the past two years learning everything in web and software development, consolidating my knowledge through projects like this one.
                    </div>
                </div>
                <div className="question-answer">
                    <div className="question">What is this project?</div>
                    <div className="answer">
                        This project showcases my proficiency with React by simulating an online video game store. Using the RAWG public API, users can explore a vast catalog, filter by genre and stats, and simulate a full checkout experience.
                    </div>
                </div>                
                <div className="question-answer">
                    <div className="question">What did I use?</div>
                    <div className="answer">
                        This project utilizes React, JavaScript, HTML, and CSS. The RAWG public API enables real-time game data fetching and display. Click the RAWG icon for more info.
                    </div>
                    <div className="tools-used">
                        <img src={html} alt="HTML icon" />
                        <img src={css} alt="CSS icon" />
                        <img src={js} alt="JavaScript icon" />
                        <img src={vue} alt="Vue.js icon" />
                        <img src={react} alt="React icon" />
                    </div>
                </div>
            </div>
            <div className="links">
                <img onClick={() => goToGithub()} src={Github} alt="GitHub icon" />
                <img src={LinkedIn} alt="LinkedIn icon" />
            </div>
        </div>
    )
}
