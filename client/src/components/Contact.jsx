import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ list }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${list.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [list.userRef]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for <span className="font-semibold">{list.name.toLowerCase()}</span>
          </p>

          <textarea
            id="message"
            value={message}
            onChange={handleMessage}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg resize-none"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${list.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
