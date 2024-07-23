"use client";

import { Lightbulb, Pause, Play, StopCircle, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const [speechStatus, setSpeechStatus] = useState("stopped");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure the code runs only on the client side
  useEffect(() => {
    setIsClient(true);
    // Stop any ongoing speech synthesis on mount
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      if (!isSpeaking) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
        speech.onstart = () => {
          setIsSpeaking(true);
          setSpeechStatus("started");
        };
        console.log("start the speech");
        speech.onend = () => {
          setIsSpeaking(false);
          setSpeechStatus("stopped");
        };
        speech.onerror = () => {
          setIsSpeaking(false);
          setSpeechStatus("stopped");
        };
      }
    } else {
      alert("Your browser does not support text to speech");
    }
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeechStatus("stopped");
    }
  };

  const pauseSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause();
      setSpeechStatus("paused");
    }
  };

  const resumeSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setSpeechStatus("started");
    }
  };

  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                key={index}
                className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex === index && "bg-primary text-white"
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>

        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <div style={{ display: "flex", columnGap: "0.5rem" }}>
          {speechStatus === "started" ? (
            <Pause onClick={pauseSpeech} className="cursor-pointer" />
          ) : speechStatus === "paused" ? (
            <Play onClick={resumeSpeech} className="cursor-pointer" />
          ) : (
            <Volume2
              className={`cursor-pointer ${
                isSpeaking ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() =>
                !isSpeaking &&
                textToSpeech(
                  mockInterviewQuestion[activeQuestionIndex]?.question,
                )
              }
            />
          )}
          <StopCircle onClick={stopSpeech} className="cursor-pointer" />
        </div>
        <div className="border rounded-lg p-5 bg-blue-100 mt-20">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-primary my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;
