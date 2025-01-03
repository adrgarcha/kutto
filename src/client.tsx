import { render } from 'hono/jsx/dom';

function App() {
   return (
      <>
         <h1 className="font-black">Hello, Kutto! 👋</h1>
      </>
   );
}

const root = document.getElementById('root')!;
render(<App />, root);
