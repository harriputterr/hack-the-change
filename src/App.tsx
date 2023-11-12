import { useEffect, useRef, useState } from 'react'
import './App.css'
import Chatlog from './chatlog'
import { useAns } from './store'

export const questions = [
  "Hi, How' s your day going? 😇",
  "What brings you to me today?",
  "Have you ever seen a counselor before?",
  "What do you see as being the biggest issue?",
  "How does this problem makes you feel better?",
  "How does it make you feel like?",
  "how long have you been feeling the same emotions?"
]

function App() {
  const [questionIdx, setQuestionIdx] = useState<number>(0)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { prevAns, setPrevAns } = useAns()

  const handleInputChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = `${textarea.scrollHeight}px`;
      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = newHeight;
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const currVal = textareaRef.current?.value;
        setQuestionIdx((idx) => (idx === questions.length - 1 ? 0 : idx + 1));

        if (currVal) {
          const newArray = [...prevAns, currVal];
          setPrevAns(newArray);
          textareaRef.current!!.value = ''; // Use current.value directly
        }
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevAns]); // 

  return (
    <>
      <div>

      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2>Chat</h2>
        <img src="FloatingRobot.jpg" id='robot-logo' style={{ width: "3rem", aspectRatio: "1/1", height: "100%" }} alt="" />
      </div>
      <Chatlog />
      <p style={{ marginRight: "auto", fontSize: "0.8rem", maxWidth: "50%", width: "fit-content", backgroundColor: "#2C6047", color: "white", borderRadius: "3rem", padding: "1vh 2vw" }}>{questions[questionIdx]}</p>
      <textarea onInput={handleInputChange}
        rows={1} style={{ overflow: "visible", borderRadius: "3rem", padding: "1.5vh 1.5vw", width: "90%", fontSize: "1.2rem" }} ref={textareaRef}></textarea>
    </>
  )
}

// overflow: visible; border-radius: 3rem; padding: 1.5vh 1.5vw; width: 90%; font-size: 1.2rem;
export default App
