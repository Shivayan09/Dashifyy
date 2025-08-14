import React, { useState } from 'react';
import downArrow_black_logo from '../assets/down-arrow-black.png';

const items = [
  {
    title: 'What can I do with subjects?',
    content: 'You can add, remove, and manage your subjects easily. Each subject acts as a container for all related resources like notes, videos, and routines.',
  },
  {
    title: 'Can I save YouTube video links?',
    content: 'Yes! You can attach YouTube lecture links to each subject so you can revisit important videos anytime without hunting through your browser history.',
  },
  {
    title: 'Where do I store my notes?',
    content: 'You can upload PDFs or type your notes directly under each subject. This keeps your study material organized and accessible in one place.',
  },
  {
    title: 'Is there a way to manage my routine?',
    content: 'Absolutely. You can create a personalized weekly routine to plan your classes, study hours, and breaks effectively.',
  },
  {
    title: 'Can I modify my dashboard later?',
    content: 'Of course. You can add or delete subjects anytime based on your semester or study focus. The dashboard is fully dynamic to suit your needs.',
  },
];


const CollapsibleBoxes = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            onClick={() => toggle(index)}
            className="group relative overflow-hidden shadow-xs shadow-purple-950 rounded-xl p-4 md:mx-7 bg-purple-100 
            text-purple-800/80 cursor-pointer hover:shadow-md transition duration-300 w-full"
          >
            <span className="absolute left-0 top-0 h-full w-0 bg-purple-200/70 transition-all duration-200 group-hover:w-full"></span>
            <div className="relative z-10 flex justify-between items-center">
              <h2 className="text-[1.1rem] font-semibold">{item.title}</h2>
              <img
                src={downArrow_black_logo}
                alt="arrow"
                className={`h-3.5 opacity-50 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </div>
            <div
              className={`transition-all relative duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-fit mt-2' : 'max-h-0'
              }`}
            >
              <p className="text-[1rem] text-purple-800">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CollapsibleBoxes;
