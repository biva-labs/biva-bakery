
export default function wa_link(message: string, phone: string) {
    return `
        https://wa.me/${phone}?text=${message}
    `
}