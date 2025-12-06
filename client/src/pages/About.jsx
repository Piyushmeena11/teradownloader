import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Zap, Users, Target, Award, User, Code, Palette, Headphones } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const values = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Privacy First',
    description: 'We believe your data belongs to you. We never store your files or personal information.'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Performance',
    description: 'We\'re committed to providing the fastest download speeds and best user experience.'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'User-Centric',
    description: 'Every feature we build is designed with our users in mind. Your feedback drives our development.'
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Innovation',
    description: 'We continuously improve our technology to stay ahead of the curve and serve you better.'
  }
];

const team = [
  {
    name: 'Alex Johnson',
    role: 'Founder & CEO',
    icon: <User className="w-12 h-12" />,
    bio: 'Passionate about making file downloads fast and accessible for everyone.'
  },
  {
    name: 'Sarah Chen',
    role: 'Lead Developer',
    icon: <Code className="w-12 h-12" />,
    bio: 'Building scalable infrastructure that powers millions of downloads.'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Product Designer',
    icon: <Palette className="w-12 h-12" />,
    bio: 'Creating beautiful, intuitive experiences that users love.'
  },
  {
    name: 'Emily Davis',
    role: 'Support Lead',
    icon: <Headphones className="w-12 h-12" />,
    bio: 'Ensuring every user gets the help they need, when they need it.'
  }
];

export default function About() {
  return (
    <>
      <SEOHead
        title="About Us - TeraDownloader | Free Terabox Downloader"
        description="Learn about TeraDownloader's mission to make file downloads fast, secure, and accessible. Meet our team and discover our values."
        keywords="about teradownloader, terabox downloader about, terabox downloader team, terabox downloader mission"
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About TeraDownloader
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
            We're on a mission to make file downloads fast, secure, and accessible for everyone - completely free, forever
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-8 md:p-12 dark:bg-gray-800/80">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              At TeraDownloader, we believe that downloading files from cloud storage should be simple, fast, and free. 
              We've built a platform that removes the barriers between you and your files.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Our commitment to privacy means we never store your files or personal data. Everything is processed in 
              real-time, ensuring your information stays private and secure.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              We're constantly improving our service based on user feedback, adding new features, and optimizing 
              performance to give you the best download experience possible.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-6 text-center dark:bg-gray-800/80"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The people behind TeraDownloader
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-6 text-center dark:bg-gray-800/80 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full text-white">
                    {member.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-2xl p-12 text-center dark:bg-gray-800/80">
            <Award className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Thousands
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50K+</div>
                <div className="text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1M+</div>
                <div className="text-gray-600 dark:text-gray-400">Downloads</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">99.9%</div>
                <div className="text-gray-600 dark:text-gray-400">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center glass-effect rounded-2xl p-12 dark:bg-gray-800/80">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Made with Love
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            We're passionate about what we do, and we'd love to have you as part of our community.
          </p>
          <Link
            to="/"
            className="btn-primary inline-flex items-center gap-2"
          >
            Start Using TeraDownloader
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}

