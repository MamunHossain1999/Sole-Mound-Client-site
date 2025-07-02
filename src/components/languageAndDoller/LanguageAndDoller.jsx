import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const LanguageAndDoller = () => {
  const [formData, setFormData] = useState({
    shipTo: 'London',
    language: 'English',
    currency: 'Dollar'
  });

  const shipToOptions = ['London', 'Paris', 'New York', 'Tokyo', 'Sydney'];
  const languageOptions = ['English', 'Spanish', 'French', 'German', 'Japanese'];
  const currencyOptions = ['Dollar', 'Euro', 'Pound', 'Yen', 'Canadian Dollar'];

  const SelectField = ({ value, onChange, options }) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 text-[#B6B7BC] border border-[#B6B7BC] rounded-md focus:outline-none focus:border-gray-400 appearance-none bg-white text-sm"
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <ChevronDown className="w-6 h-6 text-[#505050]" />
      </div>
    </div>
  );

  const handleChange = field => e => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSave = () => {
    console.log('Form saved:', formData);
  };

  return (
    <div className="fixed top-30 right-85 z-50 bg-white shadow-lg rounded-lg w-[90vw] max-w-[320px] p-4 space-y-4">
      <div>
        <label className="text-base font-semibold text-[#474B57] mb-1 block">Ship to</label>
        <SelectField
          value={formData.shipTo}
          onChange={handleChange('shipTo')}
          options={shipToOptions}
        />
      </div>

      <div>
        <label className="text-base font-semibold text-[#474B57] mb-1 block">Language</label>
        <SelectField
          value={formData.language}
          onChange={handleChange('language')}
          options={languageOptions}
        />
      </div>

      <div>
        <label className="text-base font-semibold text-[#474B57] mb-1 block">Currency</label>
        <SelectField
          value={formData.currency}
          onChange={handleChange('currency')}
          options={currencyOptions}
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-[#C8A8E9] cursor-pointer text-[#1F1F1F] py-2 rounded-md text-base font-semibold hover:bg-purple-300"
      >
        Save
      </button>
    </div>
  );
};

export default LanguageAndDoller;
