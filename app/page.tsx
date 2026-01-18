'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Phone, Instagram, Facebook } from 'lucide-react';

const RamenPricelist = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!(entry.target instanceof HTMLElement)) return;
          const index = entry.target.dataset.index;
          if (!index) return;
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, index]));
          } else {
            setVisibleElements((prev) => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-index]');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const categories = [
    {
      title: "STRAIGHT RAMEN",
      items: [
        { name: "ICHIRAN 5", price: "₱1200", image: "🍜" },
        { name: "ICHIRAN 2", price: "₱650", image: "🍜" }
      ]
    },
    {
      title: "CURLY RAMEN",
      items: [
        { name: "ICHIRAN 5", price: "₱1200", image: "🍜" },
        { name: "PER PIECE", price: "₱250", image: "🍜" }
      ]
    },
    {
      title: "NISSIN",
      items: [
        { name: "NISSIN SEAFOOD", price: "₱120", image: "🥤" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div 
          data-index="header"
          className={`text-center mb-12 transition-all duration-1000 transform ${
            visibleElements.has('header') ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl font-bold text-red-800 mb-2 tracking-wide">
            PRICELIST
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category, catIndex) => (
            <div
              key={catIndex}
              data-index={`category-${catIndex}`}
              className={`transition-all duration-700 transform ${
                visibleElements.has(`category-${catIndex}`) ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
              }`}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-red-800 hover:shadow-2xl transition-shadow duration-300">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-red-800 to-red-700 p-4">
                  <h2 className="text-3xl font-bold text-amber-50 text-center tracking-wider">
                    {category.title}
                  </h2>
                </div>

                {/* Items */}
                <div className="p-6 space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="group flex items-center justify-between p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                          {item.image}
                        </div>
                        <span className="text-2xl font-bold text-red-800 tracking-wide">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-red-700">
                          {item.price}
                        </span>
                        <ShoppingCart className="w-6 h-6 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Us Card */}
        <div
          data-index="contact"
          className={`transition-all duration-1000 transform mt-8 ${
            visibleElements.has('contact') ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-red-800 hover:shadow-2xl transition-shadow duration-300">
            {/* Contact Header */}
            <div className="bg-gradient-to-r from-red-800 to-red-700 p-4">
              <h2 className="text-3xl font-bold text-amber-50 text-center tracking-wider">
                CONTACT US
              </h2>
            </div>

            {/* Contact Info */}
            <div className="p-8 space-y-6">
              {/* Phone */}
              <a
                href="tel:+1234567890"
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-red-800 p-3 rounded-full transition-transform duration-300 group-hover:rotate-12">
                  <Phone className="w-6 h-6 text-amber-50" />
                </div>
                <div>
                  <p className="text-sm text-red-700 font-semibold">Phone</p>
                  <p className="text-xl font-bold text-red-800">+63 123 456 7890</p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-full transition-transform duration-300 group-hover:rotate-12">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-red-700 font-semibold">Instagram</p>
                  <p className="text-xl font-bold text-red-800">@yourusername</p>
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-amber-50 rounded-xl hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-blue-600 p-3 rounded-full transition-transform duration-300 group-hover:rotate-12">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-red-700 font-semibold">Facebook</p>
                  <p className="text-xl font-bold text-red-800">Your Page Name</p>
                </div>
              </a>
            </div>
          </div>
        </div>


        {/* Footer */}
        <div 
          data-index="footer"
          className={`text-center mt-12 transition-all duration-1000 transform ${
            visibleElements.has('footer') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <p className="text-red-800 text-lg font-semibold">
            Order now and enjoy authentic Japanese ramen!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RamenPricelist;