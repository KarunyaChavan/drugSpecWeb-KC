import { useEffect, useState } from "react";
import videoBg from "../../assets/videoBg.mp4";
import videoBg2 from "../../assets/videoBg2.mp4";
import videoBg3 from "../../assets/videoBg3.mp4";

function Hero() {
  const facts = [
    "'Calcium in milk can bind to certain antibiotics, like tetracyclines, reducing their effectiveness. Avoid taking these medications with dairy products for better absorption.'",
    "'Grapefruit and its juice can interfere with enzymes that metabolize medications. This can lead to higher or lower drug levels in your body, affecting their efficacy.'",
    "'Vitamin K, abundant in spinach and kale, can counteract blood thinners like warfarin. Monitor your diet and consult your doctor if you're on these medications.'",
    "'Excessive caffeine intake can amplify the effects of stimulants, increasing heart rate and causing jitteriness. Balance your coffee or tea habits when on such medications.'",
    "'Alcohol can impair the liver's ability to metabolize many medications, potentially causing harmful side effects. Be cautious with alcohol when taking drugs like painkillers or antidepressants.'",
    "'High-fat meals can delay the absorption of certain medications, affecting how quickly they start to work. Consider medication timing around meals to optimize their effectiveness.'",
    "'Iron supplements can interfere with the absorption of thyroid medications and some antibiotics. Take them a few hours apart to avoid interactions.'",
  ];

  const videos = [videoBg, videoBg2, videoBg3];
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoFading, setIsVideoFading] = useState(false);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
        setFade(true);
      }, 1000);
    }, 7000);

    return () => clearInterval(factInterval);
  }, [facts.length]);

  const handleVideoEnd = () => {
    setIsVideoFading(true);
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      setIsVideoFading(false);
    }, 1000);
  };

  return (
    <div className="main">
      <video
        className={`video ${isVideoFading ? "fade-out" : ""}`}
        src={videos[currentVideoIndex]}
        autoPlay
        muted
        onEnded={handleVideoEnd}
      />
      <div className="overlay">
        <div className="content">
          <ul className="facts-list">
            <li
              className={`fact-item ${fade ? "fade-in" : "fade-out"}`}
              key={currentFactIndex}
            >
              {facts[currentFactIndex]}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Hero;