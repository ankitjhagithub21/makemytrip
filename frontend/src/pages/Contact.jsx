import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Contact = () => {
    const initialData = { name: '', email: '', subject: '', message: '' };
  const [formData, setFormData] = useState(initialData);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        
    toast.error("Your message is sent successfully.")
    setFormData(initialData)
  };

  return (
    <section className="py-12 bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="max-w-6xl mx-auto w-full px-5">
        <h1 className="text-4xl font-semibold text-center text-white mb-10">Contact Us</h1>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
               {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>

         

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="input input-info w-full"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="input input-info w-full"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="input input-info w-full"
                  required
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="textarea textarea-info w-full"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-info w-full">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-lg text-white mb-4">We would love to hear from you. Please reach out to us for any inquiries or feedback!</p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="material-icons text-white mr-3">email</span>
                <span className="text-lg text-white">contact@yourdomain.com</span>
              </li>
              <li className="flex items-center">
                <span className="material-icons text-white mr-3">phone</span>
                <span className="text-lg text-white">+1 234 567 890</span>
              </li>
              <li className="flex items-center">
                <span className="material-icons text-white mr-3">location_on</span>
                <span className="text-lg text-white">123 Street Name, City, Country</span>
              </li>
            </ul>
          </div>

       
        </div>
      </div>
    </section>
  );
};

export default Contact;
