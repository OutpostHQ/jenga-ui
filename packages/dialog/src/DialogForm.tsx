import { useImperativeHandle } from 'react';
import { Dialog, JengaDialogProps } from './Dialog';
import { Title, Content, Header } from '@jenga-ui/content';
import { JengaFormProps, Form, useForm } from '@jenga-ui/form';
import { Button, JengaButtonProps, Submit } from '@jenga-ui/button';
import { ButtonGroup } from '@jenga-ui/button-group';
import { useDialogContext } from './context';

export interface JengaDialogFormProps
  extends JengaDialogProps,
    Omit<JengaFormProps, 'role'> {
  /** Whether the submit button has a `danger` theme */
  danger?: boolean;
  /** Properties for submit button. Use `label` to change text. */
  submitProps?: JengaButtonProps;
  /** Properties for cancel button. Use `label` to change text. */
  cancelProps?: JengaButtonProps;
  /** WIP. Preserve form values even if field is deleted */
  preserve?: boolean;
  /** Whether to hide action button so developer can manually specify them */
  noActions?: boolean;
  /** The title of the dialog */
  title?: string;
}

export interface JengaDialogFormRef {
  open: () => void;
  close: () => void;
}

/**
 * DialogForms are a specific type of Dialog. They contain forms to fill.
 */
export const DialogForm = function DialogForm(props: JengaDialogFormProps) {
  let {
    qa,
    name,
    form,
    defaultValues,
    onDismiss,
    onSubmit,
    onSubmitFailed,
    onValuesChange,
    labelStyles,
    labelPosition,
    requiredMark,
    isRequired,
    necessityIndicator,
    necessityLabel,
    isReadOnly,
    validationState,
    validateTrigger,
    children,
    danger,
    noActions,
    submitProps,
    cancelProps,
    preserve,
    title,
    size,
    closeIcon,
    ...dialogProps
  } = props;

  [form] = useForm(form);

  const { onClose } = useDialogContext();

  function onLocalDismiss() {
    onClose?.();
    onDismiss?.();

    if (!preserve) {
      form?.resetFields();
    }
  }

  return (
    <Dialog
      qa={`${qa || ''}Dialog`}
      size={size}
      closeIcon={closeIcon}
      {...dialogProps}
    >
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>
        <Form
          qa={qa || 'DialogForm'}
          form={form}
          name={name}
          onSubmit={async (data) => {
            await onSubmit?.(data);

            onClose?.();

            if (!preserve) {
              form?.resetFields();
            }
          }}
          onSubmitFailed={onSubmitFailed}
          defaultValues={defaultValues}
          onValuesChange={onValuesChange}
          labelStyles={labelStyles}
          labelPosition={labelPosition}
          requiredMark={requiredMark}
          isRequired={isRequired}
          necessityIndicator={necessityIndicator}
          necessityLabel={necessityLabel}
          isReadOnly={isReadOnly}
          validationState={validationState}
          validateTrigger={validateTrigger}
        >
          {typeof children === 'function' ? children(onLocalDismiss) : children}

          {!noActions ? (
            <ButtonGroup>
              <Submit
                qa={`${qa || ''}SubmitButton`}
                theme={danger ? 'danger' : undefined}
                label="Submit"
                {...(submitProps || {})}
              />
              <Button
                qa={`${qa || ''}CancelButton`}
                onPress={onLocalDismiss}
                label="Cancel"
                {...(cancelProps || {})}
              />
            </ButtonGroup>
          ) : undefined}
        </Form>
      </Content>
    </Dialog>
  );
};
