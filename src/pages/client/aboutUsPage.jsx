import Header from "../../components/header";
import aboutUsBg from "../../assets/aboutUsBg.png";

export default function AboutUsPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 relative">
      
        <div
          className="absolute inset-0 w-full h-full  bg-cover bg-center sm:bg-top "
          style={{ backgroundImage: `url(${aboutUsBg})` }}
        ></div>

       
        <div className="relative z-10 flex items-center justify-center h-full px-4 py-8 sm:px-6 md:px-10">
          <div className="bg-primary shadow-2xl bg-opacity-80 p-10 rounded-xl max-w-5xl ">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-4 sm:mb-6">About Us</h1>
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
              Welcome to <span className="font-semibold">CBC Cosmetics</span>!  
              We are passionate about bringing you simple, effective, and trusted skincare and beauty products. 
              At CBC Cosmetics, we believe that beauty should be accessible to everyone. Our mission is to provide high-quality products 
              that deliver results, enhance self-care routines, and empower individuals to feel confident and beautiful every day.
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
              Every product we create is carefully tested, made with care, and designed to fit seamlessly into your daily routine. 
              We source the finest ingredients to ensure that each product performs effectively while being gentle on your skin. 
              Whether you’re looking to revamp your skincare routine or simply add a little extra glow to your day, 
              we’ve got something perfect for you.
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
              We are committed to sustainability, cruelty-free practices, and customer satisfaction. With CBC Cosmetics, you’re not just 
              getting a product – you’re joining a community that cares about quality, integrity, and making you feel your best.
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
              Have questions, feedback, or need support? We’d love to hear from you. Your journey to beauty and confidence starts with us, 
              and we're here to help every step of the way.
            </p>
            <p className="text-lg font-semibold">
              📧 Email us:{" "}
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
