import { hc } from 'hono/client';
import { render, useState } from 'hono/jsx/dom';
import { AppType } from '.';
import Background from './components/background';
import ArrowRight from './components/icons/arrow-right';
import Scissors from './components/icons/scissors';

const client = hc<AppType>('http://localhost:5173/');

function App() {
   const [isAnimating, setIsAnimating] = useState(false);

   const handleClick = () => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
   };

   return (
      <>
         <Background />
         <header class="fixed w-full">
            <nav class="flex items-center justify-between px-6 py-4">
               <img src="./kutto.webp" alt="The logo of Kutto" />
               <a href="https://adrigarcia.dev" target="_blank">
                  <button class="group flex items-center gap-x-2 font-medium text-sm border border-foreground px-5 py-2 rounded-lg">
                     Check out my portfolio
                     <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </a>
            </nav>
         </header>
         <main class="flex flex-col items-center justify-center h-screen">
            <h1 class="font-black text-center text-6xl motion-preset-slide-up">
               Cut the clutter,
               <br />
               share smarter with Kutto
            </h1>
            <p class="text-center mb-8 mt-2 leading-snug opacity-80 motion-preset-slide-up motion-delay-200">
               Kutto makes sharing links effortless. Fast, simple, and reliable.
               <br />
               Your go-to URL shortener for seamless connections.
            </p>
            <form class="flex rounded-lg" onSubmit={(e: any) => e.preventDefault()}>
               <input
                  type="url"
                  placeholder="Enter your long and boring URL here..."
                  class="w-[600px] pl-4 rounded-s-lg caret-primary text-background"
               />
               <button
                  onClick={handleClick}
                  class={`!flex items-center gap-x-2 rounded-e-lg px-4 py-3 bg-primary font-semibold border border-primary hover:bg-foreground hover:text-primary transition-colors ${
                     isAnimating ? 'motion-preset-confetti' : ''
                  }`}>
                  Shorten!
                  <Scissors className="size-5" />
               </button>
            </form>
            {/* Table with the last three shortened urls, which shows the full url and the shortened url */}
         </main>
      </>
   );
}

const root = document.getElementById('root')!;
render(<App />, root);
