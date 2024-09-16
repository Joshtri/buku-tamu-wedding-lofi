import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GuestForm from './GuestForm'; // Import the GuestForm component

interface Guest {
  name: string;
  message: string;
}

const GuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Function to fetch guest data
    const fetchGuests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/guests`);
        
        // Log the response data to verify it's an array
        // console.log(response.data);

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setGuests(response.data);
        } else {
          setError('Invalid data format received from the API.');
        }
      } catch (error) {
        setError('Failed to fetch guests.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  // Function to add a new guest to the list
  const addGuest = (newGuest: Guest) => {
    setGuests((prevGuests) => [newGuest, ...prevGuests]);
  };

  // Calculate total pages
  const totalPages = Math.ceil(guests.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Get the current page data
  const indexOfLastGuest = currentPage * itemsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - itemsPerPage;
  const currentGuests = guests.slice(indexOfFirstGuest, indexOfLastGuest);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="spinner"></div>
    </div>
  );
  
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-sm w-full bg-white bg-opacity-70 p-4 rounded-lg shadow-lg mt-4">
      {/* Render GuestForm and pass addGuest function */}
      <GuestForm onNewGuest={addGuest} />

      <h2 className="text-lg font-bold text-center mb-4 mt-3 underline">Daftar ucapan dari tamu</h2>
      <div className="space-y-4">
        {currentGuests.map((guest, index) => (
          <div key={index} className="bg-blue-200 p-4 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="p-4 rounded-lg">
                <div className="font-bold">{guest.name}</div>
                <div className="mt-2 text-gray-700">{guest.message}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GuestList;
