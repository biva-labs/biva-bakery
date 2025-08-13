export default function Map() {
  return (
    <div className="w-full max-w-6xl mx-auto aspect-[16/9]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.2142968599974!2d92.79607951012136!3d24.822344077862216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374e4a5d9afde029%3A0x77ec6b58908020e9!2sBiva%20Bakers!5e0!3m2!1sen!2sin!4v1755022154901!5m2!1sen!2sin"
        style={{ border: 0 }}
        className="w-full h-full mt-10"
        loading="lazy"
      ></iframe>
    </div>
  );
}
