import { useEffect, type FC } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Stack, TextField } from '@mui/material';

import FieldErrorMsgWrap from './FieldErrorMsgWrap';
import type { FormEditAgentProps, FormSchemaType } from './types';

const FormEditAgent: FC<FormEditAgentProps> = ({
  agent,
  isLoading = false,
  onSuccessCallback,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>();

  const queryClient = useQueryClient();
  const { mutateAsync: updateOrAddAgent } = useMutation({
    mutationFn: async (agentFormData: FormSchemaType) => {
      if (agent) {
        await fetch(`/api/agents/${agent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...agent,
            ...agentFormData,
          }),
        });
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['agentsList'],
        refetchType: 'all',
      });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  useEffect(() => {
    return () => reset();
  }, []);

  useEffect(() => {
    if (agent) {
      reset({
        firstName: agent.first_name,
        lastName: agent.last_name,
        email: agent.email,
      });
    }
  }, [agent, reset]);

  const onSubmitAgent: SubmitHandler<FormSchemaType> = (data) => {
    updateOrAddAgent(data);
  };

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
