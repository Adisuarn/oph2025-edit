'use client'
import React, { useState } from 'react'
import { getUser, changeUserData } from './Modal.action';
import { AllData } from '@/libs/data';
import Swal from 'sweetalert2';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [activeTab, setActiveTab] = useState<'search' | 'edit'>('search');
  const [userData, setUserData] = useState<any>(null); // State to store user data
  const [keyData, setKeyData] = useState<string | null>(null); // State to store key data
  const [isLoading, setIsLoading] = useState(false); // State to handle loading state
  const [error, setError] = useState<string>(''); // State to handle errors
  const [selectedType, setSelectedType] = useState<'clubs' | 'organizations' | 'programs' | 'gifted' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState<string>(''); // State to store email input
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSearchClick = () => {
    setActiveTab('search');
  };

  const handleEditClick = () => {
    setActiveTab('edit');
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    setIsLoading(true); // Set loading state to true while the request is in progress
    setError(''); // Clear any previous error
    try {
      const data = await getUser(email)
      if (data) {
        setUserData(data);
        const key = decodeURIComponent(data.key);  // Decode if encoded
        const findKey = (tag: string) => {
          switch (tag) {
            case 'clubs':
              return AllData.Clubs[key as keyof typeof AllData.Clubs];
            case 'organizations':
              return AllData.Organizations[key as keyof typeof AllData.Organizations];
            case 'programs':
              return AllData.Programs[key as keyof typeof AllData.Programs];
            case 'gifted':
              return AllData.Gifted[key as keyof typeof AllData.Gifted];
            default:
              return undefined;
          }
        };

        const keyData = findKey(data.tag);
        if (keyData) {
          setKeyData(keyData as unknown as string);
        } else {
          setError('Key data not found.');
        }
      } else {
        setError('User not found or invalid response.');
      }
    } catch (err) {
      setError('Failed to fetch user data.'); // Handle any errors
    } finally {
      setIsLoading(false); // Set loading state to false once the request is done
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set loading state for submission
    setIsSubmitting(true); // Disable the submit button

    const email = e.currentTarget.email.value;

    // Check if the required fields are present
    if (!email) {
      setError('Email is required.');
      setIsSubmitting(false); // Re-enable submit button
      return;
    }
    if (!selectedType) {
      setError('Please select a type (e.g., clubs, organizations).');
      setIsSubmitting(false); // Re-enable submit button
      return;
    }
    if (!selectedOption) {
      setError('Please select an option.');
      setIsSubmitting(false); // Re-enable submit button
      return;
    }

    setError(''); // Clear any previous errors

    const optionName = Object.entries(AllData[capitalizeFirstLetter(selectedType) as keyof typeof AllData] as Record<string, string>).find(([key, name]) => key === selectedOption)?.[1];

    // Show confirmation prompt before executing the command
    const confirmation = await Swal.fire({
      icon: 'warning',
      title: 'ต้องการแก้ไขข้อมูล?',
      html: `ย้ายผู้ใช้ ${email} <p>ไป <b>${(selectedType === 'clubs' ? 'ชมรม' : '')}${optionName}</b> ?</p>`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    });

    if (!confirmation.isConfirmed) {
      setIsSubmitting(false); // Re-enable submit button if cancelled
      return; // Exit early if the user cancels
    }

    // Proceed with the form submission after confirmation
    try {
      const response = await changeUserData(email, selectedType, selectedOption);
      if (!response) {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล',
        });
        setIsSubmitting(false); // Re-enable submit button on error
        return;
      }
      switch (response?.status) {
        case 200:
          Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'ข้อมูลผู้ใช้ได้รับการเปลี่ยนแปลงเรียบร้อยแล้ว',
          }).then(() => {
            setEmailInput(email); // Set email to retain it after the submit
            setActiveTab('search'); // Switch to the search tab
            setUserData(null); // Clear user data
          });
          break;
        case 400:
          setError('Bad Request');
          break;
        case 404:
          setError('User not found');
          break;
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถส่งข้อมูลได้',
      });
      setError('Failed to submit changes.');
    } finally {
      setIsSubmitting(false); // Re-enable submit button after submission (success or failure)
    }
  };


  const handleTypeChange = (type: 'clubs' | 'organizations' | 'programs' | 'gifted') => {
    setSelectedType(type);
    setSelectedOption(null); // Reset selected option when the type changes
  };

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      {/* Modal Content */}
      <div className="bg-white rounded-lg p-6 w-1/3">
        {/* Modal Header with buttons */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-bold">ระบบแก้ไขข้อมูลผู้ใช้</h2>
          <div className="flex space-x-4">
            <button
              onClick={handleSearchClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              ค้นหาข้อมูลผู้ใช้
            </button>
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
            >
              แก้ไขข้อมูลผู้ใช้
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {activeTab === 'search' ? (
          <div>
            <h3 className="font-bold text-lg mt-5">ค้นหาข้อมูลผู้ใช้</h3>
            <form className="mt-4" onSubmit={handleSearchSubmit}>
              <label htmlFor="email" className="block text-sm font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="กรอกอีเมลของผู้ใช้"
                required
                value={emailInput} // Bind the email value here
                onChange={(e) => setEmailInput(e.target.value)} // Update email on change
              />
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
              >
                {isLoading ? 'Loading...' : 'Search'}
              </button>
            </form>

            {/* Display User Data or Error */}
            {isLoading && <p className="mt-4 text-gray-500">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {userData && (
              <div className="mt-4">
                <h4 className="font-bold">ข้อมูลผู้ใช้งาน:</h4>
                <pre className="mt-2 bg-gray-100 p-4 rounded-md">อีเมล: {userData.email}</pre>
                <pre className="bg-gray-100 p-4 rounded-md">หน่วยงาน: {(userData.tag === 'clubs') ? 'ชมรม' : userData.tag === 'organizations' ? 'องค์กร' : userData.tag === 'programs' ? 'สายการเรียน' : 'โครงการพัฒนาความสามารถพิเศษ'}</pre>
                <pre className="bg-gray-100 p-4 rounded-md">ชื่อหน่วยงาน: {keyData}</pre>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="font-bold text-lg mt-5">แก้ไขข้อมูลผู้ใช้</h3>
            <form className="mt-4" onSubmit={handleEditSubmit}>
              <label htmlFor="email" className="block text-sm font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="กรอกอีเมลของผู้ใช้"
                required
                value={emailInput} // Bind the email value here
                onChange={(e) => setEmailInput(e.target.value)} // Update email on change
              />

              {/* Error message display */}
              {error && <p className="mt-4 text-red-500">{error}</p>}

              <label className="block text-sm font-medium mt-5">
                ต้องการเปลี่ยนไปหน่วยงาน:
              </label>
              <div className="mt-2 flex space-x-4">
                {['clubs', 'organizations', 'programs', 'gifted'].map((type) => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={selectedType === type}
                      onChange={() => handleTypeChange(type as 'clubs' | 'organizations' | 'programs' | 'gifted')}
                      className="mr-2"
                    />
                    {type === 'clubs' ? 'ชมรม' : type === 'organizations' ? 'องค์กร' : type === 'programs' ? 'สายการเรียน' : 'โครงการพัฒนาความสามารถพิเศษ'}
                  </label>
                ))}
              </div>

              {/* Render options based on selectedType */}
              {selectedType && (
                <div className="mt-4">
                  <label className="block text-sm font-medium">เลือก {selectedType === 'clubs' ? 'ชมรม' : selectedType === 'organizations' ? 'องค์กร' : selectedType === 'programs' ? 'สายการเรียน' : 'โครงการ'}</label>
                  <select
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => handleOptionChange(e.target.value)}
                    value={selectedOption || ''}
                  >
                    <option value="" disabled>เลือกตัวเลือก</option>
                    {Object.entries(AllData[capitalizeFirstLetter(selectedType) as keyof typeof AllData] as Record<string, string>).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>
              )}

                <button
                  type="submit"
                  className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'กำลังส่ง...' : 'แก้ไขข้อมูล'}
                </button>
            </form>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={() => {
            setEmailInput('');
            setUserData(null);
            setActiveTab('search');
            onClose();
          }}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
        >
          ปิด
        </button>
      </div>
    </div>
  );
};

export default Modal;
