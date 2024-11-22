import React from 'react';

const Timeline = () => {
  const timelineItems = [
    {
      title: 'HOD',
      description: 'Head of the Computer Science Department, responsible for academic leadership and departmental administration.',
      icon: '👨‍💼',
      position: 'left'
    },
    {
      title: 'Professors and Asst. Professors',
      description: 'Experienced faculty members dedicated to teaching, research, and mentoring students in computer science.',
      icon: '👨‍🏫',
      position: 'right'
    },
    {
      title: 'Non Teaching Staff',
      description: 'Essential support staff ensuring smooth operation of laboratories, administrative tasks, and technical infrastructure.',
      icon: '👥',
      position: 'left'
    },
    {
      title: 'Students',
      description: 'Aspiring computer science professionals pursuing their academic goals and practical skills development.',
      icon: '👨‍🎓',
      position: 'right'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          Structure Of <span className="text-gray-700">CSE</span>
        </h2>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

          {/* Timeline Items */}
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`mb-12 flex ${
                item.position === 'left' ? 'flex-row' : 'flex-row-reverse'
              } items-center justify-between`}
            >
              {/* Content */}
              <div className={`w-5/12 ${item.position === 'right' && 'text-right'}`}>
                <div
                  className={`p-6 bg-white rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Icon */}
              <div className="z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full border-4 border-gray-200 text-xl">
                {item.icon}
              </div>

              {/* Empty space for opposite side */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;