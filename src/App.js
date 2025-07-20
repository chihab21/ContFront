import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './components/loveLetter.css';
import song from './Glimmer of Blooms - I Cant Get You Out Of My Head (LYRICS).mp3';
import { TypeAnimation } from 'react-type-animation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img2 from "./tas.jpg"



function App() {
  const audioRef = useRef(null);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const displayName = name.trim() || 'Tasnim Lejri';

  useEffect(() => {
    if (audioRef.current) {
      if (step >= 3 && step <= 8) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [step]);

  // Envelope open only on click, no effect needed here

  const sendResponse = async (type) => {
    try {
      await axios.post('https://confbackend.onrender.com/send-response', {
        type,
        name: displayName,
        message: type === 'message' ? message : undefined,
      });
    } catch {
      toast.error('Oops, failed to send. Please try again later.');
    }
  };

  const BackButton = () => (
    <button 
      className="btn-secondary mt-2 bba"
      onClick={() => setStep(step - 1)}
      disabled={step === 0}
    >
      ← Back
    </button>
  );

  return (
    <div className="container">
      <ToastContainer position="top-center" autoClose={3000} />
      

      <audio ref={audioRef} loop>
        <source src={song} type="audio/mpeg" />
      </audio>

      {step === 0 && (
        <div className="intro fade-in">
          <h1 className="intro-title">✨ Welcome ✨</h1>
          <img src={img2} alt="Tasnim Lejri" className="profile-img" />
          <p className="intro-text">A little something made just for you, {displayName}...</p>
          <button onClick={() => setStep(1)} className="btn-primary">Begin</button>
        </div>
      )}

      {step === 1 && (
        <div className="card fade-in">
          <h1>Welcome 💌</h1>
          <p>Just a little message before we continue...</p>
          <p>I'm happy you're here 😊</p>
          <button onClick={() => setStep(2)} className="btn-primary">Continue</button>
          <BackButton />
        </div>
      )}

      {step === 2 && (
        <div className="card fade-in">
          <h1>Hey {displayName} 🌸</h1>
          <TypeAnimation
            sequence={[
              `${displayName}...`,
              1000,
              'Rani nheb ngollek haja...',
           
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '1.3em', display: 'inline-block', color: '#e91e63', fontWeight: '600' }}
            repeat={0}
          />
          <button onClick={() => setStep(3)} className="btn-primary">Next</button>
          <BackButton />
        </div>
      )}

      {step === 3 && (
        
        <div className="card fade-in">
                <div className="floating-hearts">💖 💕 💘 💝 💞</div>

          
          <h1>Confession 💞</h1>
          <p>


            Hey Tasnim, I don’t know if you’re seeing someone, and of course I completely respect that if you are. I just felt like I had to say to you seem like someone truly special. There’s something about your presence, your vibe… that really stood out to me. You’re incredibly beautiful, and your smile is honestly the cutest. I’d genuinely love the chance to get to know you, if that’s something you’d feel comfortable with. Either way, I hope life brings you all the joy and peace you deserve ✨


          </p>
          <button onClick={() => setStep(4)} className="btn-primary mt-2">Continue</button>
          <BackButton />
        </div>
      )}

      {step === 4 && (
        <div className="card fade-in confession-bg">
                <div className="floating-hearts">💖 💕 💘 💝 💞</div>

          <div className="confession-flex">
            <div className="confession-left">
              <div className="envlope-wrapper">
                <div
                  id="envelope"
                  className={isOpen ? 'open' : 'close'}
                  title="Click to open/close envelope"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="front flap"></div>
                  <div className="front pocket"></div>

                  <div className="letter">
                    <div className="words line1">To: {displayName}</div>
                    <div className="words line2">Your smile is literally the cutest thing I have ever seen in my life.
</div>
                  
                  </div>

                  <div className="hearts">
                    <div className="heart a1"></div>
                    <div className="heart a2"></div>
                    <div className="heart a3"></div>
                  </div>
                </div>
              </div>

              <button onClick={() => setStep(5)} className="btn-primary mt-4">Next</button>
              <BackButton />
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
  <div className="card fade-in">
          <div className="floating-hearts">💖 💕 💘 💝 💞</div>

    <h1>So… how do you feel about this?</h1>
    <div className="choices">
      <button
        className="yes"
        onClick={() => {
          sendResponse('yes');
          setStep(6);
        }}
      >
        Absolutely! 💕
      </button>
      <button
        className="no"
        onClick={() => {
          sendResponse('no');
          setStep(7);
        }}
      >
        Not really 🙁
      </button>
    </div>
    <BackButton />
  </div>
)}

{step === 6 && (
  <div className="card fade-in">
          <div className="floating-hearts">💖 💕 💘 💝 💞</div>

    <h1>Woohoo! 💖</h1>
    <p>This makes me so happy! Can’t wait to chat and see what’s next ✨</p>
    <button onClick={() => setStep(8)} className="btn-primary mt-2">Send me a surprise 🎁</button>
    <BackButton />
  </div>
)}


      {step === 7 && (
        <div className="card fade-in">
                <div className="floating-hearts">💖 💕 💘 💝 💞</div>

          <h1>It’s okay 😊</h1>
          <p>Thanks for taking time to read this... I just needed to say it ❤️</p>
          <button onClick={() => setStep(8)} className="btn-primary mt-2">Send me a message</button>
          <BackButton />
        </div>
      )}

      {step === 8 && (
        <div className="card fade-in">
                <div className="floating-hearts">💖 💕 💘 💝 💞</div>

          <h1>Send me a message  🥰</h1>
          <textarea
            placeholder="Type something sweet..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="text-area"
          />
          <button
            onClick={async () => {
              if (!message.trim()) {
                toast.warn('Please type a message.');
                return;
              }
              await sendResponse('message');
              toast.success('Thank you ❤️');
              setMessage('');
              setStep(0);
              setIsOpen(false); // close envelope when restart
            }}
            className="btn-primary mt-2"
          >
            
            Send
          </button>
          <BackButton />
        </div>
      )}
    </div>
  );
}

export default App;
