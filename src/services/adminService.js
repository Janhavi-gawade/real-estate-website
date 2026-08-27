export const API_URL = import.meta.env.VITE_API_URL || '/api';

// --- AUTHENTICATION ---
export const loginAdmin = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
  
  const data = await response.json();
  localStorage.setItem('adminToken', data.token);
  return data;
};

export const logoutAdmin = () => {
  localStorage.removeItem('adminToken');
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const getUploadHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

// --- PROPERTIES ---
export const getProperties = async () => {
  const response = await fetch(`${API_URL}/properties`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch properties');
  return await response.json();
};

export const saveProperty = async (propertyData) => {
  const isEditing = !!propertyData.id;
  const url = isEditing ? `${API_URL}/properties/${propertyData.id}` : `${API_URL}/properties`;
  
  const response = await fetch(url, {
    method: isEditing ? 'PUT' : 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(propertyData)
  });
  if (!response.ok) throw new Error('Failed to save property');
  return await response.json();
};

export const deleteProperty = async (id) => {
  const response = await fetch(`${API_URL}/properties/${id}`, { 
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to delete property');
  return true;
};

// --- ENQUIRIES ---
export const getEnquiries = async () => {
  const response = await fetch(`${API_URL}/enquiries`, {
    headers: getAuthHeaders(),
    cache: 'no-store'
  });
  if (response.status === 401) {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
    throw new Error('Session expired');
  }
  if (!response.ok) throw new Error('Failed to fetch enquiries');
  return await response.json();
};

export const saveEnquiry = async (enquiryData) => {
  const response = await fetch(`${API_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // Public route, no auth needed
    body: JSON.stringify(enquiryData)
  });
  if (!response.ok) throw new Error('Failed to save enquiry');
  return await response.json();
};

export const updateEnquiryStatus = async (id, contacted) => {
  const response = await fetch(`${API_URL}/enquiries/${id}/status`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ contacted })
  });
  if (!response.ok) throw new Error('Failed to update enquiry status');
  return await response.json();
};

export const deleteEnquiry = async (id) => {
  const response = await fetch(`${API_URL}/enquiries/${id}`, { 
    method: 'DELETE',
    headers: getAuthHeaders()
  });
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
    headers: getAuthHeaders(),
    body: JSON.stringify(newSettings)
  });
  if (!response.ok) throw new Error('Failed to save settings');
  return await response.json();
};
