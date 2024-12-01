import React, { useEffect, useRef } from 'react';
import './Timeline.css';
import { AdminPanelSettings, School, Person, SupervisorAccount, Support } from '@mui/icons-material';

const Timeline = () => {
  // Timeline data for each card
  const timelineData = [
    {
      icon: 'fa-c',
      title: 'HOD',
      description: 'Head of the Department oversees departmental activities and operations, Acts as a liaison between the administration and the department, Reviews and resolves student and staff complaints.',
      bgColor: 'bg-indigo-600',
    },
    {
      icon: 'fa-a',
      title: 'Professors and Asst. Professors',
      description: 'Deliver lectures and facilitate student learning, Develop and update course materials, Conduct tutorials and lab sessions and Participate in departmental research and conferences.',
      bgColor: 'bg-gray-400',
    },
    {
      icon: 'fa-e',
      title: 'Non Teaching Staff',
      description: 'Support administrative and operational tasks, Maintain infrastructure and ensure campus facilities are functional, Manage inventory, such as laboratory equipment and office supplies.',
      bgColor: 'bg-green-600',
    },
    {
      icon: 'fa-h',
      title: 'Students',
      description: 'Empowered with actively participating in academic and extracurricular activities, achieved greater position and do open source contributions.',
      bgColor: 'bg-yellow-500',
    },
  ];

  return (
    <div className="py-10 bg-gradient-to-b from-white to-gray-100 mt-16">
      <h2 className="text-4xl font-bold text-center text-black-200 mb-10">
        Body Of <span className="text-black-900">CSE Dept</span>
      </h2>

      {/* Timeline Content */}
      <div className="relative flex flex-col md:flex-row justify-center items-center">
        {/* Static Background Bar */}
        <div className="absolute h-1 w-full bg-indigo-600 top-1/2"></div> {/* The static background progress bar */}
        
        {/* Cards Fixed in Position */}
        <div className="flex flex-row space-x-12 items-center z-10">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`relative w-64 p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${item.bgColor}`}
            >
              <div className="flex justify-center mb-4">
                <i className={`fa-solid ${item.icon} text-white text-4xl`} />
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-white text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
