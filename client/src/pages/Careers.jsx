import { Link } from 'react-router-dom';
import { Briefcase, ArrowLeft, MapPin, Clock } from 'lucide-react';

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for an experienced full-stack developer to help build and maintain our download platform.'
  },
  {
    id: 2,
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our design team to create beautiful and intuitive user experiences for our growing user base.'
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Help us scale our infrastructure and ensure 99.9% uptime for our users worldwide.'
  }
];

export default function Careers() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-6">
              <Briefcase className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Help us build the best file download experience on the web
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8 md:p-12 mb-12 dark:bg-gray-800/80">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Work With Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Remote First
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Work from anywhere in the world. We're a fully remote team.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Impact
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your work directly impacts millions of users worldwide.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Growth
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Continuous learning opportunities and career development.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Open Positions
            </h2>
            <div className="space-y-4">
              {jobOpenings.map((job) => (
                <div
                  key={job.id}
                  className="glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-300 dark:bg-gray-800/80"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-500">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary whitespace-nowrap">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-8 md:p-12 text-center dark:bg-gray-800/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Don't See a Role That Fits?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button className="btn-secondary">
              Send General Application
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


