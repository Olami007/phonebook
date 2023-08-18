import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [totalContacts, setTotalContact] = useState(0);

  const handleAddContact = () => {
    //set total contacts to 1 more than it was before
    setTotalContact(totalContacts + 1);
  };
  return (
    <>
      <Navbar />

      <div>phone app</div>

      <h1>MY CONTACTS</h1>
      <div className="text-6xl absolute right-10" onClick={handleAddContact}>
        +
      </div>

      <h1 className="text-blue-400 ">Friends {totalContacts}</h1>

      <input
        className="py-2 border-black border-2 rounded-full"
        type="search"
        name=""
        id=""
      />

      <div></div>
    </>
  );
}

export default App;
