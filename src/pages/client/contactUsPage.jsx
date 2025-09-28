import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/header";
import contactUsBg from "../../assets/contactUsBg.png"; 

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [massage, setMassage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !massage) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // assuming login token
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/contact-us",
        { name, email, massage },
        { headers: token ? { Authorization: "Bearer " + token } : {} }
      );
      toast.success(res.data.message || "Message sent successfully");
      // clear form after submit
      setName("");
      setEmail("");
      setMassage("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />

      <div className="flex-1 relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${contactUsBg})` }}
        ></div>

        {/* Overlay content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="bg-primary shadow-2xl bg-opacity-80 p-10 rounded-xl max-w-5xl w-full">
            <h1 className="text-4xl text-center font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-center mb-6">
              We’d love to hear from you! Whether you have questions about our products, need support, or just want to share your feedback,
              our team is here to help.
            </p>

            {/* Contact form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
              <textarea
                placeholder="Your Message"
                value={massage}
                onChange={(e) => setMassage(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full h-32"
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="bg-accent text-white px-4 py-2 rounded-lg hover: transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            <p className="text-lg font-semibold mt-6">
              📧 Email us directly:{" "}
              <a href="mailto:support@cbccosmetics.com" className="text-blue-600">
                support@cbccosmetics.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
