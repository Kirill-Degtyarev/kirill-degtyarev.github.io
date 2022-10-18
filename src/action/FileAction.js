export default class FileAction {
    static getNewFile(file, addFile, setAddFile) {
        const fileReader = new FileReader();
        fileReader.onload = () => {};
        fileReader.readAsDataURL(file[0]);
    }
}
