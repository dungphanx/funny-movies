import React from 'react';
import { render, screen } from '@testing-library/react';
import BannerNotification from './BannerNotification';

describe('BannerNotification', () => {
  test('renders the notification with the correct message and type', () => {
    const message = 'This is a sample notification';
    const type = 'success';
    render(<BannerNotification message={message} type={type} />);
    
    const notificationElement = screen.getByRole('alert');
    expect(notificationElement).toHaveClass(`alert alert-${type}`);
    
    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });
});
