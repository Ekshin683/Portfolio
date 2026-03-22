const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API_ORIGIN = API_BASE_URL.replace(/\/?api\/?$/, '');

export const getAssetUrl = (assetPath) => {
    if (!assetPath) return '';
    if (/^https?:\/\//i.test(assetPath)) return assetPath;
    return `${API_ORIGIN}${assetPath}`;
};

export { API_BASE_URL, API_ORIGIN };
