const fs = require('fs');


const readFile = (filePath) => {
    try{
        const data = fs.readFileSync('test.txt','utf-8');
        console.log(data);
    }catch(err){
        console.log('error reading the file',err);
    }
}


const appendToFile = (filePath,content) => {
    try{
        fs.appendFileSync(filePath, content + '\n','utf-8');
        console.log(`content appended to the file ${filePath}`)
    }catch(err){
        console.log('error appending to the file',err);
    }
}



const deleteFile = (filePath) => {
    try{
        fs.unlinkSync(filePath);
        console.log('File deleted')
    }catch(err){
        console.error('Error deleting the file:', err);
    }
}


const createFile = (filePath) => {
    try{
        fs.writeFileSync(filePath, '');
        console.log(`file ${filePath} created`);
    }
    catch(err){
        console.log('error creating the file',err)
    }
}



const renameFile = (filePath,newFilePath) => {
    try{
        fs.renameSync(filePath, newFilePath);
        console.log(`file renamed`);
    }
    catch(err){
        console.log('error creating the file',err)
    }
}


const lisrFilesAndDirectories = (directoryPath) => {
    try{
        const filesAndDirectories = fs.readdirSync(directoryPath);
        console.log('file and directories in the directory:');
        filesAndDirectories.forEach((item) => {
            console.log(item);
        });
    }
    catch(err){
        console.log('error listing  files and directories',err)
    }
}

const [,, command, ...args] = process.argv;

try {
    let result;
    switch (command) {
        case 'create':
            if (args.length !== 1) throw new Error('Please provide exactly 1 argument for file creation.');
            result = createFile(args[0]);
            break;
        case 'read':
            if (args.length !== 1) throw new Error('Please provide exactly 1 argument for file reading.');
            result = readFile(args[0]);
            break;
        case 'append':
            if (args.length !== 2) throw new Error('Please provide exactly 2 arguments for file appending.');
            result = appendToFile(args[1], args[0]);
            break;
        case 'delete':
            if (args.length !== 1) throw new Error('Please provide exactly 1 argument for file deletion.');
            result = deleteFile(args[0]);
            break;
        case 'rename':
            if (args.length !== 2) throw new Error('Please provide exactly 2 arguments for file renaming.');
            result = renameFile(args[0], args[1]);
            break;
        case 'list':
            if (args.length !== 1) throw new Error('Please provide exactly 1 argument for listing files.');
            result = lisrFilesAndDirectories(args[0]);
            break;
        default:
            console.log('Invalid command.');
            process.exit(1);
    }
    console.log(result);
} catch (error) {
    console.error(error.message);
    process.exit(1);
}