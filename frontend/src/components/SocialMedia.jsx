import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <>
    {/* GitHub Icon */}
    <a href="https://github.com/ankitjhagithub21" target="_blank" rel="noopener noreferrer">
      <FaGithub className="hover:text-black" color='black'/>
    </a>

    {/* LinkedIn Icon */}
    <a href="https://www.linkedin.com/in/ankitjha3731" target="_blank" rel="noopener noreferrer">
      <FaLinkedin className="hover:text-blue-700" color='#0073B1'/>
    </a>

    {/* Facebook Icon */}
    <a href="https://facebook.com/ankitjha2018" target="_blank" rel="noopener noreferrer">
      <FaFacebook className="hover:text-blue-400" color="#1F7BF2"/>
    </a>
  </>
  )
}

export default SocialMedia