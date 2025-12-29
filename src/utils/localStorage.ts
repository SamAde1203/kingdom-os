
// =============================================================================
// 2. src/utils/localStorage.ts - Data Persistence
// =============================================================================

export const STORAGE_KEYS = {
  ASSESSMENT: 'kingdom_os_assessment',
  CONTENT: 'kingdom_os_content',
  TEAM: 'kingdom_os_team',
  METRICS: 'kingdom_os_metrics',
  PRAYERS: 'kingdom_os_prayers',
  TESTIMONIES: 'kingdom_os_testimonies',
  SABBATH: 'kingdom_os_sabbath',
  CRISIS: 'kingdom_os_crisis',
  PARTNERSHIPS: 'kingdom_os_partnerships',
  CORRECTIONS: 'kingdom_os_corrections',
  CHURCH_GROWTH: 'kingdom_os_church_growth',
  SERVICES: 'kingdom_os_services',
  SHARED_TESTIMONIES: 'kingdom_os_shared_testimonies'
};

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

export const clearAllStorage = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
