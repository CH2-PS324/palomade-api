const Mailgen = require('mailgen');

exports.mailWelcomeTemplate = (data) => {
    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'PALOMADE',
            link: 'https://github.com/CH2-PS324'
        }
    });

    let response = {
        body: {
            name: data.name,
            intro: 'Selamat Datang di PALOMADE! Kami sangat senang dengan kehadiranmu di aplikasi kami.',
            action: {
                instructions: 'Untuk memulai menggunakan aplikasi kami, Kamu bisa melihat panduan pengguna di:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Cek Panduan',
                    link: 'https://github.com/CH2-PS324/palomade-api'
                }
            }
        }
    };

    return mail = MailGenerator.generate(response);
}
