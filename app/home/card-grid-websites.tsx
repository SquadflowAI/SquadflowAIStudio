'use client';

const projects = [
  {
    title: 'Finance App',
    description: 'Track expenses, income, and investments with ease.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    updated: 'Updated Jun 2025',
  },
  {
    title: 'Real Estate Portal',
    description: 'List and browse properties in your local area.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    updated: 'Updated May 2025',
  },
  {
    title: 'CRM Tool',
    description: 'Manage leads and client communication in one place.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    updated: 'Updated Apr 2025',
  },
  {
    title: 'Job Board',
    description: 'Post and apply for jobs in tech, remote-friendly.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    updated: 'Updated Mar 2025',
  },
  {
    title: 'Fitness Tracker',
    description: 'Monitor workouts, calories, and progress over time.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    updated: 'Updated Feb 2025',
  },
];

export default function CardGridWebsites() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, idx) => (
            <a href="/vibe-studio">
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition hover:shadow-md"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover"
            />
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <p className="mt-4 text-xs text-gray-400">{project.updated}</p>
            </div>
          </div>
          </a>
        ))}
      </div>
    </div>
  );
}
