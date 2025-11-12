// Import necessary modules
const fs = require('fs').promises; // We use the 'promises' version for cleaner async code
const path = require('path');
const os = require('os');

// 1. Define the folder to watch
// os.homedir() finds your user's home directory (e.g., C:\Users\YourUser or /Users/YourUser)
const downloadsFolder = path.join(os.homedir(), 'Downloads');

// 2. Define the destination folders
// You can easily add more rules here!
const targetFolders = {
    // Images
    '.jpg': path.join(os.homedir(), 'Pictures', 'Images'),
    '.jpeg': path.join(os.homedir(), 'Pictures', 'Images'),
    '.png': path.join(os.homedir(), 'Pictures', 'Images'),
    '.gif': path.join(os.homedir(), 'Pictures', 'Gifs'),
    '.svg': path.join(os.homedir(), 'Pictures', 'Vector'),
    '.webp': path.join(os.homedir(), 'Pictures', 'Images'),
    '.mp4': path.join(os.homedir(), 'Videos', 'Videos'),

    // Documents
    '.pdf': path.join(os.homedir(), 'Documents', 'PDFs'),
    '.doc': path.join(os.homedir(), 'Documents', 'Word'),
    '.docx': path.join(os.homedir(), 'Documents', 'Word'),
    '.xls': path.join(os.homedir(), 'Documents', 'Excel'),
    '.xlsx': path.join(os.homedir(), 'Documents', 'Excel'),
    '.txt': path.join(os.homedir(), 'Documents', 'TextFiles'),
    '.md': path.join(os.homedir(), 'Documents', 'TextFiles'),

    // Archives
    '.zip': path.join(os.homedir(), 'Documents', 'Archives'),
    '.rar': path.join(os.homedir(), 'Documents', 'Archives'),
    '.7z': path.join(os.homedir(), 'Documents', 'Archives'),

    // Installers & Code
    '.exe': path.join(os.homedir(), 'Documents', 'Installers'),
    '.msi': path.join(os.homedir(), 'Documents', 'Installers'),
    '.js': path.join(os.homedir(), 'Documents', 'Code', 'JavaScript'),
    '.py': path.join(os.homedir(), 'Documents', 'Code', 'Python'),
};

// 3. The function that handles the file
async function organizeFile(filename) {
    const fullFilePath = path.join(downloadsFolder, filename);

    try {
        // Wait a tiny bit for the file to finish writing
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if the file still exists (it might have been a temp file)
        await fs.access(fullFilePath);

        // Get the file's extension (e.g., ".pdf")
        const extension = path.extname(filename).toLowerCase();
        
        // Find the target destination
        const destinationFolder = targetFolders[extension];

        if (destinationFolder) {
            // 4. Ensure the destination folder exists
            // { recursive: true } creates parent folders if they don't exist
            await fs.mkdir(destinationFolder, { recursive: true });

            // 5. Move the file
            const newFilePath = path.join(destinationFolder, filename);
            await fs.rename(fullFilePath, newFilePath); // This is the async move!

            console.log(`MOVED: ${filename} -> ${destinationFolder}`);
        }
        // If no destination is defined, we simply do nothing and leave the file.
        
    } catch (err) {
        // Handle errors, e.g., file is still in use, permissions error
        if (err.code === 'ENOENT') {
            // ENOENT means "Error: No Entity" - the file was likely temporary and is already gone.
            // We can safely ignore this.
        } else {
            console.error(`Error processing ${filename}:`, err.message);
        }
    }
}

// 6. The main watch function
async function startWatcher() {
    console.log(`🚀 Automated organizer is now watching: ${downloadsFolder}`);
    console.log('Press Ctrl+C to stop.');
    
    try {
        // Start watching the directory
        const watcher = fs.watch(downloadsFolder);

        // Handle events from the watcher
        for await (const event of watcher) {
            // 'rename' is the event type for new files (and deletions)
            if (event.eventType === 'rename' && event.filename) {
                // We pass the filename to our handler function
                organizeFile(event.filename);
            }
        }
    } catch (err) {
        console.error('Failed to start watcher:', err.message);
    }
}

// 7. Run the script!
startWatcher();