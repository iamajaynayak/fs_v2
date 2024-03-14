
export const Aboutme = () => {
  return (
    <div className="hero min-h-full">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-normal">Hello there</h2>
          <h1 className="text-4xl font-bold">My name is Ajay Nayak</h1>
          <p className="py-6">I'm a software developer expertise in front-end and back-end development.</p>
          <button onClick={() => window.open("https://www.linkedin.com/in/iamajaynayak/", "_blank")} className="btn btn-outline">
              
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};