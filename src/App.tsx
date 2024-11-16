import React, { useState } from 'react';
import { Home, User, Search, ShoppingCart, Facebook, Twitter, Instagram } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="bg-black border-b border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-24 h-24 border-2 border-white p-2">
                <div className="text-3xl font-bold text-center">
                  <div>R</div>
                  <div>RESAK</div>
                </div>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center space-x-6">
              <Home className="w-6 h-6 text-yellow-400 cursor-pointer hover:text-yellow-300" />
              <User className="w-6 h-6 text-green-400 cursor-pointer hover:text-green-300" />
              
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full bg-white text-black w-64 focus:outline-none"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              
              <ShoppingCart className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
              
              {/* Social Media Icons */}
              <div className="flex items-center space-x-4">
                <Facebook className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-400" />
                <Twitter className="w-6 h-6 text-blue-400 cursor-pointer hover:text-blue-300" />
                <Instagram className="w-6 h-6 text-pink-500 cursor-pointer hover:text-pink-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="animate__animated animate__rubberBand">
          <h1 className="text-5xl font-bold mb-4">Hello, World!</h1>
          <p className="text-lg mb-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente alias consequatur inventore maxime iste eius esse provident facilis atque.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Learn more
          </button>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16 animate__animated animate__bounceInLeft">
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-gray-900 rounded-lg shadow-xl p-6">
              <h5 className="text-xl font-bold mb-3">Card Title {num}</h5>
              <p className="mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex dolor vel reiciendis quas id mollitia adipisci ipsa non.</p>
              <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded">
                Go somewhere
              </button>
            </div>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-12 my-16 animate__animated animate__bounceInRight">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Workspace"
            className="rounded-lg shadow-xl"
          />
          <div>
            <h2 className="text-4xl font-bold mb-4">¡Suscríbete a mi canal!</h2>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad necessitatibus laboriosam voluptatum, eveniet deserunt omnis dolores.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid md:grid-cols-3 gap-8 my-16 animate__animated animate__backInUp">
          <form className="bg-gray-900 p-6 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email address</label>
              <input
                type="email"
                className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Enter email"
              />
              <p className="text-sm text-gray-400 mt-1">We'll never share your email with anyone else.</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Comment</label>
              <textarea
                className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
                rows={7}
                placeholder="Your comment"
              ></textarea>
            </div>
          </form>
          <div className="md:col-span-2">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
              alt="Office"
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-16 pt-8">
          <ul className="flex justify-center space-x-8 mb-8">
            {['Home', 'Features', 'Pricing', 'FAQs', 'About'].map((item) => (
              <li key={item}>
                <a href="#!" className="text-gray-400 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} UskoKruM2010
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;