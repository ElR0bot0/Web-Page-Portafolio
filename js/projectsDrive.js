import { GoogleAuth } from 'google-auth-library'; // Import the GoogleAuth class
// Load the service account credentials
const SERVICE_ACCOUNT_FILE = 'ServiceAccount.json';
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const FOLDERID = "1rLCPLl4Ousu5ow-IsMPWhZ7BZjkdhhb9";
async function authenticate() {
    const auth = new GoogleAuth({ // Use the GoogleAuth class
        keyFile: SERVICE_ACCOUNT_FILE,
        scopes: SCOPES,
    });

    return await auth.getClient();
}

async function listFiles() {
    const authClient = await authenticate();
    const drive = gapi.drive({ version: 'v3', auth: authClient });

    const folderId = FOLDERID;
    const res = await drive.files.list({
        q: `'${folderId}' in parents`,
        fields: 'files(id, name)',
    });

    const files = res.data.files;
    if (files.length === 0) {
        console.log('No files found.');
        return;
    }

    const fileList = document.getElementById('file-list');
    files.forEach(file => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `https://drive.google.com/file/d/${file.id}/view`;
        link.textContent = file.name;
        listItem.appendChild(link);
        fileList.appendChild(listItem);
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', listFiles);
}