import React from 'react';
import { FormProvider } from 'react-hook-form';

const Form = ({
  children,
  onSubmit,
  formMethods,
  className = '',
  ...props
}) => {
  const handleSubmit = formMethods.handleSubmit(onSubmit);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit}
        className={`space-y-4 ${className}`}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;