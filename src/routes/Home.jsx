import { useState } from "react";
import Header from '../components/custom/Header'
import Hero from '../components/custom/Hero'
import '../index.css'

function Home() {
  const [isHeaderFading, setIsHeaderFading] = useState(false);

  return (
    <div>
      <Header isHeaderFading = { isHeaderFading } />
      <Hero setHeaderFading = { setIsHeaderFading } />
    </div>
  );
}

export default Home;
