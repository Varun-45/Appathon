

export const whatsapp = async (req, res) => {
    const messageText = encodeURIComponent('Hello dear customer the milk stock is ready kindly collect it');

    const whatsappUrl = `https://api.whatsapp.com/send?text=${messageText}`;

    console.log(whatsappUrl)
    res.redirect(whatsappUrl);

}