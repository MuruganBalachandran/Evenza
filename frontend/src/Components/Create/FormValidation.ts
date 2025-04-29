export const validateBasicInfo = (data: any) => {
  const errors: Record<string, string> = {};
  
  if (!data.title?.trim()) {
    errors.title = 'Title is required';
  }
  if (!data.category) {
    errors.category = 'Category is required';
  }
  if (data.description && data.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }
  
  return errors;
};

export const validateDateTime = (data: any) => {
  const errors: Record<string, string> = {};
  
  if (!data.startDate) {
    errors.startDate = 'Start date is required';
  }
  if (!data.startTime) {
    errors.startTime = 'Start time is required';
  }
  if (data.startDate && data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
    errors.endDate = 'End date must be after start date';
  }
  
  return errors;
};

// Add more validation functions as needed
