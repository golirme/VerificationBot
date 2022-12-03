const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonStyle, TextInputStyle, Events } = require("discord.js");
const { SlashCommandBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder } = require("@discordjs/builders");
const { showModal, Modal, TextInputComponent } = require("discord-modals");

function gerar(length) {
    var result = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=+';
    var charLenght = chars.length;

    for( var i = 0 ; i < length ; i++){
        result += chars.charAt(Math.floor(Math.random() * charLenght));
    }
    return result;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("captcha")
    .setDescription("Cria um sistema de captcha."),
    run: async (client, interaction) => {

const captchacerto = gerar(5);

const modall = new Modal()
.setCustomId("primary")
.setTitle("Captcha")
.addComponents(
    new TextInputComponent()
    .setCustomId("captcha-solve")
    .setLabel("Inserir Captcha: " + captchacerto)
    .setStyle("SHORT")
    .setMinLength(5)
    .setMaxLength(5)
    .setPlaceholder("Insira o captcha")
    .setRequired(true)
);


const embedd = new EmbedBuilder()
.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
.setDescription('Clique no botao para iniciar o sistema de captcha')
.setColor("DarkBlue")
.setTimestamp();

const button = new ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setCustomId('primary')
    .setLabel('Iniciar')
    .setStyle(ButtonStyle.Primary),
)
        interaction.reply({ embeds: [embedd], components: [button] });
        const filter = i => i.customId === 'primary';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async i => {
            await showModal(modall, {
                client: client,
                interaction: i,
            })
            client.on(Events.InteractionCreate, submit => {
                if(!submit.isModalSubmit()) return;

                const resposta = submit.fields.getTextInputValue("captcha-solve");

                if(resposta == captchacerto){
                    submit.member.roles.add("1048607194196742225");
                } else {
                    submit.reply("Captcha errado")
                }
            })
        });   
    }
 };
