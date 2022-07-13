import { JengaButtonProps } from '@jenga-ui/button';
import { Portal } from '@jenga-ui/portal';
import { DialogContainer } from '@jenga-ui/dialog';
import { AlertDialog, JengaAlertDialogActionsProps } from './AlertDialog';
import { AlertDialogResolveStatus, Dialog } from './types';

export interface DialogZoneProps {
  openedDialog: Dialog | null;
}

const PORTAL_KEY = 'AlertDialogZone';

/**
 * @internal Do not use it
 */
export function AlertDialogZone(props: DialogZoneProps): JSX.Element {
  const { openedDialog } = props;

  if (openedDialog === null) return <Portal key={PORTAL_KEY} />;

  const {
    type,
    isDismissable = true,
    actions,
    onDismiss,
    content,
    ...options
  } = openedDialog.props;
  const { resolve, reject, isVisible, dialogType } = openedDialog.meta;

  const _actions: JengaAlertDialogActionsProps = (() => {
    const mergeActionProps = <
      T extends
        | JengaAlertDialogActionsProps['confirm']
        | JengaAlertDialogActionsProps['secondary'],
    >(
      action: T,
      status: AlertDialogResolveStatus,
    ): T => {
      if (typeof action === 'undefined') {
        return undefined as unknown as T;
      }

      if (typeof action === 'boolean') {
        return (action
          ? { onPress: () => resolve(status) }
          : false) as unknown as T;
      }

      const onPress = action.onPress;

      return {
        ...(action as JengaButtonProps),
        onPress: (e) => {
          onPress?.(e);
          resolve(status);
        },
      } as T;
    };

    if (typeof actions === 'undefined') return {};

    return {
      confirm: mergeActionProps(actions.confirm, 'confirm'),
      secondary: mergeActionProps(actions.secondary, 'secondary'),
      cancel: mergeActionProps(actions.cancel, 'cancel'),
    };
  })();

  return (
    <Portal key={PORTAL_KEY}>
      <DialogContainer
        isOpen={isVisible}
        isDismissable={isDismissable}
        type={type}
        onDismiss={resolve}
      >
        <AlertDialog
          noActions={dialogType === 'form'}
          actions={_actions}
          isHidden={!isVisible}
          content={
            typeof content === 'function'
              ? content({ resolve, reject })
              : content
          }
          {...options}
        />
      </DialogContainer>
    </Portal>
  );
}
