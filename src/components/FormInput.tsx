import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError | { message?: string };
  helperText?: string;
  children?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, children, className = '', ...props }, ref) => {
    const hasError = !!error;
    const errorMessage = error?.message;

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label 
            htmlFor={props.id}
            className={`text-xs font-medium ${
              hasError ? 'text-red-400' : 'text-text-secondary'
            }`}
          >
            {label}
            {props.required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full rounded-xl border px-4 py-3 text-sm text-text-primary outline-none ring-0 
              placeholder:text-text-muted transition-colors
              ${hasError 
                ? 'border-red-500/70 bg-red-500/5 focus:border-red-500' 
                : 'border-border-primary bg-background-secondary/30 focus:border-axion-500/70'
              }
              ${className}
            `}
            {...props}
          />
          {children}
        </div>
        
        <div className="min-h-[1.25rem]">
          {errorMessage ? (
            <p className="text-xs text-red-500 dark:text-red-400">{errorMessage}</p>
          ) : helperText ? (
            <p className="text-xs text-text-muted">{helperText}</p>
          ) : null}
        </div>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
