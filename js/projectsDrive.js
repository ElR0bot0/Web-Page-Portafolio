// Load the service account credentials
const CREDENTIALS_PATH = 'Jsons/Credentials.json';
const SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
const FOLDERID = "1rLCPLl4Ousu5ow-IsMPWhZ7BZjkdhhb9";
function handleClientLoad() {
    
        getFilesFromDrive();
}

async function getFilesFromDrive() {
    const API_KEY = await fetch(CREDENTIALS_PATH)
        .then(response => response.json())
        .then(data => data.web.API)
        .catch(error => console.error('Error fetching credentials:', error));
    const CLIENT_ID = await fetch(CREDENTIALS_PATH)
        .then(response => response.json())
        .then(data => data.web.client_id)
        .catch(error => console.error('Error fetching credentials:', error));

    gapi.load('client:auth2', () => {
        gapi.auth2.init({
            client_id: CLIENT_ID,
            apiKey: API_KEY,
            scope: SCOPE
        }).then(() => {
            gapi.client.load('drive', 'v3', () => {
                gapi.client.drive.files.list({
                    q: `'${FOLDERID}' in parents`,
                    fields: 'files(id, name)',
                }).then(response => {
                    const files = response.result.files;
                    if (files && files.length > 0) {
                        const fileList = document.getElementById('file-list');
                        files.forEach(file => {
                            const listItem = document.createElement('li');
                            const link = document.createElement('a');
                            link.href = `https://drive.google.com/file/d/${file.id}/view`;
                            link.textContent = file.name;
                            listItem.appendChild(link);
                            fileList.appendChild(listItem);
                        });
                    } else {
                        console.log('No files found.');
                    }
                }).catch(error => {
                    console.error('Error listing files:', error);
                });
            });
        }).catch(error => {
            console.error('Error initializing Google Drive API:', error);
        });
    });
}