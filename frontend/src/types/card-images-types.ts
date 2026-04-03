export type CardImagesType = {
    public_id: string;
    url: string | string[];
    title: string | undefined;
    room_type: string | undefined;
    room_number: string | undefined;
    desc: string | undefined;
    price: string | undefined;
    onSale?: boolean;
    saleValue?: number | null;
    onAction?: () => void | Promise<void> | undefined;
};
