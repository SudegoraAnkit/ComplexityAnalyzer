import React, { useState, useEffect } from 'react';
import './App.css';
import CodeEditor from './component/CodeEditor';
import SubmitButton from './component/SubmitButton';
import ProgressBar from './component/ProgressBar';
import ResultBox from './component/ResultBox';
import ComplexityGraph from './component/ComplexityGraph';
import { Resizable } from 'react-resizable';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-flash";



const App = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript'); // Default language is JavaScript
  const [timeComplexity, setTimeComplexity] = useState('');
  const [spaceComplexity, setSpaceComplexity] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    }, []);

useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);
  
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const toggleTheme = () => {
      setIsDarkMode(!isDarkMode);
      localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    const extractComplexities = (result) => {
        const timeRegex = /Time Complexity:\s*(O\(.+?\))/i;
        const spaceRegex = /Space Complexity:\s*(O\(.+?\))/i;
        const timeMatch = result.match(timeRegex);
        const spaceMatch = result.match(spaceRegex);
        setTimeComplexity(timeMatch ? timeMatch[1] : 'N/A');
        setSpaceComplexity(spaceMatch ? spaceMatch[1] : 'N/A');
      };
  const runChat = async () => {
    setLoading(true);
    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY // Replace with your actual API key
    console.log('API Key:', process.env.REACT_APP_GEMINI_API_KEY);

    if (!API_KEY) {
      console.error('API Key is undefined. Make sure to set it in the .env file.');
      setResult('API Key is missing.');
      setLoading(false);
      return;
    }
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 1,
      topK: 64,
      topP: 0.95,
      maxOutputTokens: 8192,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const promptText = `Find the time complexity and space complexity of the following code:\n${code}\n It should also tell which language it is?, Tell How it can be optimized and give the optimized code, also Explain where to read these? Give Time and Space complexity in heading 1`;

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: promptText }],
        },
        {
          role: "model",
          parts: [{ text: "Here's a Python function that sorts a list of numbers in ascending order. Identify the time complexity and space complexity of this function. Then optimize this function and explain why it is faster. Don't use Python's in-built sort() method.\n\n\ndef sort_list(list_to_sort):\n  \"\"\"\n  This function sorts a list of numbers in ascending order using the bubble sort algorithm.\n\n  Args:\n    list_to_sort: A list of numbers to be sorted.\n\n  Returns:\n    A new list with the numbers sorted in ascending order.\n  \"\"\"\n  # Create a copy of the list to avoid modifying the original\n  sorted_list = list_to_sort.copy()\n  n = len(sorted_list)\n\n  # Iterate through the list n-1 times\n  for i in range(n-1):\n    # Flag to track if any swaps were made in a pass\n    swapped = False\n    # Iterate through the unsorted portion of the list\n    for j in range(n-i-1):\n      # Compare adjacent elements and swap if necessary\n      if sorted_list[j] > sorted_list[j+1]:\n        sorted_list[j], sorted_list[j+1] = sorted_list[j+1], sorted_list[j]\n        swapped = True\n    # If no swaps were made, the list is already sorted\n    if not swapped:\n      break\n\n  # Return the sorted list\n  return sorted_list\n\n# Example usage\nmy_list = [1, 9, 5, 2, 1, 8, 6, 6, 3, 4, 10, 7]\nsorted_list = sort_list(my_list)\nprint(sorted_list)  # Output: [1, 1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10]"}],
        },
      ],
    });

    try {
      const result = await chat.sendMessage(promptText); // Sending promptText as the message
      const response = result.response;
      setResult(response.text());
      extractComplexities(response.text());
    } catch (error) {
      console.error('Error while sending message:', error);
      setResult('Error occurred while processing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className={isDarkMode ? 'dark-header' : 'light-header'}>
        <h1>Time And Space Complexity Analyzer</h1>
        <button className={isDarkMode ? 'dark-button' : 'light-button'} onClick={toggleTheme}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>
      <div className="language-selector">
        <label htmlFor="language">Select Language: </label>
        <select id="language" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="ruby">Ruby</option>
              <option value="go">Go</option>
              <option value="swift">Swift</option>
              <option value="rust">Rust</option>
              <option value="php">PHP</option>
              <option value="shell">Shell</option>
        </select>
      </div>
      <Resizable width={800} height={400} minWidth={200} minHeight={200}>
        <CodeEditor value={code} onChange={handleCodeChange} language={selectedLanguage} />
      </Resizable>
      <SubmitButton onClick={runChat} text="Analyze Code" />
      {loading && <ProgressBar />}
      {result && <ResultBox content={result} />}
      {timeComplexity && spaceComplexity && (
      <ComplexityGraph timeComplexity={timeComplexity} spaceComplexity={spaceComplexity} />
    )}
    </div>
  );
};

export default App;
