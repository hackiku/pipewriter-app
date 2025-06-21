// src/lib/server/export.ts

// Simple stub function since make.com is no longer used
export async function sendToMake(payload: any) {
  console.log('sendToMake called (deprecated):', payload);
  
  return {
    success: true,
    message: 'Export functionality temporarily disabled'
  };
}