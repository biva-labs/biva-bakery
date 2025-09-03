import axios from "axios"

export const createOrder = async (amount: number, currency: string = 'INR') => {
    try {
        const response = await axios.post('http://localhost:3000/api/orders', {
            amount: amount * 100,
            currency,
        })

        return response.data;
    }
    catch (error) {
        console.error('Order creation error:', error);
        throw error;
    }
}

export const loadRazorpayScript = (src: string) => {
    return new Promise((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve(true)
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false)
        };

        document.body.appendChild(script);
    })
}