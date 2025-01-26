import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {MdMessage,MdPhone,MdLocationPin, MdMail} from 'react-icons/md';

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
    <section className="py-12 ">
      <div className="max-w-6xl mx-auto w-full px-5">
        <h1 className="text-4xl font-semibold text-center  mb-10">Contact Us</h1>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 mb-16">
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
                  className="input input-success w-full"
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
                  className="input input-success w-full"
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
                  className="input input-success w-full"
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
                <button type="submit" className="btn btn-success w-full">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold  mb-4">Get in Touch</h2>
            <p className="text-lg  mb-5">We would love to hear from you. Please reach out to us for any inquiries or feedback!</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className='text-2xl p-2 rounded-full  bg-gray-300 text-green-600'> <MdMail/></span>
                <span className="text-lg ">contact@example.com</span>
              </li>
              <li className="flex items-center gap-3">
              <span className='text-2xl p-2 rounded-full bg-gray-300 text-green-600'> <MdPhone/></span>
                <span className="text-lg ">+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
              <span className='text-2xl p-2 rounded-full bg-gray-300 text-green-600'> <MdLocationPin/></span>
                <span className="text-lg ">123 Street Name, City, Country</span>
              </li>
            </ul>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Contact;
