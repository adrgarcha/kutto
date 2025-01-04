import { render } from 'hono/jsx/dom';
import Background from './components/background';
import Navbar from './components/navbar';
import ShortenUrlForm from './components/shorten-url-form';

function App() {
   return (
      <>
         <Background />
         <Navbar />
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
            <ShortenUrlForm />
            {/* Table with the last three shortened urls, which shows the full url and the shortened url */}
         </main>
      </>
   );
}

const root = document.getElementById('root')!;
render(<App />, root);
