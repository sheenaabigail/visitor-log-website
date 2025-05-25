import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, BarChart2, DollarSign, BookOpen, Play } from 'react-feather';


 

function Home() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      console.log("token received at homepage");
      console.log(token);
      if (!token) {
        setMessage('Please log in to access this page');
        setLoading(false);
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/protected/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
          throw new Error('Request failed');
        }

        const data = await response.json();
        setMessage(data.message);
      } catch {
        setMessage('Failed to load protected data');
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, [navigate]);

   const [marketData, setMarketData] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setMarketData({
          totalUsers: '250K+',
          totalAssets: '$4B+',
          trendingStocks: [
            { symbol: 'AAPL', change: 1.2 },
            { symbol: 'TSLA', change: 3.5 },
            { symbol: 'BTC', change: 5.1 }
          ]
        });
      }, 1000);
    };
    fetchData();

    // Testimonial auto-rotate
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: <TrendingUp size={32} />, title: "Expert-Curated Portfolios", desc: "Choose from our pre-built portfolios designed by financial experts." },
    { icon: <BarChart2 size={32} />, title: "Real-Time Market Data", desc: "Live market updates and AI-powered insights." },
    { icon: <DollarSign size={32} />, title: "Commission-Free Trading", desc: "No hidden fees – we profit when you do." }
  ];

  const investmentProducts = [
    { name: "Stocks & ETFs", desc: "Trade 5,000+ stocks and ETFs" },
    { name: "Crypto Assets", desc: "Secure cryptocurrency trading" },
    { name: "Managed Portfolios", desc: "Robo-advisors optimization" }
  ];

  const testimonials = [
    { text: "Started with $500 and grew to $6,300 in 2 years!", author: "Sarah K., Teacher" },
    { text: "The automated rebalancing saved me 10 hours/month!", author: "Michael T., Business Owner" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      {/* <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">InvestSmart</div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">Markets</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Portfolio</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Learn</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Sign In
          </button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Build Your Financial Future
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start with as little as $100 and access professional-grade investment tools
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center justify-center">
              Get Started for Free <ArrowRight className="ml-2" />
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50">
              Explore Investment Options
            </button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Data Ticker */}
      {marketData && (
        <div className="bg-gray-900 text-white py-3">
          <div className="container mx-auto px-4 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <span>Investors: {marketData.totalUsers}</span>
                <span>Assets: {marketData.totalAssets}</span>
              </div>
              <div className="flex items-center space-x-6">
                {marketData.trendingStocks.map((stock, index) => (
                  <span key={index} className={`flex items-center ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.symbol} {stock.change}%
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Investment Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Grow Your Wealth Your Way</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investmentProducts.map((product, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.desc}</p>
                <button className="text-blue-600 flex items-center">
                  Learn more <ArrowRight className="ml-1" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative h-40">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0'}`}
                >
                  <blockquote className="text-2xl font-light mb-4">"{testimonial.text}"</blockquote>
                  <p className="text-gray-600">— {testimonial.author}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Financial Future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Create your free account in 3 minutes</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-100 font-medium">
              Start Investing Now
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-md hover:bg-blue-700">
              Schedule Advisor Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold text-white mb-4">InvestSmart</div>
              <p className="max-w-xs">Professional investment tools for everyone.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-medium mb-4">Products</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Stocks</a></li>
                  <li><a href="#" className="hover:text-white">Crypto</a></li>
                  <li><a href="#" className="hover:text-white">IRA Accounts</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">Learning Center</a></li>
                  <li><a href="#" className="hover:text-white">Market Research</a></li>
                  <li><a href="#" className="hover:text-white">Webinars</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Shield size={20} />
              <span>SOC 2 Certified</span>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} InvestSmart. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;