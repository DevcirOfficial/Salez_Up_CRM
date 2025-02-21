import axios from 'axios';

export const getChatGPTResponse = async (target, actual, workingDays, totalDays) => {
  const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/conversationllama',
    headers: {
      'x-rapidapi-key': '41a3ba0304msh70e39da77886287p15b14ajsn4cf7e9069aff',
      'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      messages: [
        {
          role: 'user',
          // content: `Analyze my current performance as a sales agent. I have earned $${actual} out of a target of $${target} by working ${workingDays} days out of ${totalDays} days. Calculate the percentage of target achieved, assess the pace of my progress, and predict the outcome if I continue at this rate. Provide insights into how I can optimize my pace to exceed my target and offer suggestions for improvement. Don't give me formulas or headings, just let me know like an insight about my current progress, status of progress (good or bad), and future prediction if I continue on the same track. Give me 3-4 points.`,
          content: `Analyze my current performance as a sales agent. I have earned $${actual} out of a target of $${target} by working ${workingDays} days out of ${totalDays} days. Calculate the percentage of target achieved, assess the pace of my progress, and predict the outcome if I continue at this rate. Provide insights into how I can optimize my pace to exceed my target and offer suggestions for improvement. Don't give me formulas or headings, just let me know like an insight about my current progress, status of progress (good or bad), and future prediction if I continue on the same track. Give me 3-4 points.Split the content into 3 headings as Performance Analysis, Areas for Improvement, and Future Prediction and Suggestions.DONOT MISS ANY HEADING`,
      
        },
      ],
      web_access: false,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data); // Log the API response to the console
    return response.data;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    throw error;
  }
};