import {
  JengaTitleProps,
  Title,
  JengaTextProps,
  Text,
  JengaParagraphProps,
  Paragraph,
} from '@jenga-ui/content';

export { Item, Section } from '@react-stately/collections';

// generic components
export { Base, Block, Root } from '@jenga-ui/core';
export type { JengaBlockProps, JengaRootProps } from '@jenga-ui/core';
export { ActiveZone } from '@jenga-ui/active-zone';
export type { JengaActiveZoneProps } from '@jenga-ui/active-zone';
export * from '@jenga-ui/copy-snippet';
export { Grid, Flex, Space, Flow, Prefix, Suffix } from '@jenga-ui/layout';
export type {
  JengaGridProps,
  JengaFlexProps,
  JengaSpaceProps,
  JengaFlowProps,
  JengaPrefixProps,
  JengaSuffixProps,
} from '@jenga-ui/layout';
export { Link } from '@jenga-ui/link';
export { PrismCode } from '@jenga-ui/prism-code';
export type { JengaPrismCodeProps } from '@jenga-ui/prism-code';
export { Divider, Content, Header, Footer } from '@jenga-ui/content';
export type {
  JengaDividerProps,
  JengaContentProps,
  JengaHeaderProps,
  JengaFooterProps,
} from '@jenga-ui/content';
export { GridProvider } from '@jenga-ui/providers';
export type { JengaGridProviderProps } from '@jenga-ui/providers';
export { Result } from '@jenga-ui/result';
export type { JengaResultProps, JengaResultStatus } from '@jenga-ui/result';
export { FieldWrapper } from '@jenga-ui/form';
export type { JengaFieldWrapperProps } from '@jenga-ui/form';

// atoms
export { Card } from '@jenga-ui/card';
export type { JengaCardProps } from '@jenga-ui/card';
export * from '@jenga-ui/button';
export * from '@jenga-ui/button-group';
export { Placeholder } from '@jenga-ui/placeholder';
export type { JengaPlaceholderProps } from '@jenga-ui/placeholder';
export { Skeleton } from '@jenga-ui/skeleton';
export type { JengaSkeletonProps } from '@jenga-ui/skeleton';
export { Badge } from '@jenga-ui/badge';
export type { JengaBadgeProps } from '@jenga-ui/badge';
export { Tag } from '@jenga-ui/tag';
export type { JengaTagProps } from '@jenga-ui/tag';
export { SearchInput } from '@jenga-ui/search-input';
export type { JengaSearchInputProps } from '@jenga-ui/search-input';
export { Submit } from '@jenga-ui/button';
export type { JengaTextInputBaseProps } from '@jenga-ui/text-input';
export type { JengaTextInputBaseProps as JengaTextInputProps } from '@jenga-ui/text-input';
export { TextInput } from '@jenga-ui/text-input';
export { TextArea } from '@jenga-ui/textarea';
export type { JengaTextAreaProps } from '@jenga-ui/textarea';
export { FileInput } from '@jenga-ui/file-input';
export type { JengaFileInputProps } from '@jenga-ui/file-input';
export { PasswordInput } from '@jenga-ui/password-input';
export { Checkbox } from '@jenga-ui/checkbox';
export type { JengaCheckboxProps } from '@jenga-ui/checkbox';
export { CheckboxGroup } from '@jenga-ui/checkbox';
export type { JengaCheckboxGroupProps } from '@jenga-ui/checkbox';
export { Switch } from '@jenga-ui/switch';
export type { JengaSwitchProps } from '@jenga-ui/switch';
export { Radio } from '@jenga-ui/radio';
export type { JengaRadioProps } from '@jenga-ui/radio';
export { ComboBox } from '@jenga-ui/combo-box';
export type { JengaComboBoxProps } from '@jenga-ui/combo-box';
export { Menu } from '@jenga-ui/menu';
export type { JengaMenuProps } from '@jenga-ui/menu';
export { MenuTrigger } from '@jenga-ui/menu';
export type { JengaMenuTriggerProps } from '@jenga-ui/menu';
export { Select, ListBoxPopup } from '@jenga-ui/select';
export type { JengaSelectProps, JengaSelectBaseProps } from '@jenga-ui/select';
export { NumberInput } from '@jenga-ui/number-input';
export type { JengaNumberInputProps } from '@jenga-ui/number-input';
export { Avatar } from '@jenga-ui/avatar';
export type { JengaAvatarProps } from '@jenga-ui/avatar';
export {
  Dialog,
  DialogTrigger,
  DialogContainer,
  DialogForm,
} from '@jenga-ui/dialog';
export type {
  JengaDialogTriggerProps,
  JengaDialogContainerProps,
  JengaDialogProps,
  JengaDialogFormRef,
  JengaDialogFormProps,
} from '@jenga-ui/dialog';
export { Tooltip } from '@jenga-ui/tooltip';
export type { JengaTooltipProps } from '@jenga-ui/tooltip';
export { TooltipTrigger } from '@jenga-ui/tooltip';
export type { JengaTooltipTriggerProps } from '@jenga-ui/tooltip';
export { TooltipProvider } from '@jenga-ui/tooltip';
export type { JengaTooltipProviderProps } from '@jenga-ui/tooltip';

export * from '@jenga-ui/copy-snippet';
export * from '@jenga-ui/alert';

// molecules
export { LegacyTabs } from '@jenga-ui/Tabs';
export type { JengaTabsProps } from '@jenga-ui/Tabs';
export { Modal } from '@jenga-ui/modal';
export type { JengaModalProps } from '@jenga-ui/modal';
export { AlertDialog, useAlertDialogAPI } from '@jenga-ui/alert-dialog';
export type { JengaAlertDialogProps } from '@jenga-ui/alert-dialog';

// services
export { notification } from '@jenga-ui/services';
export type { JengaNotificationOptions } from '@jenga-ui/services';

export * from 'tastycss';

export const Typography = {
  Text,
  Title,
  Paragraph,
};

export { Text, Title, Paragraph };
export type { JengaTextProps, JengaTitleProps, JengaParagraphProps };

export { useContextStyles, StyleProvider } from '@jenga-ui/providers';

export { Provider } from '@jenga-ui/providers';
export type { useProviderProps } from '@jenga-ui/providers';
export { Portal } from '@jenga-ui/portal';
export type { PortalProps } from '@jenga-ui/portal';
export * from '@jenga-ui/form';

export type {
  TagName,
  TagNameProps,
  AllBaseProps,
  BaseProps,
  BaseStyleProps,
  DimensionStyleProps,
  ColorStyleProps,
  OuterStyleProps,
  PositionStyleProps,
  TextStyleProps,
  BlockStyleProps,
  ContainerStyleProps,
  BasePropsWithoutChildren,
  Props,
  FlowStyleProps,
  ShortGridStyles,
} from 'tastycss';
export * from 'tastycss';

export { ModalProvider } from '@react-aria/overlays';
export * from 'tastycss';
export { default as copy } from 'clipboard-copy';
export * from '@react-aria/ssr';
export * from '@jenga-ui/form';
