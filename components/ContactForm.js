import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      // Clear the form fields on clean success
      setStatus({ loading: false, success: 'Message sent successfully! Speak soon. ✨', error: null });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" className="w-full p-2 border rounded" />
      </div>

      <button type="submit" disabled={status.loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {status.loading ? 'Sending Message...' : 'Send Message ✨'}
      </button>

      {status.success && <p className="text-green-600 font-medium text-sm mt-2">{status.success}</p>}
      {status.error && <p className="text-red-500 font-medium text-sm mt-2">{status.error}</p>}
    </form>
  );
}