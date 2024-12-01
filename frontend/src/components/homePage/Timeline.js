import React, { useEffect, useRef } from 'react';
import './Timeline.css';
import { AdminPanelSettings, School, Person, SupervisorAccount, Support } from '@mui/icons-material';

const Timeline = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const timelineItems = [
    {
      title: 'Administrator',
      description: 'Manages user registrations, generates credentials, and oversees system administration.',
      icon: <AdminPanelSettings sx={{ fontSize: 40 }} />,
      position: 'left',
      date: '2023',
      badge: 'System Admin'
    },
    {
      title: 'Faculty',
      description: 'Handles course management, assignments, and student grading with an intuitive dashboard.',
      icon: <School sx={{ fontSize: 40 }} />,
      position: 'right',
      date: '2023',
      badge: 'Teaching'
    },
    {
      title: 'Student',
      description: 'Access course materials, view results, and submit assignments through a personalized interface.',
      icon: <Person sx={{ fontSize: 40 }} />,
      position: 'left',
      date: '2023',
      badge: 'Learning'
    },
    {
      title: 'HOD',
      description: 'Oversees department activities, manages faculty, and handles administrative decisions.',
      icon: <SupervisorAccount sx={{ fontSize: 40 }} />,
      position: 'right',
      date: '2023',
      badge: 'Management'
    },
    {
      title: 'Non-Teaching Staff',
      description: 'Manages infrastructure, maintains records, and supports administrative operations.',
      icon: <Support sx={{ fontSize: 40 }} />,
      position: 'left',
      date: '2023',
      badge: 'Support'
    }
  ];

  return (
    <div className="timeline-container" ref={timelineRef}>
      <div className="max-w-4xl mx-auto">
        <h2 className="timeline-header text-4xl font-bold text-center text-gray-900">
          User <span className="text-blue-600">Roles</span>
        </h2>

        <div className="relative mt-16">
          <div className="timeline-track"></div>

          {timelineItems.map((item, index) => (
            <div
              key={index}
              className={`timeline-item mb-16 flex items-center justify-between ${
                item.position === 'left' ? 'timeline-left' : 'timeline-right'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`w-5/12 ${item.position === 'right' && 'timeline-empty'}`}>
                {item.position === 'left' && (
                  <div className="timeline-content">
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-description">{item.description}</p>
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-badge">{item.badge}</div>
                  </div>
                )}
              </div>

              <div className="timeline-icon flex items-center justify-center">
                {item.icon}
              </div>

              <div className={`w-5/12 ${item.position === 'left' && 'timeline-empty'}`}>
                {item.position === 'right' && (
                  <div className="timeline-content">
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-description">{item.description}</p>
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-badge">{item.badge}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;