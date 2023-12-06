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
            intro: 'Welcome to PALOMADE! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with PALOMADE, please take a look in our guide in here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Check Guide',
                    link: 'https://github.com/CH2-PS324/palomade-api'
                }
            }
        }
    };

    return mail = MailGenerator.generate(response);
}
