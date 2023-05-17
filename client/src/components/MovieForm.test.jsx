import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieForm from './MovieForm';
import handleRequest from '../utils/HandleRequest';

// Mock handleRequest function
jest.mock('../utils/HandleRequest', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('MovieForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  window.alert = jest.fn();

  it('should update youtubeLink state when input value changes', () => {
    render(<MovieForm setIsSharing={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText('Enter YouTube link');

    fireEvent.change(inputElement, { target: { value: 'https://www.youtube.com/watch?v=abcdefg' } });

    expect(inputElement.value).toBe('https://www.youtube.com/watch?v=abcdefg');
  });

  it('should call handleShareClick when share button is clicked', async () => {
    const setIsSharing = jest.fn();

    render(<MovieForm setIsSharing={setIsSharing} />);

    const inputElement = screen.getByPlaceholderText('Enter YouTube link');
    const shareButton = screen.getByText('Share');

    fireEvent.change(inputElement, { target: { value: 'https://www.youtube.com/watch?v=abcdefg' } });
    fireEvent.click(shareButton);

    expect(handleRequest).toHaveBeenCalledWith('POST', 'movies', { movie: { link: 'https://www.youtube.com/watch?v=abcdefg' } });
  });

  it('should handle error when sharing movie', async () => {
    const errorMessage = 'Failed to share movie';

    // Mock handleRequest error response
    handleRequest.mockRejectedValueOnce({
      response: { data: { error: errorMessage } },
    });

    render(<MovieForm setIsSharing={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText('Enter YouTube link');
    const shareButton = screen.getByText('Share');

    fireEvent.change(inputElement, { target: { value: 'https://www.youtube.com/watch?v=abcdefg' } });
    fireEvent.click(shareButton);

    expect(handleRequest).toHaveBeenCalledWith('POST', 'movies', { movie: { link: 'https://www.youtube.com/watch?v=abcdefg' } });
  });
});