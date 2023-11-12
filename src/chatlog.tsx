import { questions } from "./App"
import { useAns } from "./store"

export default function Chatlog() {
    const { prevAns } = useAns()
    return <>
        {prevAns.map((ans, idx) => (
            <div key={idx}>
                <p style={{marginRight:"auto", maxWidth:"50%", width:"fit-content", backgroundColor:"#2C6047", color:"white", fontSize:"0.8rem", borderRadius:"3rem", padding:"1vh 2vw"}}>{questions[idx]}</p>
                <p style={{backgroundColor:"#F4BC5E",maxWidth:"50%",marginLeft:"auto", width:"fit-content", color:"white", fontSize:"0.8rem", borderRadius:"3rem", padding:"1vh 2vw"}}>{ans}</p>
            </div>
        ))}
    </>
}