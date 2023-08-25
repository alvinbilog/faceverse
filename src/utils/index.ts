export type RequiredField<
  Interface,
  Key extends keyof Interface
> = Partial<Interface> & Required<Pick<Interface, Key>>;
