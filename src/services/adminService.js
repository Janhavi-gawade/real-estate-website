

/**
 * Data Service Layer
 * 
 * Note: Currently this uses localStorage so you can test it immediately without 
 * setting up a backend database. The API is structured asynchronously (Promises)
 * so that when you are ready to use a real database (like Firebase or Supabase),
 * you only need to change the implementation inside these functions, and the UI
 * will remain exactly the same.
 */

// Use the environment variable for API URL (localhost). If not found (Vercel), fallback to relative /api.
const API_URL = import.meta.env.VITE_API_URL || '/api';

// --- PROPERTIES ---

export const getProperties = async () => {
  const response = await fetch(`${API_URL}/properties`);
  if (!response.ok) {
    let errorMsg = `Server returned ${response.status}`;
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorMsg;
    } catch (e) {
      // response wasn't JSON
    }
    throw new Error(errorMsg);
  }
  return await response.json();
};

export const saveProperty = async (propertyData) => {
  const isEditing = !!propertyData.id;
  const url = isEditing ? `${API_URL}/properties/${propertyData.id}` : `${API_URL}/properties`;
  const method = isEditing ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(propertyData)
  });
  if (!response.ok) throw new Error('Failed to save property');
  return await response.json();
};

export const deleteProperty = async (id) => {
  const response = await fetch(`${API_URL}/properties/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete property');
  return true;
};

// --- ENQUIRIES ---

export const getEnquiries = async () => {
  const response = await fetch(`${API_URL}/enquiries`);
  if (!response.ok) throw new Error('Failed to fetch enquiries');
  return await response.json();
};

export const updateEnquiryStatus = async (id, contacted) => {
  const response = await fetch(`${API_URL}/enquiries/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contacted })
  });
  if (!response.ok) throw new Error('Failed to update enquiry status');
  return await response.json();
};

export const deleteEnquiry = async (id) => {
  const response = await fetch(`${API_URL}/enquiries/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete enquiry');
  return true;
};

// --- SETTINGS (Content & Contact) ---

export const getSettings = async () => {
  const response = await fetch(`${API_URL}/settings`);
  if (!response.ok) throw new Error('Failed to fetch settings');
  return await response.json();
};

export const saveSettings = async (newSettings) => {
  const response = await fetch(`${API_URL}/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSettings)
  });
  if (!response.ok) throw new Error('Failed to save settings');
  return await response.json();
};

