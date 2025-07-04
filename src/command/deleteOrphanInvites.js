import DiscordConnection from "../service/DiscordConnection.js";
import CodeManager from "../service/CodeManager.js";

export default async () => {
    const guild = await DiscordConnection.getInstance().getGuild();

    console.log(`Fetching invites of guild ${guild.name}`);

    const invites = await guild.invites.fetch();

    if (invites.size === 0) {
        console.log('No invites found.');
        process.exit();
    }

    const currentInvitesCodes = CodeManager.getInstance().getDiscordInvites(true);
    console.log(`Found ${invites.size} invites, ${currentInvitesCodes.length} stored in the database.`);

    for (const [code, invite] of invites) {
        if (invite.uses === 0 && currentInvitesCodes.includes(invite.code) === false) {
            console.log(`Invite ${invite.code} is orphan, deleting it.`);

            await invite.delete('Orphan invite').then((invite) => {
                console.log(`Invite ${invite.code} deleted.`);
            });
        }
    }

    process.exit();
}
