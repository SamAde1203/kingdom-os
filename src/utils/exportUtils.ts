// =============================================================================
// 3. src/utils/exportUtils.ts - Export Functionality
// =============================================================================

export const exportToJSON = (data: any, filename: string): void => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportAllData = (allData: any): void => {
  exportToJSON(allData, 'kingdom_os_full_backup');
};
