import { Button } from '@/components/ui/button';
import { Terminal } from './terminal';
import { Wand2, Target, Sparkles, BarChart3, CheckCircle, ArrowRight, CreditCard, Database } from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
         {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Land your dream job</span>
                <span className="block text-blue-600 mt-2">with AI-powered resumes</span>
              </h1>
              <p className="mt-6 text-lg text-gray-500">
                Our AI-powered resume builder helps you create ATS-friendly resumes tailored to specific job descriptions. Get instant feedback, suggestions, and improvements to maximize your chances of landing interviews.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto lg:mx-0">
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  Build Your Resume Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              <div className="mt-6 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  ATS-Optimized
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  AI-Powered
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Job-Specific
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <img
                  className="w-full rounded-lg"
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800"
                  alt="Resume builder dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose ResumeAI?</h2>
            <p className="mt-4 text-lg text-gray-500">
              Our AI-powered platform provides everything you need to create the perfect resume
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Target,
                title: 'ATS Optimization',
                description: 'Ensure your resume passes through Applicant Tracking Systems with our smart formatting and keyword optimization.',
              },
              {
                icon: Sparkles,
                title: 'AI Analysis',
                description: 'Get instant feedback on your resume with our advanced AI analysis that compares your content against job requirements.',
              },
              {
                icon: BarChart3,
                title: 'Performance Tracking',
                description: "Track your resume performance with detailed analytics and suggestions for improvement.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-500">
              Create your perfect resume in just a few simple steps
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Upload Your Resume',
                description: 'Start by uploading your existing resume or create a new one from scratch.',
              },
              {
                step: '02',
                title: 'Add Job Description',
                description: "Paste the job description you're applying for to get tailored recommendations.",
              },
              {
                step: '03',
                title: 'Get Optimized Results',
                description: 'Receive instant feedback and suggestions to improve your resume for the specific role.',
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-4xl font-bold text-blue-600/10">{step.step}</div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Ready to land your dream job?</h2>
            <p className="mt-4 text-xl text-blue-100">
              Join thousands of job seekers who have successfully improved their resumes with ResumeAI
            </p>
            <button className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors">
              Get Started For Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Templates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm text-center">
              © 2025 ResumeAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </main>
  );
}
