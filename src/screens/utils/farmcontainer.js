import React from 'react';
import { View, Text } from 'react-native';

export function farmcontainer(items, farmName) {
  for (const item of items) {
    if (item.name.toLowerCase() === farmName.toLowerCase()) {
      return true;
    }
  }

  return false;
}
