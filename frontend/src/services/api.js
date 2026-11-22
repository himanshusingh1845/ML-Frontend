const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Perform single-model fake news prediction.
 * @param {string} text News headline or article
 * @param {string} model Model choice ('logistic_regression' or 'naive_bayes')
 */
export async function predictNews(text, model = 'logistic_regression') {
  const url = `${API_BASE_URL}/predict`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, model }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server returned ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error in predictNews:', error);
    throw error;
  }
}

/**
 * Perform simultaneous dual-model comparison.
 * @param {string} text News headline or article
 */
export async function compareModels(text) {
  const url = `${API_BASE_URL}/compare`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Server returned ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error in compareModels:', error);
    throw error;
  }
}

/**
 * Check backend health status.
 */
export async function checkHealth() {
  const url = `${API_BASE_URL}/health`;
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) return { status: 'down', error: response.statusText };
    return await response.json();
  } catch (error) {
    return { status: 'down', error: error.message };
  }
}

/**
 * Fetch model metadata and dataset metrics.
 */
export async function fetchMetrics() {
  const url = `${API_BASE_URL}/api/metrics`;
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) throw new Error('Failed to fetch metrics');
    return await response.json();
  } catch (error) {
    console.warn('Could not fetch remote metrics, using static fallback');
    return null;
  }
}
