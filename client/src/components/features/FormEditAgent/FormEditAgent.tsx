import { type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Stack, TextField } from '@mui/material';

import FieldErrorMsgWrap from './FieldErrorMsgWrap';
import type { FormEditAgentProps, FormSchemaType } from './types';

const FormEditAgent: FC<FormEditAgentProps> = ({ agent, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    defaultValues: agent
      ? {
          firstName: agent.first_name,
          lastName: agent.last_name,
          email: agent.email,
        }
      : undefined,
  });

  const onSubmitAgent: SubmitHandler<FormSchemaType> = (data) =>
    console.log(data);

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmitAgent)} spacing={3}>
      <FieldErrorMsgWrap
        showError={!!errors.firstName}
        message="First name is required"
      >
        <TextField
          error={!!errors.firstName}
          id="firstName"
          label="First Name"
          variant="outlined"
          {...register('firstName', { required: true })}
        />
      </FieldErrorMsgWrap>
      <FieldErrorMsgWrap
        showError={!!errors.lastName}
        message="Last name is required"
      >
        <TextField
          error={!!errors.lastName}
          id="lastName"
          label="Last Name"
          variant="outlined"
          {...register('lastName', { required: true })}
        />
      </FieldErrorMsgWrap>
      <FieldErrorMsgWrap showError={!!errors.email} message="Email is required">
        <TextField
          error={!!errors.email}
          id="email"
          label="Email"
          variant="outlined"
          type="email"
          {...register('email', { required: true })}
        />
      </FieldErrorMsgWrap>
      <Button type="submit" variant="outlined" disabled={isLoading}>
        Submit
      </Button>
    </Stack>
  );
};

export default FormEditAgent;
