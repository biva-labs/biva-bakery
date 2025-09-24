

export type CardImagesType =  {
  public_id: string;
  url: string | string[];
  title: string | undefined;
  tag: string | undefined;
  desc: string | undefined;
  price: string | undefined;
  onAction: () => void | Promise<void> | undefined;
}

