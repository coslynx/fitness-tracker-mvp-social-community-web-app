import { isEmail } from 'validator';

export const validateEmail = (email: string) => {
  if (!email) {
    return 'Email is required';
  }

  if (!isEmail(email)) {
    return 'Invalid email address';
  }

  return null;
};

export const validatePassword = (password: string) => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  return null;
};

export const validateName = (name: string) => {
  if (!name) {
    return 'Name is required';
  }

  return null;
};

export const validateGoalType = (type: string) => {
  if (!type) {
    return 'Goal type is required';
  }

  return null;
};

export const validateTargetValue = (targetValue: number) => {
  if (!targetValue) {
    return 'Target value is required';
  }

  if (targetValue <= 0) {
    return 'Target value must be greater than 0';
  }

  return null;
};

export const validateStartDate = (startDate: string) => {
  if (!startDate) {
    return 'Start date is required';
  }

  return null;
};

export const validateEndDate = (endDate: string) => {
  if (!endDate) {
    return 'End date is required';
  }

  return null;
};

export const validateActivityType = (type: string) => {
  if (!type) {
    return 'Activity type is required';
  }

  return null;
};

export const validateDuration = (duration: number) => {
  if (!duration) {
    return 'Duration is required';
  }

  if (duration <= 0) {
    return 'Duration must be greater than 0';
  }

  return null;
};

export const validateCaloriesBurned = (caloriesBurned: number) => {
  if (!caloriesBurned) {
    return 'Calories burned is required';
  }

  if (caloriesBurned <= 0) {
    return 'Calories burned must be greater than 0';
  }

  return null;
};