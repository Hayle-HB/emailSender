import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import StepIndicator from "./components/StepIndicator";
import OptionCard from "./components/OptionCard";
import ManualEntryForm from "./components/ManualEntryForm";
import CSVUploadForm from "./components/CSVUploadForm";
import EmailComposer from "./components/EmailComposer";
import { options } from "./data/options"; // Move options array to separate file

const SendEmail = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [step, setStep] = useState(1); // 1: Choose option, 2: Enter recipients, 3: Write message
  const [selectedOption, setSelectedOption] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [emailContent, setEmailContent] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      if (step === 2) {
        setSelectedOption(null);
        setRecipients([]);
      }
    }
  };

  const handleNext = () => {
    if (recipients.length > 0) {
      setStep(3);
    }
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    // Only set recipients if valid emails were found in the CSV
    if (file && event.target.emails && event.target.emails.length > 0) {
      const newRecipients = event.target.emails.map((email) => ({ email }));
      setRecipients(newRecipients);
    } else {
      // Clear recipients if the file was invalid or had no emails
      setRecipients([]);
    }
  };

  const handleManualAdd = (email) => {
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setRecipients([...recipients, { email }]);
      return true;
    }
    return false;
  };

  const handleMultipleEmails = (emailsArray) => {
    const validEmails = emailsArray
      .filter((email) => email && /\S+@\S+\.\S+/.test(email))
      .filter(
        (email) =>
          !recipients.some((r) => r.email.toLowerCase() === email.toLowerCase())
      );

    if (validEmails.length > 0) {
      const newRecipients = validEmails.map((email) => ({ email }));
      setRecipients((prevRecipients) => [...prevRecipients, ...newRecipients]);
      return true;
    }
    return false;
  };

  const removeRecipient = (index) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const handleSendEmails = () => {
    const payload = {
      recipients,
      content: emailContent,
    };

    // Send to backend
    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Email sent successfully:", data);
        // Reset form
        setStep(1);
        setSelectedOption(null);
        setRecipients([]);
        setEmailContent("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div
      className={`min-h-screen w-full ${
        darkMode ? "bg-[#0F172A]" : "bg-[#FAFAFA]"
      }`}
    >
      <div className="w-full max-w-[calc(100vw-2rem)] sm:max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Step Indicator */}
        <div className="mb-6 sm:mb-8">
          <StepIndicator
            currentStep={step}
            totalSteps={3}
            onBack={handleBack}
            darkMode={darkMode}
          />
        </div>

        {/* Title */}
        <h1
          className={`text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 
            ${darkMode ? "text-gray-100" : "text-gray-900"}
            transition-colors duration-200`}
        >
          Send Emails to Your Recipients
        </h1>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 
                max-w-[calc(100vw-2rem)] sm:max-w-4xl mx-auto"
              >
                {options.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="w-full"
                  >
                    <OptionCard
                      option={option}
                      isSelected={selectedOption === option.id}
                      darkMode={darkMode}
                      onSelect={handleOptionSelect}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[calc(100vw-2rem)] sm:max-w-4xl mx-auto"
            >
              {selectedOption === "manual" ? (
                <ManualEntryForm
                  recipients={recipients}
                  onAdd={handleManualAdd}
                  onAddMultiple={handleMultipleEmails}
                  onRemove={removeRecipient}
                  darkMode={darkMode}
                />
              ) : (
                <CSVUploadForm
                  onUpload={handleCSVUpload}
                  dragActive={dragActive}
                  setDragActive={setDragActive}
                  darkMode={darkMode}
                />
              )}

              {recipients.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 sm:mt-6 text-center"
                >
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto bg-indigo-500 text-white px-6 py-2.5 rounded-xl
                      hover:bg-indigo-600 transition-all duration-200
                      focus:ring-4 focus:ring-indigo-500/20 outline-none
                      text-sm sm:text-base font-medium"
                  >
                    Next Step
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[calc(100vw-2rem)] sm:max-w-4xl mx-auto"
            >
              <EmailComposer
                content={emailContent}
                onChange={setEmailContent}
                onSend={handleSendEmails}
                darkMode={darkMode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SendEmail;
