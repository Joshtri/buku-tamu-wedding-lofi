import { useState, FormEvent } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface GuestFormProps {
    onNewGuest: (newGuest: { name: string; message: string; jumlah_tamu: number }) => void;
}

function GuestForm({ onNewGuest }: GuestFormProps) {
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [numberOfGuests, setNumberOfGuests] = useState<number>(); // Default to 1 guest
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            // Make a POST request to the server
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/guests`, {
                name,
                message,
                jumlah_tamu: numberOfGuests, // Include numberOfGuests in the request body
            });

            // Show success toast notification
            toast.success('Data berhasil dikirim!');
            console.log('Response:', response.data);

            // Notify parent about the new guest
            onNewGuest(response.data);

            // Reset form fields
            setName('');
            setMessage('');
            setNumberOfGuests(1); // Reset to default value
        } catch (error) {
            // Show error toast notification
            toast.error('Terjadi kesalahan saat mengirim data.');
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
            <form 
                onSubmit={handleSubmit} 
                className="max-w-md w-full bg-white bg-opacity-10 p-6 rounded-lg shadow-lg space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">Buku Tamu Pernikahan</h1>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Nama</span>
                    </label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Masukkan nama Anda" 
                        className="input input-bordered w-full" 
                        required 
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Ucapan & Doa</span>
                    </label>
                    <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Tulis ucapan & doa Anda di sini" 
                        className="textarea textarea-bordered w-full" 
                        rows={4} 
                        required 
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Jumlah Tamu</span>
                    </label>
                    <input 
                        type="number" 
                        value={numberOfGuests} 
                        onChange={(e) => setNumberOfGuests(Number(e.target.value))} 
                        placeholder="Masukkan jumlah tamu" 
                        className="input input-bordered w-full" 
                        min={1} 
                        required 
                    />
                </div>

                <button 
                    type="submit" 
                    className={`btn btn-primary w-full ${loading ? 'loading' : ''}`} // Add loading class if loading
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Kirim...' : 'Kirim'}
                </button>
            </form>

            <ToastContainer /> {/* Toast container to display notifications */}
        </>
    );
}

export default GuestForm;
