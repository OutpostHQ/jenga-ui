import { forwardRef, ReactNode } from 'react';
import { chain } from '@react-aria/utils';
import { Button, JengaButtonProps } from '@jenga-ui/button';
import { ButtonGroup } from '@jenga-ui/button-group';
import { JengaDialogProps, Dialog, useDialogContext } from '@jenga-ui/dialog';
import { Title, Header, Paragraph, Content, Footer } from '@jenga-ui/content';

export interface JengaAlertDialogActionsProps {
  confirm?: JengaButtonProps | boolean;
  secondary?: JengaButtonProps;
  cancel?: JengaButtonProps | boolean;
}

export interface JengaAlertDialogProps
  extends Omit<JengaDialogProps, 'children'> {
  content?: ReactNode;
  /** Whether the dialog is an important prompt */
  danger?: boolean;
  actions?: JengaAlertDialogActionsProps;
  title?: string;
  noActions?: boolean;
}

const DEFAULT_CONFIRM_PROPS: JengaButtonProps = {
  label: 'Ok',
  type: 'primary',
};
const DEFAULT_CANCEL_PROPS: JengaButtonProps = {
  label: 'Cancel',
};

/**
 * AlertDialogs are a specific type of Dialog. They display important information that users need to acknowledge.
 */
function AlertDialog(props: JengaAlertDialogProps, ref) {
  const { onClose } = useDialogContext();

  const { danger, actions, title, styles, noActions, content, ...otherProps } =
    props;

  let {
    confirm: confirmProps,
    secondary: secondaryProps,
    cancel: cancelProps,
  } = actions ?? {};

  // the confirm button is present by default
  confirmProps =
    confirmProps !== false
      ? {
          ...DEFAULT_CONFIRM_PROPS,
          ...(typeof confirmProps === 'object' ? confirmProps : null),
        }
      : undefined;

  // the cancel button is hidden by default
  cancelProps = cancelProps
    ? {
        ...DEFAULT_CANCEL_PROPS,
        ...(typeof cancelProps === 'object' ? cancelProps : null),
      }
    : undefined;

  return (
    <Dialog role="alertdialog" ref={ref} isDismissable={false} {...otherProps}>
      {title ? (
        <Header>
          <Title>{title}</Title>
        </Header>
      ) : null}
      {content ? (
        <Content>
          {typeof content === 'string' ? (
            <Paragraph>{content}</Paragraph>
          ) : (
            content
          )}
        </Content>
      ) : null}
      {!noActions ? (
        <Footer>
          <ButtonGroup align="end">
            <Button
              theme={danger ? 'danger' : undefined}
              autoFocus
              {...confirmProps}
              onPress={(e) =>
                chain(
                  (confirmProps as JengaButtonProps)?.onPress?.(e),
                  onClose?.('confirm'),
                )
              }
            />
            {secondaryProps && (
              <Button
                {...secondaryProps}
                onPress={(e) =>
                  chain(secondaryProps?.onPress?.(e), onClose?.('secondary'))
                }
              />
            )}
            {cancelProps && (
              <Button
                {...cancelProps}
                onPress={(e) =>
                  chain(
                    (cancelProps as JengaButtonProps)?.onPress?.(e),
                    onClose?.('cancel'),
                  )
                }
              />
            )}
          </ButtonGroup>
        </Footer>
      ) : null}
    </Dialog>
  );
}

/**
 * AlertDialogs are a specific type of Dialog. They display important information that users need to acknowledge.
 */
const _AlertDialog = forwardRef(AlertDialog);
export { _AlertDialog as AlertDialog };
