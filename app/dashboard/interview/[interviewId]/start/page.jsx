"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import { eq } from "drizzle-orm";
import RecordAnswerSection from "./_components/RecordAnswerSection";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    console.log(params);
    GetInterviewDetails();
  }, []);
  // used to get the interview details by mockId / interview Id
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* video / audio recording */}
        <RecordAnswerSection />
      </div>
    </div>
  );
};

export default StartInterview;
