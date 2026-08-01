import { initialProperties, initialEnquiries, initialSettings } from './mockData';

/**
 * Data Service Layer
 * 
 * Note: Currently this uses localStorage so you can test it immediately without 
 * setting up a backend database. The API is structured asynchronously (Promises)
 * so that when you are ready to use a real database (like Firebase or Supabase),
 * you only need to change the implementation inside these functions, and the UI
 * will remain exactly the same.
 */

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getStorage = (key, defaultData) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(data);
};

const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- PROPERTIES ---

export const getProperties = async () => {
  await delay(300); // Simulate network latency
  return getStorage('re_properties', initialProperties);
};

export const saveProperty = async (propertyData) => {
  await delay(500);
  const properties = getStorage('re_properties', initialProperties);
  
  if (propertyData.id) {
    // Edit
    const index = properties.findIndex(p => p.id === propertyData.id);
    if (index !== -1) properties[index] = propertyData;
  } else {
    // Create
    propertyData.id = Date.now().toString();
    properties.push(propertyData);
  }
  
  setStorage('re_properties', properties);
  return propertyData;
};

export const deleteProperty = async (id) => {
  await delay(400);
  let properties = getStorage('re_properties', initialProperties);
  properties = properties.filter(p => p.id !== id);
  setStorage('re_properties', properties);
  return true;
};

// --- ENQUIRIES ---

export const getEnquiries = async () => {
  await delay(300);
  return getStorage('re_enquiries', initialEnquiries);
};

export const updateEnquiryStatus = async (id, contacted) => {
  await delay(300);
  const enquiries = getStorage('re_enquiries', initialEnquiries);
  const index = enquiries.findIndex(e => e.id === id);
  if (index !== -1) {
    enquiries[index].contacted = contacted;
    setStorage('re_enquiries', enquiries);
  }
  return enquiries[index];
};

export const deleteEnquiry = async (id) => {
  await delay(300);
  let enquiries = getStorage('re_enquiries', initialEnquiries);
  enquiries = enquiries.filter(e => e.id !== id);
  setStorage('re_enquiries', enquiries);
  return true;
};

// --- SETTINGS (Content & Contact) ---

export const getSettings = async () => {
  await delay(200);
  return getStorage('re_settings', initialSettings);
};

export const saveSettings = async (newSettings) => {
  await delay(400);
  const current = getStorage('re_settings', initialSettings);
  const updated = { ...current, ...newSettings };
  setStorage('re_settings', updated);
  return updated;
};
