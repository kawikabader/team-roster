import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { FormInput } from './FormInput';

describe('FormInput', () => {
  const mockOnChange = vi.fn();
  const mockOnBlur = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders text input correctly', () => {
    render(
      <FormInput
        label="Test Input"
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const input = screen.getByLabelText(/test input/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'test');
  });

  it('renders textarea correctly', () => {
    render(
      <FormInput
        label="Test Textarea"
        name="test"
        type="textarea"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = screen.getByLabelText(/test textarea/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveAttribute('name', 'test');
  });

  it('displays error message when provided', () => {
    render(
      <FormInput
        label="Test Input"
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        error="This is an error"
        touched={true}
      />
    );

    expect(screen.getByText(/this is an error/i)).toBeInTheDocument();
  });

  it('does not display error message when not touched', () => {
    render(
      <FormInput
        label="Test Input"
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        error="This is an error"
        touched={false}
      />
    );

    expect(screen.queryByText(/this is an error/i)).not.toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    render(
      <FormInput
        label="Test Input"
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const input = screen.getByLabelText(/test input/i);

    // Simulate typing one character at a time to match userEvent behavior
    fireEvent.change(input, { target: { value: 'h' } });
    expect(mockOnChange).toHaveBeenCalledWith('test', 'h');

    fireEvent.change(input, { target: { value: 'he' } });
    expect(mockOnChange).toHaveBeenCalledWith('test', 'he');

    // Test that onChange is called
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('calls onBlur when input loses focus', () => {
    render(
      <FormInput
        label="Test Input"
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const input = screen.getByLabelText(/test input/i);
    fireEvent.blur(input);

    expect(mockOnBlur).toHaveBeenCalledWith('test');
  });

  it('applies error styles when error is present and touched', () => {
    render(
      <FormInput
        label="Test Input"
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        error="Error message"
        touched={true}
      />
    );

    const input = screen.getByLabelText(/test input/i);
    expect(input).toHaveClass('border-red-300');
  });

  it('shows required indicator when required prop is true', () => {
    render(
      <FormInput
        label="Test Input"
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        required
      />
    );

    expect(screen.getByText(/\*/)).toBeInTheDocument();
  });

  it('does not show required indicator when required prop is false', () => {
    render(
      <FormInput
        label="Test Input"
        name="test"
        type="text"
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        required={false}
      />
    );

    expect(screen.queryByText(/\*/)).not.toBeInTheDocument();
  });
}); 