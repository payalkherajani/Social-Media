import React from 'react'

const Footer = () => {
    return (
        <footer className=" container bg-pink-400 py-10 px-2 md:px-8  text-white flex justify-between bg-pink-400 text-white max-w-full" >
            <h6><strong>Copyright &copy; 2021 Panchayat</strong> </h6>
            <ul className="flex space-x-4  md:space-x-6">
                <li className="hover:text-pink-800">
                    <a href="https://twitter.com/payal_kherajani" target="_blank">
                        <i className={`fab fa-twitter text-2xl`}></i>
                    </a>
                </li>

                <li className="hover:text-pink-800">
                    <a href="https://www.linkedin.com/in/payalkherajani/" target="_blank">
                        <i className={`fab fa-linkedin-in text-2xl`}></i>
                    </a>
                </li>

                <li className="hover:text-pink-800">
                    <a href="https://github.com/payalkherajani" target="_blank">
                        <i className={`fab fa-github text-2xl`}></i>
                    </a>
                </li>

                <li className="hover:text-pink-800">
                    <a href="https://www.instagram.com/payal_kherajani/" target="_blank">
                        <i className={`fab fa-instagram text-2xl`}></i>
                    </a>
                </li>
            </ul>
        </footer>
    );
};


export default Footer