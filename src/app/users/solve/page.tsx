"use client";

import React, { useState } from "react";
import { chatSession } from "../../../../utils/GeminiModal";

function Doubt() {
  const [doubt, setDoubt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskDoubt = async () => {
    if (!doubt.trim()) return;

    setLoading(true);
    setResponse(""); // Clear previous response

    const prompt = `You are a subject matter expert for class 11 and 12 for Indian students, helping them to crack NEET, JEE, and Board exams. Help them solve their doubts and provide 5 follow-up questions to check their understanding.

    Student's Doubt: ${doubt}`;

    try {
      const result = await chatSession.sendMessage(prompt);
      const resultEdited = result.response.text();
      setResponse(resultEdited);

    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Failed to fetch response. Try again.");
    }

    console.log(response);

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Ask Your Doubt</h2>

      <textarea
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        rows={3}
        placeholder="Type your doubt here..."
        value={doubt}
        onChange={(e) => setDoubt(e.target.value)}
      />

      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        onClick={handleAskDoubt}
        disabled={loading}
      >
        {loading ? "Processing..." : "Ask Doubt"}
      </button>

      {response && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <h3 className="font-medium">AI Response:</h3>
          <p className="text-sm text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
}

export default Doubt;
