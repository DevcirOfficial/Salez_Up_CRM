


// ////////////////////////////// New //////////////////////////////////////////////



// import React, { useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChartSimple, faLightbulb, faRocket } from '@fortawesome/free-solid-svg-icons';

// const FormattedContent = ({ text }) => {
//   const formatContent = (content) => {
//     if (!content) return [];
    
//     const analysisText = typeof content === 'object' ? content.result : content;
    
//     let cleanedText = analysisText
//       .replace("Here's the analysis:", '')
//       .replace(/\*\*/g, '');
    
//     return cleanedText.split('\n').filter(line => line.trim() !== '');
//   };

//   const splitIntoSentences = (text) => {
//     return text.split(/\.(?=\s|$)/).filter(sentence => sentence.trim() !== '');
//   };

//   // Updated formatting function to handle all numeric values
//   const formatTextWithNumbers = (text) => {
//     // Enhanced regex to match:
//     // - Dollar amounts ($X,XXX.XX)
//     // - Percentages (X% or X.X%)
//     // - Regular numbers (123 or 123.45)
//     // - Numbers with commas (1,234)
//     const regex = /(\$\d+(?:,\d{3})*(?:\.\d{2})?|\d+(?:,\d{3})*(?:\.\d+)?%?|\d+(?:\.\d+)?%?)/g;
    
//     const parts = text.split(regex);
//     return parts.map((part, index) => {
//       // Check if the part matches any of our number formats
//       if (
//         part.startsWith('$') || // Dollar amounts
//         /^\d+(?:,\d{3})*(?:\.\d+)?%?$/.test(part) || // Numbers with optional commas, decimals, and percent
//         /^\d+(?:\.\d+)?%$/.test(part) // Percentages
//       ) {
//         return (
//           <span
//             key={index}
//             className="inline-block px-2 py-1 mx-1 font-medium text-white bg-[#1f8675] rounded shadow-xl"
//           >
//             {part}
//           </span>
//         );
//       }
//       return part;
//     });
//   };

//   const isHeading = (text) => {
//     const lowerText = text.toLowerCase();
//     return (
//       lowerText.includes('performance') ||
//       lowerText.includes('improvement') ||
//       lowerText.includes('areas') ||
//       lowerText.includes('future')
//     );
//   };

//   const getHeadingIcon = (text) => {
//     const lowerText = text.toLowerCase();
//     if (lowerText.includes('performance')) {
//       return faChartSimple;
//     } else if (lowerText.includes('improvement') || lowerText.includes('areas')) {
//       return faLightbulb;
//     } else if (lowerText.includes('future')) {
//       return faRocket;
//     }
//     return null;
//   };

//   const formattedSections = formatContent(text);

//   return (
//     <div className="space-y-6">
//       {formattedSections.map((section, index) => {
//         if (isHeading(section)) {
//           return (
//             <div 
//               key={index} 
//               className="mt-2.5 mb-4"
//             >
//               <h3 className="flex items-center gap-3 text-[22px] font-medium text-[#1f8675] mb-4">
//                 <FontAwesomeIcon icon={getHeadingIcon(section)} className="w-5 h-5" />
//                 {section}
//               </h3>
//             </div>
//           );
//         } else {
//           const sentences = splitIntoSentences(section);
//           return (
//             <div key={index} className="space-y-2">
//               {sentences.map((sentence, sentenceIndex) => (
//                 <div 
//                   key={sentenceIndex} 
//                   className="p-3 tracking-wide text-gray-800 transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-100"
//                 >
//                   {formatTextWithNumbers(sentence.trim() + '.')}
//                 </div>
//               ))}
//             </div>
//           );
//         }
//       })}
//     </div>
//   );
// };

// const ModalComponent = ({ isOpen, onClose, activeTab, setActiveTab, apiResponse }) => {
//   useEffect(() => {
//     if (isOpen) {
//       console.log("API Response in ModalComponent:", apiResponse);
//     }
//   }, [isOpen, apiResponse]);

//   return (
//     isOpen && (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
//         <div className="relative max-w-4xl overflow-y-auto transition-all duration-300 transform bg-white shadow-2xl rounded-xl h-[80vh] animate-modal-slide-up">
//           <div className="flex items-center justify-between p-6 border-b bg-[#1f8675]">
//             <h2 className="text-2xl font-semibold text-white">AI Insights Dashboard</h2>
//             <button 
//               onClick={onClose} 
//               className="text-lg text-white transition-transform duration-300 transform hover:rotate-90"
//             >
//               ✖
//             </button>
//           </div>
//           <div className="p-6 text-sm break-words whitespace-pre-wrap bg-white rounded">
//             {apiResponse ? (
//               <FormattedContent text={apiResponse} />
//             ) : (
//               <p className="text-center text-gray-500">No insights available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default ModalComponent;

////////////////////////////// New //////////////////////////////////////////////



import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faLightbulb, faRocket } from '@fortawesome/free-solid-svg-icons';
import './Scroll.css'

const FormattedContent = ({ text }) => {
  const formatContent = (content) => {
    if (!content) return [];
    const analysisText = typeof content === 'object' ? content.result : content;
    let cleanedText = analysisText
      .replace("Here's the analysis:", '')
      .replace(/\*\*/g, '');
    const sections = [
      'Performance Analysis',
      'Areas for Improvement',
      'Future Prediction and Suggestions'
    ];
    sections.forEach(section => {
      cleanedText = cleanedText.replace(section, `\n${section}\n`);
    });
    return cleanedText.split('\n').filter(line => line.trim() !== '');
  };

  const splitIntoSentences = (text) => {
    // Split by period and filter out empty or single period sentences
    return text.split(/\.(?=\s|$)/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence && sentence !== '.' && sentence.length > 0);
  };

  const formatTextWithNumbers = (text) => {
    // Skip formatting if it's just a period or empty
    if (!text || text.trim() === '.' || text.trim() === '') return '';

    const pattern = /(\$\d+(?:,\d{3})*(?:\.\d{2})?|\d+(?:\.\d+)?%|\d+(?:,\d{3})*(?:\.\d+)?)/g;
    
    const parts = text.split(pattern);
    
    return parts.map((part, index) => {
      if (
        part.match(/^\$/) ||
        (part.match(/^[0-9,.]+$/) && part !== '.') ||
        part.match(/^[0-9,.]+\.$/) ||
        part.match(/^[0-9,.]+%$/) ||
        part.match(/^[0-9,.]+\.[0-9]+$/)
      ) {
        return (
          <span
            key={index}
            className="inline-block px-2 py-1 mx-1 font-medium text-white bg-[#1f8675] rounded shadow-xl"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const getHeadingIcon = (heading) => {
    switch (heading) {
      case 'Performance Analysis':
        return faChartSimple;
      case 'Areas for Improvement':
        return faLightbulb;
      case 'Future Prediction and Suggestions':
        return faRocket;
      default:
        return null;
    }
  };

  const shouldSkipSentence = (sentence) => {
    const trimmedSentence = sentence.trim();
    return (
      !trimmedSentence || // Skip empty sentences
      trimmedSentence === '.' || // Skip single periods
      trimmedSentence === 'Here are a few suggestions.' ||
      trimmedSentence.toLowerCase().includes('here are a few suggestions:') ||
      trimmedSentence.length === 0 // Skip zero-length sentences
    );
  };

  const processText = (text) => {
    if (!text || text.trim() === '') return '';
    
    // If text contains a colon, take only the part after the colon
    const colonIndex = text.indexOf(':');
    if (colonIndex !== -1) {
      return text.substring(colonIndex + 1).trim();
    }
    return text;
  };

  const formattedSections = formatContent(text);

  return (
    <div className="space-y-2.5">
      {formattedSections.map((section, index) => {
        const isHeading = [
          'Performance Analysis',
          'Areas for Improvement',
          'Future Prediction and Suggestions'
         
        ].some(heading => section.includes(heading));

        if (isHeading) {
          return (
            <div 
              key={index} 
              className="mt-2.5 mb-4"
            >
              <h3 className="flex items-center gap-3 text-[22px] font-medium text-[#1f8675] mb-4">
                <FontAwesomeIcon icon={getHeadingIcon(section)} className="w-5 h-5" />
                {section}
              </h3>
            </div>
          );
        } else {
          const sentences = splitIntoSentences(section);
          return (
            <div key={index} className="space-y-2">
              {sentences
                .filter(sentence => !shouldSkipSentence(sentence))
                .map((sentence, sentenceIndex) => {
                  const trimmedSentence = sentence.trim();
                  if (!trimmedSentence) return null; // Skip empty sentences

                  const startsWithAsterisk = trimmedSentence.startsWith('*');
                  
                  let cleanSentence = startsWithAsterisk 
                    ? trimmedSentence.substring(1).trim() 
                    : trimmedSentence;
                  
                  cleanSentence = processText(cleanSentence);
                  
                  // Skip rendering if the sentence is empty after processing
                  if (!cleanSentence) return null;

                  return (
                    <div 
                      key={sentenceIndex} 
                      className={`p-3 tracking-wide transition-colors duration-200 rounded-lg hover:bg-opacity-90 ${
                        startsWithAsterisk 
                          ? 'bg-[#eee7c9] animate-bounce text-black' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {formatTextWithNumbers(cleanSentence + '.')}
                    </div>
                  );
                })
                .filter(Boolean)} {/* Filter out null values */}
            </div>
          );
        }
      })}
    </div>
  );
};

const ModalComponent = ({ isOpen, onClose, activeTab, setActiveTab, apiResponse }) => {
  useEffect(() => {
    if (isOpen) {
      console.log("API Response in ModalComponent:", apiResponse);
    }
  }, [isOpen, apiResponse]);

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
        <div className="custom-scrollbar relative max-w-4xl overflow-y-auto transition-all duration-300 transform bg-white shadow-2xl rounded-xl h-[80vh] animate-modal-slide-up">
          <div className="flex items-center justify-between p-6 border-b bg-[#1f8675]">
            <h2 className="text-2xl font-semibold text-white">AI Insights Dashboard</h2>
            <button 
              onClick={onClose} 
              className="text-lg text-white transition-transform duration-300 transform hover:rotate-90"
            >
              ✖
            </button>
          </div>
          <div className="p-6 text-sm break-words whitespace-pre-wrap bg-white rounded">
            {apiResponse ? (
              <FormattedContent text={apiResponse} />
            ) : (
              <p className="text-center text-gray-500">No insights available</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ModalComponent;