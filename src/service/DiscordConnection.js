import { Client, GatewayIntentBits } from 'discord.js';

class DiscordConnection {
    /** @type {Client} */
    #client = null;
    /** @type {DiscordConnection|null} */
    static instance = null;

    // Private constructor to prevent direct instantiation
    constructor() {
        this.#client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildInvites,
            ],
        });

        this.token = process.env.DISCORD_TOKEN;
        this.#client.login(this.token);
    }

    // Static method to get the instance of the class
    static getInstance() {
        if (!this.instance) {
            this.instance = new DiscordConnection();
        }

        return this.instance;
    }

    /**
     * Method to generate a server invite
     */
    async generateInvite(guildId, channelId, options = {}) {
        try {
            const guild = await this.#client.guilds.fetch(guildId);
            const channel = await guild.channels.fetch(channelId);

            const inviteOptions = {
                maxAge: options.maxAge || 0,  // Invite never expires by default
                maxUses: options.maxUses || 0,  // Infinite uses by default
                unique: true,
            };

            const invite = await channel.createInvite(inviteOptions);
            return invite.url;
        } catch (error) {
            console.error('Error generating invite:', error);
            throw error;
        }
    }

    getDiscordClient() {
        return this.#client;
    }

    getGuild() {
        return this.#client.guilds.fetch(process.env.GUILD_ID);
    }

    close() {
        return this.#client.destroy();
    }
}

export default DiscordConnection;
