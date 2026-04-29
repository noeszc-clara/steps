function Uncontrolled() {
  return <pre>Uncontrolled</pre>;
}

function Controlled() {
  return <pre>Controlled</pre>;
}

function App() {
  return (
    <div>
      <Uncontrolled />
      <hr />
      <Controlled />
    </div>
  );
}

export default App;
