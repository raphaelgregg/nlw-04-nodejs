import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

class SendMailService {
    private client: Transporter;

    // constructor é um método que é executado assim que uma class é instanciada
    constructor() {
        /**
         * async/await usado quando o retorno é uma promisse 
         * const resposta = awat execute()
         * then() = resposta fica dentro do prorio then,
         * caso tenha erros é retornado atraves do catch()
         * motivo: constructo não aceita uso de async/await
         */
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth:{
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;

        })
    }
async execute(to: string, subject: string, variables: object, path:string) {
    
    // leitura do arquivo de template
    const templateFileContent = fs.readFileSync(path).toString("utf8");
    // copilação do template
    const mailTemplateParse = handlebars.compile(templateFileContent);
    // passou variaveis
    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
        to,
        subject,
        html,
        from: "NPS <noreplay@nps.com.br>"
    });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
}


}

export default new SendMailService();