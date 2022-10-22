import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const imageExtension = [
    ".apng",
    ".avif",
    ".gif",
    ".jpg",
    ".JPG",
    ".HEIC",
    ".heic",
    ".jpeg",
    ".jfif",
    ".pjpeg",
    ".pjp",
    ".png",
    ".svg",
    ".webp",
    ".bmp",
    ".ico",
    ".cur",
    ".tif",
    ".tiff",
];
const videoExtension = [
    ".mp4",
    ".mov",
    ".wmv",
    "avi",
    "avchd",
    "flv",
    "f4v",
    "swf",
    "mkv",
    "webm",
    "mpeg-2",
];
const fileExtensions = [
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".pdf",
    ".txt",
    ".zip",
    ".rar",
    ".7z",
    ".gzip",
    ".html",
    ".htm",
    ".mht",
    ".ppt",
    ".pptx",
    ".mdb",
    ".accdb",
    ".iso",
    ".cdr",
    ".torrent",
    ".djvu",
    ".fb2",
    ".epub",
    ".mobi",
];
const audioExtensions = [".mp3", ".wav ", ".midi", ".aac", ".ogg"];

export default class FileAction {
    static getFileExtension(fileName) {
        return fileName.substring(fileName.lastIndexOf("."), fileName.length) || fileName;
    }

    static getFileType(fileExtension) {
        if (imageExtension.includes(fileExtension)) {
            return "image";
        }
        if (videoExtension.includes(fileExtension)) {
            return "video";
        }
        if (fileExtensions.includes(fileExtension)) {
            return "document";
        }
        if (audioExtensions.includes(fileExtension)) {
            return "audio";
        }
        return "other file";
    }

    static addNewFile(file, addFile, setAddFile) {
        const addPhotoArr = [...addFile];
        const extensions = this.getFileExtension(file[0].name);
        const fileType = this.getFileType(extensions);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            addPhotoArr.push({
                file: file[0],
                fileUrl: fileReader.result || null,
                fileType: fileType,
                fileName: file[0].name,
                fileSize: file[0].size,
            });
            setAddFile(addPhotoArr);
        };
        fileReader.readAsDataURL(file[0]);
    }

    static async sendingFiles(chatId, file, setAddFile) {
        const storage = getStorage();
        const files = [...file];
        for (let i = 0; i < file.length; i++) {
            let fileUrl;
            const fileRef = ref(
                storage,
                `chats/attachment/${chatId}/${file[i].fileType}/` + file[i].fileName
            );
            if (file) {
                await uploadBytes(fileRef, file[i].file, { contentType: file[i].file.type });
                fileUrl = await getDownloadURL(fileRef);
                files[i].fileUrl = fileUrl;
                delete files[i].file;
            }
        }
        setAddFile([]);
        return files;
    }

    static async downloadFileFromStorage(fileUrl) {
        const storage = getStorage();
        const httpsReference = ref(storage, fileUrl);
        const URL = await getDownloadURL(ref(storage, httpsReference));
        document.location.href = URL;
        console.log(httpsReference);
        console.log(URL);
    }
}
//когда файл приходит сюда нужно его обработать и определить его тип
//после определения типа создавать объект с полями:
//-тип файла
//-название файла
//-размер файла
//-сам файл
// после этого пушить в массив с добавленными файлами,чтобы они показывались после инпута текста
// по кнопке sendMessage файлы улетают на бэк, сначала в строрэдж
//в нём создаётся папка с вложениями из чата, в этой папке также всё подразделяется на папки в зависимости от типа файла
//после этого возвращается ссылка на файл в сторадже и отправляется в бд
// в бд нужно указывать тип сообщения и исходя из этого типа делать свою оболочку для сообщения
